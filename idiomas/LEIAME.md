# Missão Idiomas (protótipo)

App gamificado de inglês para militares, organizado pelas quatro habilidades do
**STANAG 6001** (Ouvir – Falar – Ler – Escrever). Fica em `/idiomas/` no site do Guia
de Guarnições e não aparece no menu nem no sitemap (`noindex`).

## O que tem

- Login (e-mail/senha e Google) e cadastro com nome de guerra, posto/graduação e OM.
- Perfil SLP atual e meta (ex.: 2-1-2-2 → 4-4-4-4). Lições dos níveis que a pessoa já tem
  ficam liberadas, e a trilha abre na habilidade mais fraca.
- 4 trilhas × 3 níveis × 2 lições = 24 lições (~130 exercícios), com conteúdo militar original.
- Exercícios: múltipla escolha, ouvir e responder (voz do navegador), ditado, montar frase,
  ligar pares, repetir frase pelo microfone, fala livre e redação com critérios.
- XP, sequência de dias 🔥, meta diária de 30 XP, revisão automática dos erros no fim da lição.
- Ranking semanal (zera na segunda-feira) e geral.
- Nível estimado por habilidade: nível concluído com ≥ 80% em todas as lições.
- Nível 4 aparece bloqueado: depende do tutor com IA (próxima etapa).

## Modo demonstração x modo com amigos

Sem configuração, o app roda em **modo demonstração**: contas e ranking ficam só no
navegador. Para jogar com amigos, configure o Firebase (plano gratuito Spark):

1. Acesse <https://console.firebase.google.com> e crie um projeto (pode desativar o Analytics).
2. **Authentication** > Começar > ative **E-mail/senha** e **Google**.
3. Em **Authentication > Settings > Authorized domains**, adicione `guiadeguarnicoes.com`
   (e `localhost` já vem incluído para testes).
4. **Firestore Database** > Criar banco de dados > modo produção > região `southamerica-east1`.
5. Na aba **Regras** do Firestore, cole o conteúdo de `firestore.rules` e publique.
6. **Configurações do projeto** (engrenagem) > Seus apps > ícone **Web `</>`** > registre o app.
   Copie o objeto `firebaseConfig` e cole os valores em `idiomas/firebase-config.js`.
7. Publique o site. O app fica em `https://guiadeguarnicoes.com/idiomas/`.

A `apiKey` do Firebase não é secreta; a segurança vem das regras do Firestore. Como o
protótipo calcula o XP no navegador, um usuário técnico conseguiria inflar a própria
pontuação. Para testar com amigos isso basta; numa versão maior, o XP deve ser validado
no servidor (Cloud Functions).

## Testar localmente

```bash
cd guia-de-guarnicoes
python3 -m http.server 8000
# abra http://localhost:8000/idiomas/
```

O microfone exige HTTPS ou `localhost`. Reconhecimento de voz funciona no Chrome, Edge e
Safari; no Firefox o app pede para digitar o que foi falado.

## Arquivos

| Arquivo | Função |
|---|---|
| `index.html` | Página do app |
| `app.js` | Telas, trilha, motor das lições, XP e ranking |
| `conteudo.js` | Lições e exercícios (edite aqui para criar conteúdo) |
| `backend.js` | Firebase ou modo demonstração (localStorage) |
| `firebase-config.js` | Dados do projeto Firebase |
| `firestore.rules` | Regras de segurança do banco |
| `app.css` | Estilos (mesma paleta do Guia) |

## Próximos passos sugeridos

- Tutor com IA para fala e escrita (correção de gramática, coerência e vocabulário por nível).
- Mais lições por nível e trilhas do nível 4.
- Teste de nivelamento e simulados no formato da prova.
- Ligas por OM e desafios entre amigos.
