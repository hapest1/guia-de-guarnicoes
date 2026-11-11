/* Missão Idiomas — protótipo de app gamificado de inglês para militares (perfil STANAG 6001). */
import { SKILLS, NIVEIS, LICOES, licoesDaSkill } from './conteudo.js';
import { criarBackend, semanaId, hojeId } from './backend.js';

const META_DIARIA = 30;
const ORDEM = ['L', 'S', 'R', 'W'];
const POSTOS = ['Sd', 'Cb', '3º Sgt', '2º Sgt', '1º Sgt', 'ST', 'Cad', 'Asp', '2º Ten', '1º Ten', 'Cap', 'Maj', 'TC', 'Cel', 'Gen', 'Civil / outro'];

const raiz = document.getElementById('app');
let be = null;          /* backend */
let eu = null;          /* perfil do usuário logado */
let aba = 'trilha';
let skillAtual = 'L';
try { skillAtual = localStorage.getItem('mi_skill') || 'L'; } catch { /* sem armazenamento */ }

/* ------------------------------ utilidades ------------------------------ */
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const norm = s => String(s ?? '').toLowerCase().replace(/[’‘]/g, "'").replace(/[.,!?;:"()\[\]—–]/g, ' ').replace(/\s+/g, ' ').trim();
const palavras = s => norm(s).split(' ').filter(Boolean);
const embaralhar = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const slpTxt = o => ORDEM.map(k => o[k]).join('-');
const $ = s => raiz.querySelector(s);

function normalizarPeriodo(p) {
  if (p.semanaId !== semanaId()) { p.semanaId = semanaId(); p.xpSemana = 0; }
  if (p.diaId !== hojeId()) { p.diaId = hojeId(); p.xpHoje = 0; }
  const ontem = hojeId(new Date(Date.now() - 86400000));
  if (p.ultimoDia && p.ultimoDia !== hojeId() && p.ultimoDia !== ontem) p.streak = 0;
  return p;
}

function nivelEstimado(skill) {
  let est = eu.slp[skill] || 0;
  for (let n = 1; n <= 3; n++) {
    const ls = LICOES.filter(l => l.skill === skill && l.lvl === n);
    if (ls.length && ls.every(l => (eu.feitas[l.id]?.melhor || 0) >= 80)) est = Math.max(est, n);
  }
  return est;
}

function liberada(lic, i, lista) {
  return i === 0 || lic.lvl <= (eu.slp[lic.skill] || 0) || !!eu.feitas[lista[i - 1].id];
}

let toastT;
function toast(msg) {
  let t = document.querySelector('.toast');
  if (!t) { t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
  t.textContent = msg; t.classList.add('on');
  clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('on'), 3200);
}

/* ------------------------------- voz (TTS) ------------------------------ */
let vozEn = null;
function carregarVoz() {
  if (!('speechSynthesis' in window)) return;
  const vs = speechSynthesis.getVoices();
  vozEn = vs.find(v => /en[-_]US/i.test(v.lang) && /Google|Samantha|Microsoft/i.test(v.name)) || vs.find(v => /^en/i.test(v.lang)) || null;
}
if ('speechSynthesis' in window) { carregarVoz(); speechSynthesis.onvoiceschanged = carregarVoz; }

function falar(texto, lento) {
  if (!('speechSynthesis' in window)) { toast('Seu navegador não tem leitura em voz alta.'); return; }
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(texto);
  u.lang = 'en-US'; if (vozEn) u.voice = vozEn;
  u.rate = lento ? 0.7 : 0.95;
  speechSynthesis.speak(u);
}

const SR = window.SpeechRecognition || window.webkitSpeechRecognition;

/* ================================ TELAS ================================ */
function telaCarregando(msg = 'Carregando…') {
  raiz.innerHTML = `<div class="centro"><div class="spinner" aria-hidden="true"></div><p>${esc(msg)}</p></div>`;
}

/* ------------------------------- login ------------------------------- */
function telaAuth(modoForm = 'entrar', erro = '') {
  const demo = be.modo === 'local';
  raiz.innerHTML = `
  <main class="auth">
    <div class="marca"><span class="logo" aria-hidden="true">★</span><h1>Missão Idiomas</h1></div>
    <p class="sub">Inglês para militares, do perfil 1-1-1-1 rumo ao 4-4-4-4 (STANAG 6001).</p>
    ${demo ? `<p class="aviso">Modo demonstração: as contas e o ranking ficam só neste navegador. Para jogar com amigos, configure o Firebase (veja o LEIAME).</p>` : ''}
    <div class="seg" role="tablist">
      <button role="tab" data-form="entrar" aria-selected="${modoForm === 'entrar'}">Entrar</button>
      <button role="tab" data-form="criar" aria-selected="${modoForm === 'criar'}">Criar conta</button>
    </div>
    <form id="fAuth" class="card form" novalidate>
      ${modoForm === 'criar' ? `
        <label>Nome de guerra<input name="nome" required maxlength="24" autocomplete="nickname" placeholder="Ex.: Silva"></label>
        <div class="dupla">
          <label>Posto/Graduação<select name="posto">${POSTOS.map(p => `<option>${p}</option>`).join('')}</select></label>
          <label>OM<input name="om" maxlength="30" placeholder="Ex.: 9º BE Cmb"></label>
        </div>` : ''}
      <label>E-mail<input name="email" type="email" required autocomplete="email"></label>
      <label>Senha<input name="senha" type="password" required minlength="6" autocomplete="${modoForm === 'criar' ? 'new-password' : 'current-password'}"></label>
      <p class="erro" role="alert">${esc(erro)}</p>
      <button class="btn" type="submit">${modoForm === 'criar' ? 'Criar conta' : 'Entrar'}</button>
      ${modoForm === 'entrar' && !demo ? `<button type="button" class="link" id="esqueci">Esqueci minha senha</button>` : ''}
    </form>
    ${!demo ? `<div class="ou"><span>ou</span></div><button class="btn sec" id="google"><span aria-hidden="true">G</span> Continuar com Google</button>` : ''}
    <p class="rodape">Protótipo do <a href="/">Guia de Guarnições</a>. Não substitui o exame oficial de proficiência.</p>
  </main>`;

  raiz.querySelectorAll('[data-form]').forEach(b => b.onclick = () => telaAuth(b.dataset.form));
  const f = $('#fAuth');
  f.onsubmit = async e => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(f));
    const btn = f.querySelector('[type=submit]'); btn.disabled = true;
    try {
      if (modoForm === 'criar') {
        if (!d.nome.trim()) throw new Error('Digite seu nome de guerra.');
        await be.cadastrar(d.email.trim(), d.senha, { nome: d.nome.trim(), posto: d.posto, om: d.om.trim() });
      } else await be.entrar(d.email.trim(), d.senha);
    } catch (err) { f.querySelector('.erro').textContent = err.message; btn.disabled = false; }
  };
  const g = $('#google'); if (g) g.onclick = async () => { try { await be.entrarGoogle(); } catch (err) { $('.erro').textContent = err.message; } };
  const q = $('#esqueci'); if (q) q.onclick = async () => {
    const email = f.email.value.trim();
    if (!email) { $('.erro').textContent = 'Digite seu e-mail acima para receber o link.'; return; }
    try { await be.recuperarSenha(email); toast('Enviamos um link de redefinição para o seu e-mail.'); } catch (err) { $('.erro').textContent = err.message; }
  };
}

