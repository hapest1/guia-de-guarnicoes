import UIKit
import WebKit
import Capacitor

class SceneDelegate: UIResponder, UIWindowSceneDelegate {
    var window: UIWindow?

    func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
        guard let windowScene = scene as? UIWindowScene else { return }

        window = UIWindow(windowScene: windowScene)
        window?.rootViewController = GuiaContainerViewController()
        window?.makeKeyAndVisible()

        SceneDelegateProxy.shared.scene(scene, willConnectTo: session, options: connectionOptions)
    }

    func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
        SceneDelegateProxy.shared.scene(scene, openURLContexts: URLContexts)
    }

    func scene(_ scene: UIScene, continue userActivity: NSUserActivity) {
        SceneDelegateProxy.shared.scene(scene, continue: userActivity)
    }
}

// MARK: - Conteúdo (fichas, guias e ferramentas embutidos no app)

/// Tela de conteúdo. Avisa as páginas de que a navegação principal é nativa
/// (para não desenharem a barra de abas em HTML) e liga o gesto de voltar do iOS.
final class GuiaBridgeViewController: CAPBridgeViewController {
    override func capacitorDidLoad() {
        super.capacitorDidLoad()
        let aviso = WKUserScript(source: "window.GG_NATIVO={abas:true,alturaAbas:49};",
                                 injectionTime: .atDocumentStart,
                                 forMainFrameOnly: true)
        webView?.configuration.userContentController.addUserScript(aviso)
        webView?.allowsBackForwardNavigationGestures = true
    }
}

// MARK: - Navegação principal nativa

/// Raiz do app: conteúdo em cima, barra de abas nativa embaixo.
/// A barra é montada com botões do UIKit (e não com UITabBar) para ter sempre 49 pt de altura,
/// em qualquer versão do iOS: o anúncio fica encostado logo acima dela.
final class GuiaContainerViewController: UIViewController {

    private struct Aba {
        let titulo: String
        let icone: String
        let caminho: String?      // nil = abre o menu "Mais"
        let prefixos: [String]    // caminhos em que a aba aparece selecionada
    }

    private let abas: [Aba] = [
        Aba(titulo: "Início", icone: "house", caminho: "/index.html", prefixos: []),
        Aba(titulo: "Mapa", icone: "map", caminho: "/locais-de-servir.html", prefixos: ["/locais-de-servir"]),
        Aba(titulo: "Rota", icone: "arrow.triangle.turn.up.right.diamond", caminho: "/planejamento-de-rota.html", prefixos: ["/planejamento-de-rota"]),
        Aba(titulo: "Salvos", icone: "bookmark", caminho: "/salvos.html", prefixos: ["/salvos"]),
        Aba(titulo: "Mais", icone: "ellipsis.circle", caminho: nil, prefixos: [])
    ]

    private let bridgeVC = GuiaBridgeViewController()
    private let barra = UIView()
    private var botoes: [UIButton] = []
    private static let alturaBarra: CGFloat = 49
    private var observacaoURL: NSKeyValueObservation?
    private var abaAtual = 0

    private let fundo = UIColor(red: 0.925, green: 0.937, blue: 0.906, alpha: 1)   // #ECEFE7
    private let verde = UIColor(red: 0.173, green: 0.353, blue: 0.216, alpha: 1)   // #2C5A37
    private let cinza = UIColor(red: 0.345, green: 0.384, blue: 0.310, alpha: 1)   // #58624F

    override var childForStatusBarStyle: UIViewController? { return bridgeVC }
    override var childForStatusBarHidden: UIViewController? { return bridgeVC }

