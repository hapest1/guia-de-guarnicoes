// Gera app/www a partir do site estático na raiz do repositório.
//
// O que muda em relação ao site:
// - remove Google Analytics, AdSense e o contador de visitas (no app os anúncios são AdMob, nativos);
// - links internos sem extensão (/manaus-am) passam a apontar para o arquivo (/manaus-am.html),
//   porque o servidor do app (capacitor://localhost) não resolve URLs "limpas";
// - baixa as fontes do Google Fonts para dentro do app, para tudo funcionar offline;
// - injeta app.css e app.js (barra de abas, favoritos, compartilhar e AdMob);
// - gera a página salvos.html (guarnições favoritas) e o índice de cidades usado por ela.
//
// Uso: node scripts/build-www.mjs   (variáveis opcionais: ADMOB_BANNER_ID_IOS, ADMOB_TESTING=0)

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const APP = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = path.resolve(APP, '..');
const OUT = path.join(APP, 'www');
const SRC = path.join(APP, 'src');

// Arquivos e pastas do site que não vão para o app
const EXCLUIR = new Set([
  'app', 'og', 'dados', 'node_modules', 'graphify-out', '.git', '.github',
  '.htaccess', '.gitignore', 'CNAME', 'ads.txt', 'robots.txt', 'sitemap.xml', 'site.webmanifest',
  'anuncie.html', 'anuncie.js', // página de venda de anúncios do site: não faz sentido no app
]);
const EXT_OK = new Set(['.html', '.js', '.css', '.png', '.jpg', '.jpeg', '.webp', '.svg', '.ico', '.json', '.woff2']);

// Páginas que só redirecionam para outra (ficam de fora; links para elas são corrigidos)
const REDIRECIONA = {};

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

function copiarArvore(dir, rel = '') {
  for (const nome of fs.readdirSync(dir)) {
    if (EXCLUIR.has(nome) || nome.startsWith('.')) continue;
    const abs = path.join(dir, nome), r = path.join(rel, nome);
    const st = fs.statSync(abs);
    if (st.isDirectory()) { copiarArvore(abs, r); continue; }
    if (!EXT_OK.has(path.extname(nome).toLowerCase())) continue;
    if (nome.endsWith('.html')) {
      const s = fs.readFileSync(abs, 'utf8');
      const m = s.length < 2000 && s.match(/http-equiv="refresh" content="0; url=\/([^"]+)"/);
      if (m) { REDIRECIONA['/' + r.replace(/\.html$/, '')] = '/' + m[1]; continue; }
    }
    fs.mkdirSync(path.join(OUT, rel), { recursive: true });
    fs.copyFileSync(abs, path.join(OUT, r));
  }
}
copiarArvore(SITE);

const existe = (p) => fs.existsSync(path.join(OUT, p));

// Converte um caminho interno do site para o arquivo correspondente no app
function resolverCaminho(p) {
  if (REDIRECIONA[p]) p = REDIRECIONA[p];
  if (p === '/' || p === '') return '/index.html';
  if (p.endsWith('/')) return existe(p + 'index.html') ? p + 'index.html' : null;
  if (path.extname(p)) return null; // já aponta para um arquivo
  if (existe(p + '.html')) return p + '.html';
  if (existe(p + '/index.html')) return p + '/index.html';
  return null;
}

function reescreverLinks(html, ehIndex) {
  return html.replace(/(href|action)="(\/[^"]*)"/g, (tudo, attr, url) => {
    const m = url.match(/^([^?#]*)([?#].*)?$/);
    const p = m[1], resto = m[2] || '';
    // Na página inicial, o menu.js trata os links "/#cm..." sem recarregar a página
    if (ehIndex && p === '/' && resto.startsWith('#')) return tudo;
    const novo = resolverCaminho(p);
    return novo ? `${attr}="${novo}${resto}"` : tudo;
  });
}

