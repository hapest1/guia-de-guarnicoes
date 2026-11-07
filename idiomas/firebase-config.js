/* Configuração do Firebase (login e ranking compartilhado).
   Enquanto apiKey estiver vazia, o app roda em MODO DEMONSTRAÇÃO: contas e ranking ficam só
   no navegador de quem está usando. Para testar com amigos, siga o passo a passo do LEIAME.md
   e cole aqui os dados do seu projeto (Console do Firebase > Configurações do projeto > Seus apps).
   Esses valores não são segredo: a proteção vem das regras do Firestore (firestore.rules). */
export const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
};