    override func viewDidLoad() {
        super.viewDidLoad()
        overrideUserInterfaceStyle = .light
        view.backgroundColor = fundo

        addChild(bridgeVC)
        let conteudo: UIView = bridgeVC.view
        conteudo.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(conteudo)

        barra.backgroundColor = fundo
        barra.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(barra)

        let linha = UIView()
        linha.backgroundColor = UIColor(red: 0.800, green: 0.827, blue: 0.765, alpha: 1)   // #CCD3C3
        linha.translatesAutoresizingMaskIntoConstraints = false
        barra.addSubview(linha)

        for (i, aba) in abas.enumerated() {
            var atributos = AttributeContainer()
            atributos.font = UIFont.systemFont(ofSize: 10, weight: .medium)
            var config = UIButton.Configuration.plain()
            config.image = UIImage(systemName: aba.icone,
                                   withConfiguration: UIImage.SymbolConfiguration(pointSize: 19, weight: .regular))
            config.imagePlacement = .top
            config.imagePadding = 3
            config.attributedTitle = AttributedString(aba.titulo, attributes: atributos)
            config.contentInsets = NSDirectionalEdgeInsets(top: 4, leading: 0, bottom: 2, trailing: 0)
            let botao = UIButton(configuration: config)
            botao.tag = i
            botao.accessibilityLabel = aba.titulo
            botao.addTarget(self, action: #selector(tocouAba(_:)), for: .touchUpInside)
            botoes.append(botao)
        }
        let pilha = UIStackView(arrangedSubviews: botoes)
        pilha.axis = .horizontal
        pilha.distribution = .fillEqually
        pilha.translatesAutoresizingMaskIntoConstraints = false
        barra.addSubview(pilha)
        marcarAba(0)

        NSLayoutConstraint.activate([
            conteudo.topAnchor.constraint(equalTo: view.topAnchor),
            conteudo.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            conteudo.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            conteudo.bottomAnchor.constraint(equalTo: barra.topAnchor),
            barra.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            barra.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            barra.bottomAnchor.constraint(equalTo: view.bottomAnchor),
            pilha.topAnchor.constraint(equalTo: barra.topAnchor),
            pilha.leadingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.leadingAnchor),
            pilha.trailingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.trailingAnchor),
            pilha.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor),
            pilha.heightAnchor.constraint(equalToConstant: GuiaContainerViewController.alturaBarra),
            linha.topAnchor.constraint(equalTo: barra.topAnchor),
            linha.leadingAnchor.constraint(equalTo: barra.leadingAnchor),
            linha.trailingAnchor.constraint(equalTo: barra.trailingAnchor),
            linha.heightAnchor.constraint(equalToConstant: 0.5)
        ])
        bridgeVC.didMove(toParent: self)

        // A aba selecionada acompanha a página aberta (links, gesto de voltar etc.)
        observacaoURL = bridgeVC.webView?.observe(\.url, options: [.new]) { [weak self] webView, _ in
            let caminho = webView.url?.path ?? ""
            DispatchQueue.main.async { self?.sincronizarAba(caminho: caminho) }
        }
    }

    private func sincronizarAba(caminho: String) {
        var nova = 0
        for (i, aba) in abas.enumerated() where aba.prefixos.contains(where: { caminho.hasPrefix($0) }) {
            nova = i
        }
        marcarAba(nova)
    }

    private func marcarAba(_ indice: Int) {
        abaAtual = indice
        for (i, botao) in botoes.enumerated() {
            botao.tintColor = (i == indice) ? verde : cinza
            botao.accessibilityTraits = (i == indice) ? [.button, .selected] : [.button]
        }
    }

    private func navegar(_ caminho: String) {
        let destino = caminho.replacingOccurrences(of: "\"", with: "")
        bridgeVC.webView?.evaluateJavaScript("window.location.href=\"\(destino)\";", completionHandler: nil)
    }

    @objc private func tocouAba(_ botao: UIButton) {
        let aba = abas[botao.tag]
        guard let caminho = aba.caminho else {
            abrirMais()
            return
        }
        marcarAba(botao.tag)
        navegar(caminho)
    }

    private func abrirMais() {
        let mais = MaisViewController(style: .insetGrouped)
        mais.aoEscolher = { [weak self] acao in self?.executar(acao) }
        let nav = UINavigationController(rootViewController: mais)
        nav.overrideUserInterfaceStyle = .light
        nav.view.tintColor = verde
        nav.modalPresentationStyle = .pageSheet
        if let folha = nav.sheetPresentationController {
            folha.detents = [.medium(), .large()]
            folha.prefersGrabberVisible = true
        }
        present(nav, animated: true, completion: nil)
    }

    private func executar(_ acao: MaisViewController.Acao) {
        switch acao {
        case .pagina(let caminho):
            navegar(caminho)
        case .externo(let endereco):
            guard let url = URL(string: endereco) else { return }
            UIApplication.shared.open(url, options: [:], completionHandler: nil)
        case .email(let endereco):
            guard let url = URL(string: "mailto:" + endereco) else { return }
            UIApplication.shared.open(url, options: [:]) { [weak self] abriu in
                if !abriu { self?.mostrarEmail(endereco) }
            }
        case .ajustes:
            guard let url = URL(string: UIApplication.openSettingsURLString) else { return }
            UIApplication.shared.open(url, options: [:], completionHandler: nil)
        }
    }

    /// Sem app de e-mail configurado: mostra o endereço e deixa copiar.
    private func mostrarEmail(_ endereco: String) {
        let alerta = UIAlertController(title: "Contato", message: endereco, preferredStyle: .alert)
        alerta.addAction(UIAlertAction(title: "Copiar e-mail", style: .default) { _ in
            UIPasteboard.general.string = endereco
        })
        alerta.addAction(UIAlertAction(title: "Fechar", style: .cancel, handler: nil))
        present(alerta, animated: true, completion: nil)
    }
}

// MARK: - Menu "Mais" (ferramentas, Comandos Militares, sobre e contato)

final class MaisViewController: UITableViewController {

    enum Acao {
        case pagina(String)
        case externo(String)
        case email(String)
        case ajustes
    }

    private struct Linha {
        let titulo: String
        let icone: String
        let acao: Acao
    }

    private struct Secao {
        let titulo: String
        let rodape: String?
        let linhas: [Linha]
    }