/* ---------------------------- configuração SLP ---------------------------- */
function seletorSLP(nome, valores, max = 4) {
  return `<div class="slp-grid">${ORDEM.map(k => `
    <label class="slp-item"><span>${SKILLS[k].icone} ${SKILLS[k].curto}</span>
      <select name="${nome}${k}">${Array.from({ length: max + 1 }, (_, n) => `<option value="${n}" ${valores[k] === n ? 'selected' : ''}>${n}</option>`).join('')}</select>
    </label>`).join('')}</div>`;
}

function lerSLP(form, nome) {
  const o = {}; ORDEM.forEach(k => o[k] = +form[nome + k].value); return o;
}

function telaOnboarding() {
  raiz.innerHTML = `
  <main class="auth">
    <h1 class="h-tela">Bem-vindo, ${esc(eu.posto)} ${esc(eu.nome)}!</h1>
    <p class="sub">Qual é o seu perfil atual? Use a ordem do STANAG 6001: <b>Ouvir – Falar – Ler – Escrever</b>.
    Se não tem certeza, deixe 1-1-1-1: você pode mudar depois no Perfil.</p>
    <form id="fSlp" class="card form">
      <label>Atalho: digite o perfil<input name="atalho" placeholder="Ex.: 2-1-2-2" inputmode="numeric" maxlength="7"></label>
      <h2 class="h-sec">Perfil atual</h2>
      ${seletorSLP('a', eu.slp, 4)}
      <h2 class="h-sec">Meta</h2>
      ${seletorSLP('m', eu.meta, 4)}
      <p class="nota">As lições dos níveis que você já tem ficam liberadas. As habilidades mais fracas aparecem primeiro.</p>
      <button class="btn" type="submit">Começar a missão</button>
    </form>
  </main>`;
  const f = $('#fSlp');
  f.atalho.oninput = () => {
    const m = f.atalho.value.match(/^([0-4])\D?([0-4])\D?([0-4])\D?([0-4])$/);
    if (m) ORDEM.forEach((k, i) => f['a' + k].value = m[i + 1]);
  };
  f.onsubmit = async e => {
    e.preventDefault();
    eu.slp = lerSLP(f, 'a'); eu.meta = lerSLP(f, 'm'); eu.configurado = true;
    skillAtual = ORDEM.reduce((a, k) => eu.slp[k] < eu.slp[a] ? k : a, 'L');
    await be.salvar(eu); telaPrincipal();
  };
}