// ---------- Fontes (offline) ----------
const FONTES_URL = 'https://fonts.googleapis.com/css2?family=Saira+Condensed:wght@500;600;700&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;1,400&family=IBM+Plex+Mono:wght@400;500&display=swap';
let fontesLocais = false;
try {
  const ua = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1';
  let css = await (await fetch(FONTES_URL, { headers: { 'User-Agent': ua } })).text();
  if (!css.includes('@font-face')) throw new Error('CSS de fontes inesperado');
  fs.mkdirSync(path.join(OUT, 'fonts'), { recursive: true });
  const urls = [...new Set(css.match(/https:\/\/fonts\.gstatic\.com\/[^)]+/g) || [])];
  let i = 0;
  for (const u of urls) {
    const nome = `f${i++}.woff2`;
    const buf = Buffer.from(await (await fetch(u)).arrayBuffer());
    fs.writeFileSync(path.join(OUT, 'fonts', nome), buf);
    css = css.split(u).join(`/fonts/${nome}`);
  }
  fs.writeFileSync(path.join(OUT, 'fonts', 'fontes.css'), css);
  fontesLocais = true;
  console.log(`Fontes: ${urls.length} arquivos baixados para uso offline.`);
} catch (e) {
  console.warn('Aviso: não foi possível baixar as fontes; o app usará as do Google Fonts quando online.', e.message);
}

// ---------- Índice de cidades (para a página Salvos) ----------
const cidades = {};

// ---------- Transformação das páginas ----------
const CONFIG = {
  bannerId: process.env.ADMOB_BANNER_ID_IOS || 'ca-app-pub-3940256099942544/2435281174', // ID de teste do Google
  testing: process.env.ADMOB_TESTING !== '0',
  site: 'https://guiadeguarnicoes.com',
};

function transformar(rel, html) {
  const ehIndex = rel === 'index.html';
  // Analytics, AdSense e contador
  html = html.replace(/<script async src="https:\/\/www\.googletagmanager\.com\/[^"]*"><\/script>\s*/g, '');
  html = html.replace(/<script(?: id="terceiros")?>(?:(?!<\/script>)[\s\S])*?(?:gtag\(|adsbygoogle)(?:(?!<\/script>)[\s\S])*?<\/script>\s*/g, '');
  html = html.replace(/<script src="\/contador\.js"[^>]*><\/script>\s*/g, '');
  html = html.replace(/<link rel="manifest"[^>]*>/g, '');
  html = html.replace(/<p class="eyebrow"[^>]*id="visitas-wrap">[\s\S]*?<\/p>\s*/g, '');
  html = html.replace('Este site usa o Google Analytics para contar visitas e exibe anúncios do Google AdSense.', 'Este app exibe anúncios do Google AdMob.');
  html = html.replace(/ · <a href="\/anuncie"[^>]*>Anuncie<\/a>/g, '');
  html = html.replace(/<a href="\/anuncie"[^>]*>([\s\S]*?)<\/a>/g, '$1'); // demais menções viram texto
  // Página inicial: sem os banners da Calculadora e do Missão Idiomas (a calculadora já está na aba Calcular)
  html = html.replace(/\s*<section class="wrap calc-home"[\s\S]*?<\/section>/, '');
  html = html.replace(/\s*<a class="idi-home-banner"[\s\S]*?<\/a>/g, '');
  // Fontes locais
  if (fontesLocais) {
    html = html.replace(/<link rel="preconnect" href="https:\/\/fonts\.(googleapis|gstatic)\.com"[^>]*>\s*/g, '');
    html = html.replace(/<link rel="preload" as="style" href="https:\/\/fonts\.googleapis\.com[^>]*>(<noscript>.*?<\/noscript>)?/g,
      '<link rel="stylesheet" href="/fonts/fontes.css">');
    // Páginas que carregam as fontes com um <link rel="stylesheet"> simples (ex.: Postos na Rota)
    html = html.replace(/<link rel="stylesheet" href="https:\/\/fonts\.googleapis\.com[^>]*>/g,
      '<link rel="stylesheet" href="/fonts/fontes.css">');
  }
  // Tela cheia por baixo do notch (o CSS do app cuida das margens)
  html = html.replace(/<meta name="viewport" content="([^"]*)">/, (t, c) =>
    c.includes('viewport-fit') ? t : `<meta name="viewport" content="${c},viewport-fit=cover">`);
  // Redirecionamentos feitos por script
  html = html.replace("location.replace('/'+m[h])", "location.replace('/'+m[h]+'.html')");
  html = reescreverLinks(html, ehIndex);
  // CSS e JS do app
  html = html.replace('</head>', `<link rel="stylesheet" href="/app.css">\n<script>window.GG_APP=${JSON.stringify(CONFIG)}</script>\n<script src="/app.js" defer></script>\n</head>`);

  // Ficha de cidade? Guarda nome, UF e descrição para a página Salvos
  if (/<div class="fhead">/.test(html)) {
    const h1 = html.match(/<div class="fhead">[\s\S]*?<h1>([^<]*)<span>([A-Z]{2})<\/span><\/h1>/);
    const desc = html.match(/<meta name="description" content="([^"]*)"/);
    const cm = html.match(/<span class="tag hot">([A-Z]+) ·/);
    if (h1) cidades[rel.replace(/\.html$/, '')] = { n: h1[1].trim(), uf: h1[2], cm: cm ? cm[1] : '', d: desc ? desc[1] : '' };
  }
  return html;
}