    static let emailSuporte = "guiadeguarnicoes@gmail.com"

    var aoEscolher: ((Acao) -> Void)?

    private let secoes: [Secao] = [
        Secao(titulo: "Ferramentas", rodape: nil, linhas: [
            Linha(titulo: "Calculadora de Transferência", icone: "plus.forwardslash.minus", acao: .pagina("/calculadora-de-transferencia.html")),
            Linha(titulo: "Calculadora de Ajuda de Custo", icone: "banknote", acao: .pagina("/calculadora-de-ajuda-de-custo.html")),
            Linha(titulo: "Calculadora de Passagens", icone: "ticket", acao: .pagina("/calculadora-de-passagens.html")),
            Linha(titulo: "Comparar guarnições", icone: "arrow.left.arrow.right", acao: .pagina("/comparar.html")),
            Linha(titulo: "Checklist da chegada", icone: "checklist", acao: .pagina("/checklist-da-chegada.html")),
            Linha(titulo: "Hotéis de Trânsito", icone: "bed.double", acao: .pagina("/hoteis-de-transito.html")),
            Linha(titulo: "Guias da mudança", icone: "book", acao: .pagina("/guias/index.html"))
        ]),
        Secao(titulo: "Guarnições por Comando Militar", rodape: nil, linhas: [
            Linha(titulo: "CMA · Amazônia", icone: "mappin.and.ellipse", acao: .pagina("/index.html#cma")),
            Linha(titulo: "CMAO · Amazônia Oriental", icone: "mappin.and.ellipse", acao: .pagina("/index.html#cmao")),
            Linha(titulo: "CMNE · Nordeste", icone: "mappin.and.ellipse", acao: .pagina("/index.html#cmne")),
            Linha(titulo: "CMP · Planalto", icone: "mappin.and.ellipse", acao: .pagina("/index.html#cmp")),
            Linha(titulo: "CML · Leste", icone: "mappin.and.ellipse", acao: .pagina("/index.html#cml")),
            Linha(titulo: "CMSE · Sudeste", icone: "mappin.and.ellipse", acao: .pagina("/index.html#cmse")),
            Linha(titulo: "CMO · Oeste", icone: "mappin.and.ellipse", acao: .pagina("/index.html#cmo")),
            Linha(titulo: "CMS · Sul", icone: "mappin.and.ellipse", acao: .pagina("/index.html#cms"))
        ]),
        Secao(titulo: "Sobre e contato",
              rodape: "Guia independente, feito por e para militares e suas famílias. Não é publicação oficial do Exército Brasileiro.",
              linhas: [
            Linha(titulo: "Sobre o Guia", icone: "info.circle", acao: .pagina("/sobre.html")),
            Linha(titulo: "Fale conosco por e-mail", icone: "envelope", acao: .email(MaisViewController.emailSuporte)),
            Linha(titulo: "Site guiadeguarnicoes.com", icone: "safari", acao: .externo("https://guiadeguarnicoes.com/")),
            Linha(titulo: "Contribua com o Guia", icone: "square.and.pencil", acao: .pagina("/contribuir.html")),
            Linha(titulo: "Política de privacidade", icone: "hand.raised", acao: .pagina("/privacidade.html")),
            Linha(titulo: "Permissões do app", icone: "gearshape", acao: .ajustes)
        ])
    ]

    override func viewDidLoad() {
        super.viewDidLoad()
        title = "Mais"
        tableView.register(UITableViewCell.self, forCellReuseIdentifier: "linha")
        navigationItem.rightBarButtonItem = UIBarButtonItem(barButtonSystemItem: .close, target: self, action: #selector(fechar))
    }

    @objc private func fechar() {
        dismiss(animated: true, completion: nil)
    }

    override func numberOfSections(in tableView: UITableView) -> Int {
        return secoes.count
    }

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return secoes[section].linhas.count
    }

    override func tableView(_ tableView: UITableView, titleForHeaderInSection section: Int) -> String? {
        return secoes[section].titulo
    }

    override func tableView(_ tableView: UITableView, titleForFooterInSection section: Int) -> String? {
        guard let rodape = secoes[section].rodape else { return nil }
        let info = Bundle.main.infoDictionary
        let versao = (info?["CFBundleShortVersionString"] as? String) ?? ""
        return rodape + "\n\nVersão " + versao
    }

    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let celula = tableView.dequeueReusableCell(withIdentifier: "linha", for: indexPath)
        let linha = secoes[indexPath.section].linhas[indexPath.row]
        var conteudo = celula.defaultContentConfiguration()
        conteudo.text = linha.titulo
        conteudo.image = UIImage(systemName: linha.icone) ?? UIImage(systemName: "circle")
        celula.contentConfiguration = conteudo
        celula.accessoryType = .disclosureIndicator
        return celula
    }

    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
        let acao = secoes[indexPath.section].linhas[indexPath.row].acao
        let escolher = aoEscolher
        dismiss(animated: true) { escolher?(acao) }
    }
}
