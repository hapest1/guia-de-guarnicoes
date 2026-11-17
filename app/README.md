# App iOS do Guia de Guarnições

O app empacota o site inteiro (171 fichas, guias, calculadoras, mapa e comparador) para funcionar **sem internet**. Ele foi feito com [Capacitor](https://capacitorjs.com) e acrescenta ao site:

- barra de abas: Início, Mapa, Comparar, Calcular, Salvos;
- botão **Salvar** nas fichas e uma página **Salvos**, com as guarnições salvas e as vistas recentemente;
- compartilhamento pelo menu do iOS, com o link público do site;
- links externos abertos no Safari dentro do app;
- banner do **AdMob** acima das abas, com o pedido de rastreamento (ATT) e o consentimento do Google (UMP).

O AdSense, o Google Analytics e o contador de visitas são retirados no build.

## Como funciona

```
site (raiz do repositório) ──npm run build──▶ app/www ──cap sync──▶ ios/App (Xcode) ──GitHub Actions (Mac)──▶ TestFlight / App Store
```

- `scripts/build-www.mjs`: copia o site para `www/`, troca os links `/manaus-am` por `/manaus-am.html`, baixa as fontes, injeta `src/app.js` e `src/app.css` e gera `salvos.html`. Se sobrar algum link interno quebrado, o build falha.
- `ios/`: o projeto Xcode, que fica no repositório.
- `.github/workflows/ios-testflight.yml`: compila num Mac do GitHub, assina e envia ao TestFlight.

**Para atualizar o app depois de mudar o site**, basta rodar o workflow de novo. O conteúdo é gerado a partir do site a cada build.

## Passo a passo para publicar (sem Mac)

### 1. Conta e app no App Store Connect
1. Com a conta Apple Developer ativa, entre em [appstoreconnect.apple.com](https://appstoreconnect.apple.com) › **Apps** › **+** › **Novo app**.
   - Plataforma: iOS · Nome: **Guia de Guarnições** · Idioma principal: Português (Brasil)
   - ID do pacote (Bundle ID): **com.guiadeguarnicoes.app**. Se ele não aparecer na lista, registre-o em [developer.apple.com › Identifiers](https://developer.apple.com/account/resources/identifiers/list) › **+** › App IDs, com a descrição "Guia de Guarnicoes" e esse Bundle ID explícito.
   - SKU: `guia-de-guarnicoes`
2. Anote o **Team ID**, que aparece em developer.apple.com › Membership details.

### 2. Chave de API (é o que permite ao GitHub assinar e enviar sem um Mac)
App Store Connect › **Usuários e acesso** › **Integrações** › **App Store Connect API** › **Chaves da equipe** › **+**
- Nome: `GitHub Actions` · Acesso: **Admin**. O nível Admin é necessário para o certificado de distribuição ser criado automaticamente na nuvem.
- Baixe o arquivo `AuthKey_XXXXXXXXXX.p8`. Ele só pode ser baixado uma vez.
- Anote o **Key ID** e o **Issuer ID**, que aparece no topo da página.

### 3. AdMob
1. Em [admob.google.com](https://admob.google.com), use **Apps › Adicionar app** › iOS › "ainda não publicado" › nome "Guia de Guarnições".
2. Copie o **ID do app** (`ca-app-pub-…~…`).
3. No app, crie um **bloco de anúncios › Banner** e copie o **ID do bloco** (`ca-app-pub-…/…`).
4. Em **Privacidade e mensagens**, crie as mensagens de consentimento do GDPR e do IDFA (ATT) para iOS. São elas que o app exibe.
5. Depois que o app estiver na App Store, volte ao AdMob e vincule o app à loja.

### 4. Segredos no GitHub
No repositório, abra **Settings › Secrets and variables › Actions**:

| Tipo | Nome | Valor |
|---|---|---|
| Secret | `APPLE_TEAM_ID` | Team ID (passo 1) |
| Secret | `ASC_KEY_ID` | Key ID (passo 2) |
| Secret | `ASC_ISSUER_ID` | Issuer ID (passo 2) |
| Secret | `ASC_KEY_P8` | conteúdo inteiro do `.p8`, de `-----BEGIN PRIVATE KEY-----` a `-----END PRIVATE KEY-----` |
| Variable | `ADMOB_APP_ID_IOS` | ID do app no AdMob |
| Variable | `ADMOB_BANNER_ID_IOS` | ID do bloco de banner |

Sem as duas variáveis do AdMob, o app é gerado com **anúncios de teste** do Google. Isso serve para testar, mas não gera receita.

### 5. Gerar o build
Na aba **Actions** do GitHub, abra **iOS · TestFlight** › **Run workflow**, informe a versão (ex.: `1.0.0`) e rode. O build leva de 10 a 20 minutos. Depois aparece em App Store Connect › **TestFlight**, onde dá para instalar no iPhone pelo app TestFlight.

O workflow precisa estar no branch padrão (main) para o botão aparecer, ou seja, faça o merge deste branch antes.

### 6. Ficha na App Store e envio para revisão
Os textos prontos estão em [`store/ficha-app-store.md`](store/ficha-app-store.md) e as capturas de tela de 6,9" em [`store/screenshots/`](store/screenshots/). Em App Store Connect › seu app:
- **Informações do app**: categoria, classificação etária e URL da política de privacidade (`https://guiadeguarnicoes.com/privacidade#app`);
- **Privacidade do app**: preencha conforme `store/ficha-app-store.md`;
- **Versão 1.0**: capturas, descrição, palavras-chave, URL de suporte e o build do TestFlight;
- **Notas para revisão**: cole o texto sugerido, que explica o conteúdo offline e os recursos nativos;
- **Enviar para revisão.**

## Desenvolvimento local (opcional)

```bash
cd app
npm install
npm run build          # gera www/ a partir do site
npx cap sync ios       # copia www/ para o projeto iOS
npm run assets         # regenera ícone e splash a partir de assets/
```

Para testar no navegador, sirva `app/www` com qualquer servidor estático e abra `/index.html`.