/* ------------------------------ estrutura ------------------------------ */
function telaPrincipal() {
  normalizarPeriodo(eu);
  const pct = Math.min(100, Math.round(eu.xpHoje / META_DIARIA * 100));
  raiz.innerHTML = `
  <header class="topo">
    <div class="marca peq"><span class="logo" aria-hidden="true">★</span><b>Missão Idiomas</b></div>
    <div class="stats">
      <span class="stat" title="Dias seguidos estudando">🔥 <b>${eu.streak}</b></span>
      <span class="stat" title="XP total">⚡ <b>${eu.xp}</b></span>
      <span class="stat meta-dia" title="Meta diária: ${eu.xpHoje}/${META_DIARIA} XP"><span class="barra"><i style="width:${pct}%"></i></span></span>
    </div>
  </header>
  ${be.modo === 'local' ? '<div class="faixa-demo">Modo demonstração: ranking só deste navegador</div>' : ''}
  <main id="conteudo" class="conteudo"></main>
  <nav class="nav-baixo" aria-label="Navegação">
    ${[['trilha', '🗺️', 'Trilha'], ['ranking', '🏆', 'Ranking'], ['perfil', '🎖️', 'Perfil']].map(([id, ic, nm]) =>
      `<button data-aba="${id}" ${aba === id ? 'aria-current="page"' : ''}><span aria-hidden="true">${ic}</span>${nm}</button>`).join('')}
  </nav>`;
  raiz.querySelectorAll('[data-aba]').forEach(b => b.onclick = () => { aba = b.dataset.aba; telaPrincipal(); scrollTo(0, 0); });
  ({ trilha: abaTrilha, ranking: abaRanking, perfil: abaPerfil })[aba]();
}

/* -------------------------------- trilha -------------------------------- */
function abaTrilha() {
  const c = $('#conteudo');
  const lista = licoesDaSkill(skillAtual);
  const est = nivelEstimado(skillAtual);
  let html = `
  <div class="skills" role="tablist" aria-label="Habilidades">
    ${ORDEM.map(k => `<button role="tab" data-skill="${k}" aria-selected="${k === skillAtual}">
      <span class="ic" aria-hidden="true">${SKILLS[k].icone}</span><span>${SKILLS[k].curto}</span><b>${nivelEstimado(k)}</b></button>`).join('')}
  </div>
  <section class="resumo-skill card">
    <div><h2>${SKILLS[skillAtual].nome}</h2>
    <p>Nível estimado <b>${est}</b> · meta <b>${eu.meta[skillAtual]}</b></p></div>
    <div class="anel" style="--p:${Math.round(est / Math.max(1, eu.meta[skillAtual]) * 100)}"><span>${est}/${eu.meta[skillAtual]}</span></div>
  </section>`;

  let i = 0, primeiraAberta = null;
  for (let n = 1; n <= 3; n++) {
    const doNivel = lista.filter(l => l.lvl === n);
    html += `<section class="nivel"><div class="nivel-cab"><b>Nível ${n}</b> · ${NIVEIS[n].nome}<small>${NIVEIS[n].desc}</small></div><ol class="caminho">`;
    doNivel.forEach(l => {
      const idx = lista.indexOf(l);
      const lib = liberada(l, idx, lista);
      const feita = eu.feitas[l.id];
      const estado = feita ? 'feita' : lib ? 'aberta' : 'bloq';
      if (estado === 'aberta' && !primeiraAberta) primeiraAberta = l.id;
      const desloc = [0, 32, 0, -32][i++ % 4];
      html += `<li style="--x:${desloc}px">
        <button class="no ${estado} ${l.id === primeiraAberta ? 'atual' : ''}" data-licao="${l.id}" ${lib ? '' : 'disabled'} aria-label="${esc(l.titulo)}${feita ? ', concluída' : lib ? '' : ', bloqueada'}">
          <span aria-hidden="true">${feita ? '★' : lib ? SKILLS[l.skill].icone : '🔒'}</span>
        </button>
        <div class="no-info"><b>${esc(l.titulo)}</b><small>${esc(l.desc)}${feita ? ` · melhor ${feita.melhor}%` : ''}</small></div>
      </li>`;
    });
    html += `</ol></section>`;
  }
  html += `<section class="nivel bloq4 card"><div class="nivel-cab"><b>Nível 4</b> · ${NIVEIS[4].nome}<small>${NIVEIS[4].desc}</small></div></section>`;
  c.innerHTML = html;

  c.querySelectorAll('[data-skill]').forEach(b => b.onclick = () => {
    skillAtual = b.dataset.skill; try { localStorage.setItem('mi_skill', skillAtual); } catch { /* ok */ }
    abaTrilha();
  });
  c.querySelectorAll('[data-licao]').forEach(b => b.onclick = () => iniciarLicao(LICOES.find(l => l.id === b.dataset.licao)));
  const atual = c.querySelector('.no.atual');
  if (atual) atual.scrollIntoView({ block: 'center', behavior: 'instant' in document.documentElement.style ? 'instant' : 'auto' });
}