function percorrer(dir, rel = '') {
  for (const nome of fs.readdirSync(dir)) {
    const abs = path.join(dir, nome), r = rel ? `${rel}/${nome}` : nome;
    if (fs.statSync(abs).isDirectory()) { percorrer(abs, r); continue; }
    if (!nome.endsWith('.html')) continue;
    fs.writeFileSync(abs, transformar(r, fs.readFileSync(abs, 'utf8')));
  }
}

// Arquivos próprios do app
for (const nome of fs.readdirSync(SRC)) fs.copyFileSync(path.join(SRC, nome), path.join(OUT, nome));

// salvos.html nasce do 404.html (mesmo cabeçalho e rodapé do site)
{
  let base = fs.readFileSync(path.join(OUT, '404.html'), 'utf8');
  const tpl = fs.readFileSync(path.join(SRC, 'salvos.tpl.html'), 'utf8');
  base = base.replace(/<title>[^<]*<\/title>/, '<title>Guarnições salvas · Guia de Guarnições</title>');
  base = base.replace(/<main[\s\S]*<\/main>/, tpl);
  fs.writeFileSync(path.join(OUT, 'salvos.html'), base);
  fs.rmSync(path.join(OUT, 'salvos.tpl.html'));
}

percorrer(OUT);
fs.writeFileSync(path.join(OUT, 'cidades-app.js'), `window.GG_CIDADES=${JSON.stringify(cidades)};\n`);

// Verificação: todo link interno precisa apontar para um arquivo existente
let quebrados = 0;
(function checar(dir, rel = '') {
  for (const nome of fs.readdirSync(dir)) {
    const abs = path.join(dir, nome), r = rel ? `${rel}/${nome}` : nome;
    if (fs.statSync(abs).isDirectory()) { checar(abs, r); continue; }
    if (!nome.endsWith('.html')) continue;
    const s = fs.readFileSync(abs, 'utf8');
    for (const [, url] of s.matchAll(/href="(\/[^"#?]*)/g)) {
      if (url === '/' ) continue; // links /#cm... da página inicial
      if (!existe(url)) { quebrados++; if (quebrados <= 15) console.warn(`Link quebrado em ${r}: ${url}`); }
    }
  }
})(OUT);

console.log(`www gerado: ${Object.keys(cidades).length} fichas de cidade, ${quebrados} links internos quebrados.`);
if (quebrados) process.exitCode = 1;
