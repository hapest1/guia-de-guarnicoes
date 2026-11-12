/* Camada de dados do Missão Idiomas.
   - Com firebase-config.js preenchido: Firebase Authentication (e-mail/senha e Google) + Firestore.
   - Sem configuração: modo demonstração no localStorage (só neste navegador). */
import { firebaseConfig } from './firebase-config.js';

const FB = 'https://www.gstatic.com/firebasejs/10.12.2/';

export function semanaId(d = new Date()) {
  /* Semana ISO (segunda a domingo), ex.: 2026-W45 */
  const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dia = t.getUTCDay() || 7;
  t.setUTCDate(t.getUTCDate() + 4 - dia);
  const ini = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
  const n = Math.ceil(((t - ini) / 86400000 + 1) / 7);
  return `${t.getUTCFullYear()}-W${String(n).padStart(2, '0')}`;
}

export function hojeId(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function perfilNovo(uid, dados) {
  return {
    uid,
    nome: dados.nome || 'Militar',
    posto: dados.posto || '',
    om: dados.om || '',
    slp: { L: 1, S: 1, R: 1, W: 1 },
    meta: { L: 4, S: 4, R: 4, W: 4 },
    configurado: false,
    xp: 0, xpSemana: 0, semanaId: semanaId(),
    xpHoje: 0, diaId: hojeId(), streak: 0, ultimoDia: '',
    feitas: {},
    criado: Date.now(),
  };
}

function traduzErro(e) {
  const c = (e && e.code) || '';
  const m = {
    'auth/invalid-email': 'E-mail inválido.',
    'auth/missing-password': 'Digite a senha.',
    'auth/weak-password': 'A senha precisa ter pelo menos 6 caracteres.',
    'auth/email-already-in-use': 'Este e-mail já tem cadastro. Use "Entrar".',
    'auth/invalid-credential': 'E-mail ou senha incorretos.',
    'auth/wrong-password': 'E-mail ou senha incorretos.',
    'auth/user-not-found': 'E-mail ou senha incorretos.',
    'auth/too-many-requests': 'Muitas tentativas. Aguarde alguns minutos.',
    'auth/popup-closed-by-user': 'Login com Google cancelado.',
    'auth/unauthorized-domain': 'Este domínio não está autorizado no Firebase (Authentication > Settings > Authorized domains).',
    'auth/network-request-failed': 'Sem conexão com a internet.',
  };
  return new Error(m[c] || e.message || 'Algo deu errado.');
}

/* ------------------------------ Firebase ------------------------------ */
async function criarFirebase() {
  const [{ initializeApp }, A, F] = await Promise.all([
    import(FB + 'firebase-app.js'),
    import(FB + 'firebase-auth.js'),
    import(FB + 'firebase-firestore.js'),
  ]);
  const app = initializeApp(firebaseConfig);
  const auth = A.getAuth(app);
  const db = F.getFirestore(app);
  const ref = uid => F.doc(db, 'usuarios', uid);
  let pendente = null; /* dados do cadastro, usados quando o perfil ainda não existe */

  async function garantirPerfil(user) {
    const snap = await F.getDoc(ref(user.uid));
    if (snap.exists()) return snap.data();
    const p = perfilNovo(user.uid, pendente || { nome: (user.displayName || '').split(' ')[0] });
    pendente = null;
    await F.setDoc(ref(user.uid), p);
    return p;
  }

  return {
    modo: 'firebase',
    onAuth(cb) {
      A.onAuthStateChanged(auth, async user => {
        if (!user) return cb(null);
        try { cb(await garantirPerfil(user)); } catch (e) { console.error(e); cb(null, traduzErro(e)); }
      });
    },
    async cadastrar(email, senha, dados) {
      pendente = dados;
      try { await A.createUserWithEmailAndPassword(auth, email, senha); } catch (e) { pendente = null; throw traduzErro(e); }
    },
    async entrar(email, senha) {
      try { await A.signInWithEmailAndPassword(auth, email, senha); } catch (e) { throw traduzErro(e); }
    },
    async entrarGoogle() {
      try { await A.signInWithPopup(auth, new A.GoogleAuthProvider()); } catch (e) { throw traduzErro(e); }
    },
    async recuperarSenha(email) {
      try { await A.sendPasswordResetEmail(auth, email); } catch (e) { throw traduzErro(e); }
    },
    async sair() { await A.signOut(auth); },
    async salvar(p) { await F.setDoc(ref(p.uid), p); },
    async ranking(tipo) {
      const campo = tipo === 'semana' ? 'xpSemana' : 'xp';
      const q = F.query(F.collection(db, 'usuarios'), F.orderBy(campo, 'desc'), F.limit(100));
      const s = await F.getDocs(q);
      let lista = s.docs.map(d => d.data());
      if (tipo === 'semana') lista = lista.filter(u => u.semanaId === semanaId());
      return lista.slice(0, 50);
    },
  };
}

/* --------------------------- Modo demonstração --------------------------- */
function criarLocal() {
  const K_USERS = 'mi_usuarios', K_CONTAS = 'mi_contas', K_ATUAL = 'mi_atual';
  const ler = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) || d; } catch { return d; } };
  const gravar = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* armazenamento indisponível */ } };
  let ouvinte = () => {};
  const avisar = () => {
    const uid = ler(K_ATUAL, null);
    ouvinte(uid ? ler(K_USERS, {})[uid] || null : null);
  };
  const norm = e => String(e || '').trim().toLowerCase();

  return {
    modo: 'local',
    onAuth(cb) { ouvinte = cb; avisar(); },
    async cadastrar(email, senha, dados) {
      email = norm(email);
      if (!/^\S+@\S+\.\S+$/.test(email)) throw new Error('E-mail inválido.');
      if (!senha || senha.length < 6) throw new Error('A senha precisa ter pelo menos 6 caracteres.');
      const contas = ler(K_CONTAS, {});
      if (contas[email]) throw new Error('Este e-mail já tem cadastro. Use "Entrar".');
      const uid = 'local-' + Math.random().toString(36).slice(2, 10);
      contas[email] = { uid, senha };
      const users = ler(K_USERS, {}); users[uid] = perfilNovo(uid, dados);
      gravar(K_CONTAS, contas); gravar(K_USERS, users); gravar(K_ATUAL, uid);
      avisar();
    },
    async entrar(email, senha) {
      const c = ler(K_CONTAS, {})[norm(email)];
      if (!c || c.senha !== senha) throw new Error('E-mail ou senha incorretos.');
      gravar(K_ATUAL, c.uid); avisar();
    },
    async entrarGoogle() { throw new Error('Login com Google só funciona depois de configurar o Firebase.'); },
    async recuperarSenha() { throw new Error('No modo demonstração não há recuperação de senha.'); },
    async sair() { gravar(K_ATUAL, null); avisar(); },
    async salvar(p) { const u = ler(K_USERS, {}); u[p.uid] = p; gravar(K_USERS, u); },
    async ranking(tipo) {
      let lista = Object.values(ler(K_USERS, {}));
      if (tipo === 'semana') lista = lista.filter(u => u.semanaId === semanaId());
      const campo = tipo === 'semana' ? 'xpSemana' : 'xp';
      return lista.sort((a, b) => b[campo] - a[campo]).slice(0, 50);
    },
  };
}

export async function criarBackend() {
  if (firebaseConfig.apiKey) {
    try { return await criarFirebase(); } catch (e) { console.error('Falha ao carregar o Firebase', e); }
  }
  return criarLocal();
}