/* ------------------------------- ranking ------------------------------- */
async function abaRanking(tipo = 'semana') {
  const c = $('#conteudo');
  c.innerHTML = `
    <h1 class="h-tela">Ranking</h1>
    <div class="seg" role="tablist">
      <button role="tab" data-rk="semana" aria-selected="${tipo === 'semana'}">Esta semana</button>
      <button role="tab" data-rk="geral" aria-selected="${tipo === 'geral'}">Geral</button>
    </div>
    <p class="nota">${tipo === 'semana' ? 'A liga da semana zera toda segunda-feira.' : 'XP acumulado desde o cadastro.'}</p>
    <ol class="ranking card"><li class="vazio">Carregando…</li></ol>`;
  c.querySelectorAll('[data-rk]').forEach(b => b.onclick = () => abaRanking(b.dataset.rk));
  try {
    await be.salvar(eu);
    const lista = await be.ranking(tipo);
    const campo = tipo === 'semana' ? 'xpSemana' : 'xp';
    const ol = c.querySelector('.ranking');
    if (!lista.length) { ol.innerHTML = '<li class="vazio">Ninguém pontuou ainda. Faça uma lição e assuma a liderança!</li>'; return; }
    ol.innerHTML = lista.map((u, i) => `
      <li class="${u.uid === eu.uid ? 'eu' : ''}">
        <span class="pos">${['🥇', '🥈', '🥉'][i] || i + 1}</span>
        <span class="quem"><b>${esc(u.posto)} ${esc(u.nome)}</b><small>${esc(u.om || '—')} · ${slpTxt(u.slp || {})}</small></span>
        <span class="pts">${u[campo] || 0} XP</span>
      </li>`).join('');
  } catch (e) {
    console.error(e);
    c.querySelector('.ranking').innerHTML = `<li class="vazio">Não foi possível carregar o ranking. ${esc(e.message)}</li>`;
  }
}

/* -------------------------------- perfil -------------------------------- */
function abaPerfil() {
  const c = $('#conteudo');
  const est = {}; ORDEM.forEach(k => est[k] = nivelEstimado(k));
  const feitas = Object.keys(eu.feitas).length;
  c.innerHTML = `
    <h1 class="h-tela">${esc(eu.posto)} ${esc(eu.nome)}</h1>
    <section class="card perfil-res">
      <div><small>Perfil declarado</small><b>${slpTxt(eu.slp)}</b></div>
      <div><small>Estimado no app</small><b>${slpTxt(est)}</b></div>
      <div><small>Meta</small><b>${slpTxt(eu.meta)}</b></div>
      <div><small>Lições</small><b>${feitas}/${LICOES.length}</b></div>
    </section>
    <form id="fPerfil" class="card form">
      <div class="dupla">
        <label>Nome de guerra<input name="nome" value="${esc(eu.nome)}" maxlength="24" required></label>
        <label>Posto/Graduação<select name="posto">${POSTOS.map(p => `<option ${p === eu.posto ? 'selected' : ''}>${p}</option>`).join('')}</select></label>
      </div>
      <label>OM<input name="om" value="${esc(eu.om)}" maxlength="30"></label>
      <h2 class="h-sec">Perfil atual (Ouvir – Falar – Ler – Escrever)</h2>
      ${seletorSLP('a', eu.slp)}
      <h2 class="h-sec">Meta</h2>
      ${seletorSLP('m', eu.meta)}
      <button class="btn" type="submit">Salvar</button>
    </form>
    <section class="card nota-card">
      <h2 class="h-sec">Sobre o nível estimado</h2>
      <p>O app considera que você domina um nível quando conclui todas as lições dele com 80% ou mais. É uma estimativa para orientar o estudo, não uma certificação: a habilitação oficial vem do exame de proficiência da sua Força.</p>
    </section>
    <button class="btn sec" id="sair">Sair da conta</button>`;
  const f = $('#fPerfil');
  f.onsubmit = async e => {
    e.preventDefault();
    eu.nome = f.nome.value.trim() || eu.nome; eu.posto = f.posto.value; eu.om = f.om.value.trim();
    eu.slp = lerSLP(f, 'a'); eu.meta = lerSLP(f, 'm');
    await be.salvar(eu); toast('Perfil salvo.'); telaPrincipal();
  };
  $('#sair').onclick = () => be.sair();
}

