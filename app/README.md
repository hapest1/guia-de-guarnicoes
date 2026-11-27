# App iOS do Guia de Guarnições

O app empacota o site inteiro (171 fichas, guias, calculadoras, mapa e comparador) para funcionar **sem internet**. Ele foi feito com [Capacitor](https://capacitorjs.com) e acrescenta ao site:

- **barra de abas nativa do iOS** (`UITabBar`, em `ios/App/App/SceneDelegate.swift`): Início, Mapa, Rota (Planejamento de Rota), Salvos e Mais. A aba **Mais** abre uma lista nativa com as ferramentas (calculadoras, Comparar, Checklist, Hotéis de Trânsito, Guias), os oito Comandos Militares e a parte de Sobre e contato (e-mail de suporte, site, política de privacidade, permissões do app). A barra de abas em HTML do `abas.js` continua existindo para o site no celular; no app ela não é desenhada (`window.GG_NATIVO`);
- gesto de voltar do iOS (arrastar da borda esquerda);
- botão **Salvar** nas fichas e uma página **Salvos**, com as guarnições salvas e as vistas recentemente, guardadas no aparelho;
- **Checklist da chegada** com as marcações guardadas nas preferências do aparelho;
- compartilhamento pelo menu do iOS, com o link público do site;
- links externos e vídeos do YouTube abertos no Safari dentro do app;
- avisos de sem conexão: as fichas continuam abrindo; foto, vídeo e rota mostram um aviso no lugar;
- banner do **AdMob** acima das abas, com o pedido de rastreamento (ATT) e o consentimento do Google (UMP).

O AdSense, o Google Analytics e o contador de visitas são retirados no build.

## Como funciona

```
site (raiz do repositório) ──npm run build──▶ app/www ──cap sync──▶ ios/App (Xcode) ──Codemagic (Mac)──▶ TestFlight / App Store
```

- `scripts/build-www.mjs`: copia o site para `www/`, troca os links `/manaus-am` por `/manaus-am.html`, baixa as fontes e liga o modo app do `abas.js`. A barra de abas, o Salvar e a página Salvos são os mesmos do site (`abas.js`, `abas.css`, `salvos.html`, gerada por `gerar_salvos.py`). Se sobrar algum link interno quebrado, o build falha.
- `ios/`: o projeto Xcode, que fica no repositório.
- `../codemagic.yaml`: compila no Codemagic, assina e envia ao TestFlight, do mesmo jeito que o Missão Idiomas.

**Para atualizar o app depois de mudar o site**, inicie um build novo no Codemagic. O conteúdo é gerado a partir do site a cada build. Não há build automático a cada push, para não gastar minutos de Mac a cada commit do site.

## Passo a passo para publicar

### 1. App no App Store Connect
1. Em [appstoreconnect.apple.com](https://appstoreconnect.apple.com), vá em **Apps** › **+** › **Novo app**.
   - Plataforma: iOS · Nome: **Guia de Guarnições** · Idioma principal: Português (Brasil)
   - ID do pacote (Bundle ID): **com.guiadeguarnicoes.app**. Se ele não aparecer na lista, registre-o em [developer.apple.com › Identifiers](https://developer.apple.com/account/resources/identifiers/list) › **+** › App IDs.
   - SKU: `guia-de-guarnicoes`

### 2. AdMob
1. Em [admob.google.com](https://admob.google.com), use **Apps › Adicionar app** › iOS › "ainda não publicado" › "Guia de Guarnições".
2. Copie o **ID do app** (`ca-app-pub-…~…`) e crie um **bloco de anúncios › Banner** (`ca-app-pub-…/…`).
3. Em **Privacidade e mensagens**, crie as mensagens de GDPR e de IDFA (ATT) para iOS.
4. Cole os dois IDs em `ADMOB_APP_ID_IOS` e `ADMOB_BANNER_ID_IOS`, no `codemagic.yaml` da raiz. Esses IDs não são secretos. Enquanto estiverem vazios, o app mostra anúncios de teste.

### 3. Codemagic
1. Em [codemagic.io](https://codemagic.io/apps), use **Add application** › GitHub › `hapest1/guia-de-guarnicoes` › configuração por **codemagic.yaml**.
2. A chave da Apple é a mesma do Missão Idiomas: integração **`missao-idiomas`**, já cadastrada no time. Não precisa criar outra.
3. Clique em **Start new build**, escolha o branch `main` e o workflow **Guia de Guarnições iOS → TestFlight**. O build leva de 10 a 20 minutos e aparece em App Store Connect › **TestFlight**.

O Codemagic lê o `codemagic.yaml` do branch escolhido, então faça o merge deste branch na `main` antes.

### 4. Ficha na App Store e envio para revisão
Os textos prontos estão em [`store/ficha-app-store.md`](store/ficha-app-store.md) e as capturas de tela de 6,9" em [`store/screenshots/`](store/screenshots/). No App Store Connect, preencha:
- **Informações do app**: categoria, classificação etária e URL da política de privacidade (`https://guiadeguarnicoes.com/privacidade#app`);
- **Privacidade do app**;
- **Versão 1.0**: capturas, textos, build e notas para revisão;
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
