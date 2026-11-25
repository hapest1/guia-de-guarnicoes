/* Guia de Guarnições — barra de abas, salvar e compartilhar fichas, página Salvos.
   O mesmo arquivo roda no site e no app do iPhone, para os dois ficarem iguais.
   No site, a barra de abas aparece no celular (até 860 px); no computador fica o menu do topo.
   Só no app (window.GG_APP, posto pelo build do app): links internos com .html, links externos no
   Safari do app, compartilhamento nativo, aviso de sem conexão e banner do AdMob. */
(function () {
  'use strict';
  var Cap = window.Capacitor;
  var nativo = !!(Cap && Cap.isNativePlatform && Cap.isNativePlatform());
  var P = (Cap && Cap.Plugins) || {};
  var APP = !!window.GG_APP;
  var CFG = window.GG_APP || {};
  var root = document.documentElement;
  if (APP) root.classList.add('app');
  if (nativo) root.classList.add('nativo');
  /* no app, endereço de arquivo (/manaus-am.html); no site, endereço limpo (/manaus-am) */
  function end(p) { return APP ? (p === '/' ? '/index.html' : p + '.html') : p; }
  /* barra de abas: sempre no app; no site, só em tela de celular */
  var celular = window.matchMedia ? matchMedia('(max-width: 860px)') : { matches: false };
  function marcarAbas() { root.classList.toggle('abas', APP || celular.matches); }
  marcarAbas();
  if (celular.addEventListener) celular.addEventListener('change', marcarAbas);

  var ss = (function () { try { return window.sessionStorage; } catch (e) { return null; } })();
  var ls = (function () { try { return window.localStorage; } catch (e) { return null; } })();

  /* ---------- Armazenamento (Preferences no app, localStorage no navegador) ---------- */
  function ler(chave) {
    if (P.Preferences) return P.Preferences.get({ key: chave }).then(function (r) { return parse(r && r.value); }).catch(function () { return []; });
    return Promise.resolve(parse(ls && ls.getItem(chave)));
  }
  function gravar(chave, val) {
    var s = JSON.stringify(val);
    if (P.Preferences) return P.Preferences.set({ key: chave, value: s }).catch(function () {});
    try { ls && ls.setItem(chave, s); } catch (e) {}
    return Promise.resolve();
  }
  function parse(s) { try { var v = JSON.parse(s || '[]'); return Array.isArray(v) ? v : []; } catch (e) { return []; } }
  function vibrar() { if (P.Haptics) P.Haptics.impact({ style: 'LIGHT' }).catch(function () {}); }

  /* ---------- Endereços ---------- */
  var caminho = location.pathname;
  var slug = caminho.replace(/^\//, '').replace(/\.html$/, '').replace(/\/$/, '');
  function urlPublica() {
    var p = caminho.replace(/index\.html$/, '').replace(/\.html$/, '');
    return (CFG.site || 'https://guiadeguarnicoes.com') + p + location.search;
  }
  function interno(a) { return a.origin === location.origin; }
  /* Corrige links internos sem extensão (criados por script), ex.: /manaus-am -> /manaus-am.html */
  function arquivo(a) {
    var p = a.pathname;
    if (p === '/' || p === '') return '/index.html';
    if (/\/$/.test(p)) return p + 'index.html';
    if (!/\.[a-z0-9]+$/i.test(p.split('/').pop())) return p + '.html';
    return null;
  }

  if (APP) document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return;
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href');
    if (!href || href.charAt(0) === '#') return;
    if (interno(a)) {
      var novo = arquivo(a);
      if (novo) { e.preventDefault(); location.href = novo + a.search + a.hash; }
      return;
    }
    /* Links externos: http(s) abrem no Safari dentro do app; mailto/tel/whatsapp seguem para o sistema */
    if (/^https?:$/.test(a.protocol) && !/(^|\.)wa\.me$|whatsapp\.com$/.test(a.hostname)) {
      e.preventDefault();
      if (P.Browser) P.Browser.open({ url: a.href, presentationStyle: 'popover' }).catch(function () { location.href = a.href; });
      else window.open(a.href, '_blank', 'noopener');
    }
  });

  /* ---------- Compartilhar ---------- */
  function titulo() {
    var h1 = document.querySelector('.fhead h1, main h1');
    return h1 ? h1.textContent.replace(/\s+/g, ' ').trim() : document.title;
  }
  function compartilhar(url, texto) {
    url = url || urlPublica();
    texto = texto || ('Guia de Guarnições: ' + titulo());
    if (P.Share) return P.Share.share({ title: texto, text: texto, url: url, dialogTitle: 'Compartilhar' }).catch(function () {});
    if (navigator.share) return navigator.share({ title: texto, url: url }).catch(function () {});
    if (navigator.clipboard) navigator.clipboard.writeText(url);
  }
  /* Os botões do site "Compartilhar no WhatsApp" e "Copiar link da simulação" viram o compartilhamento do iOS,
     já com o endereço público (o endereço interno do app não abre fora dele). */
  if (APP) document.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('.sn-zap, #copiar');
    if (!t) return;
    e.preventDefault(); e.stopImmediatePropagation();
    compartilhar(urlPublica(), t.id === 'copiar' ? 'Minha simulação no Guia de Guarnições' : null);
  }, true);

  /* ---------- Barra de abas ---------- */
  var ICON = {
    inicio: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M10 21v-6h4v6"/>',
    mapa: '<path d="M9 4 3 6.5v13.5L9 17.5l6 2.5 6-2.5V4l-6 2.5z"/><path d="M9 4v13.5M15 6.5V20"/>',
    comparar: '<path d="M4 7h13l-3-3M20 17H7l3 3"/>',
    rota: '<circle cx="6" cy="19" r="2.5"/><circle cx="18" cy="5" r="2.5"/><path d="M8.5 19H17a3.5 3.5 0 0 0 0-7H7a3.5 3.5 0 0 1 0-7h8.5"/>',
    calc: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 12h2M14 12h2M8 16h2M14 16h2"/>',
    salvos: '<path d="M6 3h12v18l-6-4.5L6 21z"/>'
  };
  var ABAS = [
    { href: end('/'), t: 'Início', i: 'inicio', m: /^\/(index\.html)?$/ },
    { href: end('/locais-de-servir'), t: 'Mapa', i: 'mapa', m: /^\/locais-de-servir/ },
    { href: end('/planejamento-de-rota'), t: 'Rota', i: 'rota', m: /^\/(planejamento-de-rota|postos-na-rota)/ },
    { href: end('/calculadora-de-transferencia'), t: 'Calcular', i: 'calc', m: /^\/calculadora/ },
    { href: end('/salvos'), t: 'Salvos', i: 'salvos', m: /^\/salvos/ }
  ];
  function montarAbas() {
    var nav = document.createElement('nav');
    nav.className = 'gg-tabs'; nav.setAttribute('aria-label', 'Navegação principal');
    nav.innerHTML = ABAS.map(function (a) {
      return '<a href="' + a.href + '"' + (a.m.test(caminho) ? ' aria-current="page"' : '') + '><svg viewBox="0 0 24 24" aria-hidden="true">' + ICON[a.i] + '</svg>' + a.t + '</a>';
    }).join('');
    document.body.appendChild(nav);
  }

  /* ---------- Fichas: salvar, compartilhar e histórico ---------- */
  var SALVOS = 'gg_salvos', RECENTES = 'gg_recentes';
  function ehFicha() { return !!document.querySelector('.fhead h1'); }

  function montarAcoesFicha() {
    var fhead = document.querySelector('.fhead');
    var h1 = fhead.querySelector('h1');
    var box = document.createElement('div'); box.className = 'gg-acoes';
    box.innerHTML =
      '<button type="button" class="gg-btn" id="gg-salvar" aria-pressed="false"><svg viewBox="0 0 24 24" aria-hidden="true">' + ICON.salvos + '</svg><span>Salvar</span></button>' +
      '<button type="button" class="gg-btn" id="gg-share"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12M7 8l5-5 5 5"/><path d="M5 13v7h14v-7"/></svg>Compartilhar</button>';
    var ref = fhead.querySelector('.coord') || h1;
    ref.parentNode.insertBefore(box, ref.nextSibling);

    var bSalvar = box.querySelector('#gg-salvar');
    function pintar(on) { bSalvar.setAttribute('aria-pressed', on ? 'true' : 'false'); bSalvar.querySelector('span').textContent = on ? 'Salva' : 'Salvar'; }
    ler(SALVOS).then(function (l) { pintar(l.indexOf(slug) >= 0); });
    bSalvar.addEventListener('click', function () {
      ler(SALVOS).then(function (l) {
        var i = l.indexOf(slug), on = i < 0;
        if (on) l.unshift(slug); else l.splice(i, 1);
        pintar(on); vibrar();
        return gravar(SALVOS, l);
      });
    });
    box.querySelector('#gg-share').addEventListener('click', function () { compartilhar(); });

    ler(RECENTES).then(function (l) {
      l = l.filter(function (s) { return s !== slug; }); l.unshift(slug);
      return gravar(RECENTES, l.slice(0, 8));
    });
  }

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function item(s, removivel) {
    var c = (window.GG_CIDADES || {})[s]; if (!c) return '';
    return '<div class="gg-item"><a href="' + end('/' + s) + '"><b>' + esc(c.n) + '<small>' + esc(c.uf) + (c.cm ? ' · ' + esc(c.cm) : '') + '</small></b><p>' + esc(c.d) + '</p></a>' +
      (removivel ? '<button type="button" data-s="' + esc(s) + '" aria-label="Remover ' + esc(c.n) + ' dos salvos">✕</button>' : '') + '</div>';
  }
  function montarSalvos() {
    var box = document.getElementById('gg-salvos'); if (!box) return;
    function render() {
      ler(SALVOS).then(function (l) {
        var h = l.map(function (s) { return item(s, true); }).join('');
        box.innerHTML = h || '<p class="gg-vazio">Nenhuma guarnição salva ainda. Abra uma ficha e toque em <b>Salvar</b>.</p>';
      });
      ler(RECENTES).then(function (l) {
        var h = l.map(function (s) { return item(s, false); }).join('');
        document.getElementById('gg-recentes').innerHTML = h;
        document.getElementById('gg-recentes-sec').hidden = !h;
      });
    }
    box.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-s]'); if (!b) return;
      ler(SALVOS).then(function (l) { l.splice(l.indexOf(b.dataset.s), 1); vibrar(); return gravar(SALVOS, l); }).then(render);
    });
    render();
  }

  /* ---------- Sem conexão ---------- */
  function avisoConexao() {
    var el;
    function atual() {
      if (navigator.onLine) { if (el) { el.remove(); el = null; } return; }
      if (el) return;
      el = document.createElement('div'); el.className = 'gg-offline'; el.setAttribute('role', 'status');
      el.textContent = 'Sem internet: as fichas continuam disponíveis; fotos e mapas aparecem quando a conexão voltar.';
      document.body.appendChild(el);
      setTimeout(function () { if (el) { el.remove(); el = null; } }, 6000);
    }
    addEventListener('offline', atual); addEventListener('online', atual); atual();
  }

  /* ---------- AdMob ---------- */
  function alturaAnuncio(h) { root.style.setProperty('--ad-h', (h || 0) + 'px'); }
  function anuncios() {
    var AdMob = P.AdMob;
    if (!nativo || !AdMob || !CFG.bannerId) return;
    alturaAnuncio(ss && +ss.getItem('gg_ad_h'));
    AdMob.addListener('bannerAdSizeChanged', function (i) {
      var h = Math.round((i && i.height) || 0);
      try { ss && ss.setItem('gg_ad_h', h); } catch (e) {}
      alturaAnuncio(h);
    });
    /* O banner é nativo e continua na tela entre as páginas: só é criado uma vez por sessão */
    if (ss && ss.getItem('gg_ads') === '1') return;
    try { ss && ss.setItem('gg_ads', '1'); } catch (e) {}
    AdMob.initialize({ initializeForTesting: !!CFG.testing })
      .then(function () { return AdMob.requestConsentInfo().catch(function () { return null; }); })
      .then(function (info) {
        if (info && info.isConsentFormAvailable && info.status === 'REQUIRED') return AdMob.showConsentForm().catch(function () {});
      })
      .then(function () { return AdMob.trackingAuthorizationStatus(); })
      .then(function (st) { if (st && st.status === 'notDetermined') return AdMob.requestTrackingAuthorization(); })
      .catch(function () {})
      .then(function () {
        return AdMob.showBanner({
          adId: CFG.bannerId, adSize: 'ADAPTIVE_BANNER', position: 'BOTTOM_CENTER',
          margin: 56, /* = altura da barra de abas (--tabs-h) */
          isTesting: !!CFG.testing
        });
      })
      .catch(function (e) { try { ss && ss.removeItem('gg_ads'); } catch (x) {} console.warn('AdMob', e); });
  }

  function iniciar() {
    montarAbas();
    if (ehFicha()) montarAcoesFicha();
    montarSalvos();
    if (APP) avisoConexao();
    anuncios();
    if (P.SplashScreen) P.SplashScreen.hide().catch(function () {});
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar); else iniciar();
})();