/* ================================ LIÇÃO ================================ */
function iniciarLicao(lic) {
  const fila = lic.ex.map((e, i) => ({ e, i, repeticao: false }));
  const st = { lic, fila, pos: 0, total: lic.ex.length, certasPrimeira: 0, resolvidas: new Set() };
  passo(st);
}

function passo(st) {
  if (st.pos >= st.fila.length) return fimLicao(st);
  const item = st.fila[st.pos];
  document.onkeydown = null;
  const pct = Math.round(st.resolvidas.size / st.total * 100);
  raiz.innerHTML = `
  <div class="licao">
    <header class="licao-topo">
      <button class="fechar" aria-label="Sair da lição">✕</button>
      <div class="barra grande"><i style="width:${pct}%"></i></div>
    </header>
    <main class="ex" id="ex">${item.repeticao ? '<p class="tag-rep">Revisão do erro</p>' : ''}</main>
    <footer class="licao-pe" id="pe">
      <div class="feedback" id="fb" aria-live="polite"></div>
      <div class="acoes"><button class="btn" id="verificar" disabled>Verificar</button></div>
    </footer>
  </div>`;
  $('.fechar').onclick = () => { if (confirm('Sair da lição? O progresso desta lição será perdido.')) { speechSynthesis?.cancel?.(); telaPrincipal(); } };

  const ex = $('#ex');
  const btn = $('#verificar');
  const pronto = v => { btn.disabled = !v; };
  const motor = RENDER[item.e.t](ex, item.e, pronto, st.lic);
  let verificado = false;

  const verificar = () => {
    if (verificado) return avancar();
    if (btn.disabled) return;
    const r = motor.verificar();
    verificado = true;
    const primeira = r.primeira ?? r.ok;
    if (r.ok) {
      if (!item.repeticao && primeira) st.certasPrimeira++;
      st.resolvidas.add(item.i);
    } else if (!item.repeticao) {
      st.fila.push({ e: item.e, i: item.i, repeticao: true });
    } else {
      st.resolvidas.add(item.i); /* errou a revisão também: segue em frente */
    }
    const pe = $('#pe'); pe.classList.add(r.ok ? 'ok' : 'erro');
    $('#fb').innerHTML = `<b>${r.ok ? r.titulo || 'Correto!' : r.titulo || 'Não foi dessa vez'}</b>${r.detalhe ? `<div>${r.detalhe}</div>` : ''}`;
    btn.textContent = 'Continuar'; btn.disabled = false; btn.focus();
    ex.classList.add('travado');
  };
  const avancar = () => { st.pos++; passo(st); };
  btn.onclick = verificar;
  raiz.onkeydown = e => {
    if (e.key === 'Enter' && !e.shiftKey && e.target.tagName !== 'TEXTAREA') { e.preventDefault(); verificar(); }
  };
}

async function fimLicao(st) {
  speechSynthesis?.cancel?.();
  const acerto = Math.round(st.certasPrimeira / st.total * 100);
  const perfeito = acerto === 100;
  const ganho = 10 + st.certasPrimeira * 2 + (perfeito ? 5 : 0);
  normalizarPeriodo(eu);
  const hoje = hojeId(), ontem = hojeId(new Date(Date.now() - 86400000));
  if (eu.ultimoDia !== hoje) { eu.streak = eu.ultimoDia === ontem ? eu.streak + 1 : 1; eu.ultimoDia = hoje; }
  const antes = eu.xpHoje;
  eu.xp += ganho; eu.xpSemana += ganho; eu.xpHoje += ganho;
  const ant = eu.feitas[st.lic.id];
  eu.feitas[st.lic.id] = { melhor: Math.max(ant?.melhor || 0, acerto), vezes: (ant?.vezes || 0) + 1, em: Date.now() };
  const bateuMeta = antes < META_DIARIA && eu.xpHoje >= META_DIARIA;

  raiz.innerHTML = `
  <main class="fim">
    <div class="trofeu" aria-hidden="true">${perfeito ? '🏅' : acerto >= 80 ? '⭐' : '💪'}</div>
    <h1>${perfeito ? 'Missão cumprida com perfeição!' : acerto >= 80 ? 'Missão cumprida!' : 'Lição concluída'}</h1>
    <p class="sub">${esc(st.lic.titulo)} · ${SKILLS[st.lic.skill].nome} · Nível ${st.lic.lvl}</p>
    <div class="fim-stats">
      <div class="card"><small>XP</small><b>+${ganho}</b></div>
      <div class="card"><small>Acerto</small><b>${acerto}%</b></div>
      <div class="card"><small>Sequência</small><b>🔥 ${eu.streak}</b></div>
    </div>
    ${bateuMeta ? '<p class="aviso ok">Meta diária batida! 🎯</p>' : ''}
    ${acerto < 80 ? '<p class="nota">Refaça a lição com 80% ou mais para ela contar no seu nível estimado.</p>' : ''}
    <p class="salvando nota">Salvando…</p>
    <button class="btn" id="voltar">Continuar</button>
  </main>`;
  $('#voltar').onclick = () => { aba = 'trilha'; telaPrincipal(); };
  try { await be.salvar(eu); $('.salvando').textContent = ''; }
  catch (e) { console.error(e); $('.salvando').textContent = 'Não foi possível salvar agora. Verifique a conexão.'; }
}

/* --------------------------- tipos de exercício --------------------------- */
function blocoAudio(texto) {
  return `<div class="audio">
    <button class="btn-audio" data-falar="n" aria-label="Ouvir">🔊</button>
    <button class="btn-audio peq" data-falar="l" aria-label="Ouvir devagar">🐢</button>
    <span class="nota">Toque para ouvir${'speechSynthesis' in window ? '' : ' (seu navegador não tem voz)'}</span>
  </div>`;
}
function ligarAudio(el, texto) {
  el.querySelectorAll('[data-falar]').forEach(b => b.onclick = () => falar(texto, b.dataset.falar === 'l'));
  setTimeout(() => falar(texto), 350);
}
function blocoTexto(p) { return p ? `<blockquote class="passagem">${esc(p).replace(/\n/g, '<br>')}</blockquote>` : ''; }

const RENDER = {
  choice(el, e, pronto) {
    el.insertAdjacentHTML('beforeend', `
      <h2 class="enunciado">${e.audio ? 'Ouça e responda' : e.passage ? 'Leia e responda' : 'Escolha a resposta'}</h2>
      ${e.audio ? blocoAudio(e.audio) : ''}${blocoTexto(e.passage)}
      <p class="pergunta">${esc(e.q)}</p>
      <div class="opcoes">${e.opts.map((o, i) => `<button class="opcao" data-i="${i}"><kbd>${i + 1}</kbd>${esc(o)}</button>`).join('')}</div>
      ${e.audio ? `<details class="transc" hidden><summary>Ver transcrição</summary><p>${esc(e.audio)}</p></details>` : ''}`);
    if (e.audio) ligarAudio(el, e.audio);
    let sel = null;
    const ops = el.querySelectorAll('.opcao');
    ops.forEach(b => b.onclick = () => { ops.forEach(o => o.classList.remove('sel')); b.classList.add('sel'); sel = +b.dataset.i; pronto(true); });
    el.ownerDocument.onkeydown = ev => { const n = +ev.key; if (n >= 1 && n <= e.opts.length && !el.classList.contains('travado')) ops[n - 1].click(); };
    return {
      verificar() {
        el.ownerDocument.onkeydown = null;
        ops[e.a].classList.add('certa'); if (sel !== e.a) ops[sel].classList.add('errada');
        const t = el.querySelector('.transc'); if (t) t.hidden = false;
        return { ok: sel === e.a, detalhe: sel === e.a ? '' : `Resposta: ${esc(e.opts[e.a])}` };
      },
    };
  },

  type(el, e, pronto) {
    el.insertAdjacentHTML('beforeend', `
      <h2 class="enunciado">${e.audio ? 'Ouça e escreva' : e.passage ? 'Leia e responda' : 'Escreva em inglês'}</h2>
      ${e.audio ? blocoAudio(e.audio) : ''}${blocoTexto(e.passage)}
      <p class="pergunta">${esc(e.q)}</p>
      <input class="resposta" autocomplete="off" autocapitalize="off" spellcheck="false" lang="en" aria-label="Sua resposta">`);
    if (e.audio) ligarAudio(el, e.audio);
    const inp = el.querySelector('.resposta');
    inp.oninput = () => pronto(inp.value.trim().length > 0);
    setTimeout(() => inp.focus(), 50);
    return {
      verificar() {
        inp.disabled = true;
        const ok = e.a.some(a => norm(a) === norm(inp.value));
        return { ok, detalhe: ok ? (e.audio ? `“${esc(e.audio)}”` : '') : `Resposta: ${esc(e.audio || e.a[0])}` };
      },
    };
  },

  build(el, e, pronto) {
    const fichas = embaralhar([...e.a.split(' '), ...(e.extra || [])]).map((w, i) => ({ w, i }));
    el.insertAdjacentHTML('beforeend', `
      <h2 class="enunciado">Monte a frase em inglês</h2>
      <p class="pergunta pt">“${esc(e.pt)}”</p>
      <div class="linha-resp" aria-label="Sua frase"></div>
      <div class="banco"></div>`);
    const linha = el.querySelector('.linha-resp'), banco = el.querySelector('.banco');
    const escolhidas = [];
    const desenhar = () => {
      linha.innerHTML = escolhidas.map(f => `<button class="ficha" data-i="${f.i}">${esc(f.w)}</button>`).join('') || '<span class="placeholder">Toque nas palavras abaixo</span>';
      banco.innerHTML = fichas.map(f => `<button class="ficha ${escolhidas.includes(f) ? 'usada' : ''}" data-i="${f.i}" ${escolhidas.includes(f) ? 'disabled' : ''}>${esc(f.w)}</button>`).join('');
      linha.querySelectorAll('.ficha').forEach(b => b.onclick = () => { escolhidas.splice(escolhidas.findIndex(f => f.i === +b.dataset.i), 1); desenhar(); });
      banco.querySelectorAll('.ficha:not(.usada)').forEach(b => b.onclick = () => { escolhidas.push(fichas.find(f => f.i === +b.dataset.i)); desenhar(); });
      pronto(escolhidas.length > 0);
    };
    desenhar();
    return {
      verificar() {
        const ok = norm(escolhidas.map(f => f.w).join(' ')) === norm(e.a);
        return { ok, detalhe: ok ? '' : `Resposta: ${esc(e.a)}` };
      },
    };
  },

  match(el, e, pronto) {
    const esq = embaralhar(e.pairs.map((p, i) => ({ t: p[0], i })));
    const dir = embaralhar(e.pairs.map((p, i) => ({ t: p[1], i })));
    el.insertAdjacentHTML('beforeend', `
      <h2 class="enunciado">Ligue os pares</h2>
      <div class="pares">
        <div class="col">${esq.map(x => `<button class="par" data-l="${x.i}" lang="en">${esc(x.t)}</button>`).join('')}</div>
        <div class="col">${dir.map(x => `<button class="par" data-r="${x.i}">${esc(x.t)}</button>`).join('')}</div>
      </div>`);
    let sel = null, feitos = 0, erros = 0;
    el.querySelectorAll('.par').forEach(b => b.onclick = () => {
      if (b.classList.contains('ok')) return;
      const lado = 'l' in b.dataset ? 'l' : 'r';
      if (lado === 'l') { falar(b.textContent); }
      if (!sel || sel.lado === lado) {
        el.querySelectorAll(`[data-${lado}]`).forEach(o => o.classList.remove('sel'));
        b.classList.add('sel'); sel = { lado, b }; return;
      }
      const a = sel.b, iA = a.dataset.l ?? a.dataset.r, iB = b.dataset.l ?? b.dataset.r;
      if (iA === iB) {
        [a, b].forEach(x => { x.classList.remove('sel'); x.classList.add('ok'); x.disabled = true; });
        if (++feitos === e.pairs.length) pronto(true);
      } else {
        erros++;
        [a, b].forEach(x => { x.classList.add('errada'); setTimeout(() => x.classList.remove('errada', 'sel'), 450); });
      }
      sel = null;
    });
    return { verificar: () => ({ ok: true, primeira: erros === 0, titulo: erros ? 'Pares completos' : 'Perfeito!', detalhe: erros ? `${erros} tentativa(s) errada(s).` : '' }) };
  },

  speak(el, e, pronto, lic) {
    const livre = !e.say;
    el.insertAdjacentHTML('beforeend', livre ? `
      <h2 class="enunciado">Fale livremente</h2>
      <p class="pergunta" lang="en">${esc(e.prompt)}</p>
      <p class="nota">Fale pelo menos ${e.min} palavras. Use expressões como: <i lang="en">${e.keys.slice(0, 4).map(esc).join(', ')}</i>.</p>` : `
      <h2 class="enunciado">Fale esta frase</h2>
      <div class="frase-falar"><button class="btn-audio peq" data-falar="n" aria-label="Ouvir modelo">🔊</button><p lang="en">${esc(e.say)}</p></div>
      <p class="nota pt">${esc(e.pt)}</p>`);
    el.insertAdjacentHTML('beforeend', `
      <div class="mic-area">
        ${SR ? `<button class="mic" aria-label="Gravar"><span aria-hidden="true">🎙️</span></button><p class="mic-st nota">Toque no microfone e fale</p>` :
        `<p class="aviso">Seu navegador não reconhece voz (use Chrome, Edge ou Safari). Fale em voz alta e digite o que disse:</p>`}
        <textarea class="transcricao" rows="${livre ? 5 : 2}" lang="en" placeholder="${SR ? 'O que o app entendeu aparece aqui (você pode corrigir)' : 'Digite o que você falou'}"></textarea>
      </div>`);
    if (!livre) el.querySelector('[data-falar]').onclick = () => falar(e.say);
    const ta = el.querySelector('.transcricao');
    ta.oninput = () => pronto(ta.value.trim().length > 0);
    let rec = null, gravando = false, base = '';
    const mic = el.querySelector('.mic'), stt = el.querySelector('.mic-st');
    if (mic) mic.onclick = () => {
      if (gravando) { rec.stop(); return; }
      speechSynthesis?.cancel?.();
      rec = new SR(); rec.lang = 'en-US'; rec.interimResults = true; rec.continuous = livre;
      base = livre ? ta.value.trim() : '';
      rec.onresult = ev => {
        let txt = '';
        for (let i = 0; i < ev.results.length; i++) txt += ev.results[i][0].transcript + ' ';
        ta.value = (base ? base + ' ' : '') + txt.trim(); pronto(ta.value.trim().length > 0);
      };
      rec.onerror = ev => { stt.textContent = ev.error === 'not-allowed' ? 'Permita o uso do microfone ou digite o que falou.' : 'Não entendi. Tente de novo ou digite.'; };
      rec.onend = () => { gravando = false; mic.classList.remove('on'); if (!stt.textContent.startsWith('Não') && !stt.textContent.startsWith('Permita')) stt.textContent = 'Toque para gravar de novo'; };
      rec.start(); gravando = true; mic.classList.add('on'); stt.textContent = livre ? 'Gravando… toque de novo para parar' : 'Ouvindo…';
    };
    return {
      verificar() {
        try { rec?.stop(); } catch { /* já parado */ }
        ta.disabled = true;
        if (livre) return avaliarLivre(ta.value, e, 'fala');
        const alvo = palavras(e.say), dito = new Set(palavras(ta.value));
        const acertos = alvo.filter(w => dito.has(w)).length;
        const pct = Math.round(acertos / alvo.length * 100);
        const faltou = alvo.filter(w => !dito.has(w));
        const ok = pct >= 75;
        return { ok, titulo: ok ? `Boa pronúncia! (${pct}%)` : `Quase lá (${pct}%)`, detalhe: faltou.length ? `Palavras não reconhecidas: <i lang="en">${faltou.map(esc).join(', ')}</i>` : '' };
      },
    };
  },

  write(el, e, pronto) {
    el.insertAdjacentHTML('beforeend', `
      <h2 class="enunciado">Escreva</h2>
      <p class="pergunta">${esc(e.prompt)}</p>
      <textarea class="transcricao grande" rows="8" lang="en" spellcheck="true" placeholder="Escreva em inglês…"></textarea>
      <p class="contador nota">0 / ${e.min} palavras</p>`);
    const ta = el.querySelector('textarea'), cont = el.querySelector('.contador');
    ta.oninput = () => { const n = palavras(ta.value).length; cont.textContent = `${n} / ${e.min} palavras`; pronto(n >= Math.ceil(e.min / 2)); };
    setTimeout(() => ta.focus(), 50);
    return { verificar() { ta.disabled = true; return avaliarLivre(ta.value, e, 'texto'); } };
  },
};

function avaliarLivre(texto, e, tipo) {
  const n = palavras(texto).length;
  const t = ' ' + norm(texto) + ' ';
  const achadas = e.keys.filter(k => t.includes(' ' + norm(k) + ' '));
  const precisa = Math.min(2, e.keys.length);
  const ok = n >= e.min && achadas.length >= precisa;
  const itens = [
    `${n >= e.min ? '✅' : '⚠️'} ${n} palavras (mínimo ${e.min})`,
    `${achadas.length >= precisa ? '✅' : '⚠️'} Expressões usadas: ${achadas.length ? `<i lang="en">${achadas.map(esc).join(', ')}</i>` : 'nenhuma das sugeridas'}`,
  ];
  if (e.model) itens.push(`<details><summary>Ver resposta-modelo</summary><p lang="en">${esc(e.model).replace(/\n/g, '<br>')}</p></details>`);
  itens.push('<small>Correção automática simples (tamanho e conectivos). O tutor com IA vai avaliar gramática, coerência e vocabulário.</small>');
  return { ok, titulo: ok ? `Bom ${tipo}!` : `Desenvolva mais o ${tipo}`, detalhe: `<ul class="rubrica">${itens.map(i => `<li>${i}</li>`).join('')}</ul>` };
}

/* ================================ INÍCIO ================================ */
(async function iniciar() {
  telaCarregando();
  be = await criarBackend();
  be.onAuth((perfil, erro) => {
    eu = perfil ? normalizarPeriodo(perfil) : null;
    if (!eu) return telaAuth('entrar', erro ? erro.message : '');
    if (!eu.configurado) return telaOnboarding();
    telaPrincipal();
  });
})();
