/* Menu fixo do Guia de Guarnições: abre/fecha o menu no celular, ajusta a altura do cabeçalho e mostra o botão de voltar ao topo. */
(function(){
  var top=document.querySelector('.top'), btn=document.querySelector('.menu-btn'), menu=document.getElementById('menu');
  if(!top) return;
  var root=document.documentElement;
  function medir(){ root.style.setProperty('--hdr', top.offsetHeight+'px'); }
  medir(); addEventListener('resize', medir, {passive:true});

  function fechar(){ if(!menu) return; menu.classList.remove('open'); if(btn) btn.setAttribute('aria-expanded','false'); }
  if(btn && menu){
    btn.addEventListener('click', function(){
      var abrir=!menu.classList.contains('open');
      menu.classList.toggle('open', abrir); btn.setAttribute('aria-expanded', abrir?'true':'false');
    });
    menu.addEventListener('click', function(e){ if(e.target.closest('a')) { fechar(); var d=menu.querySelector('details'); if(d && innerWidth>=860) d.open=false; } });
  }
  var cmds=document.querySelector('.menu details');
  document.addEventListener('click', function(e){
    if(!top.contains(e.target)){ fechar(); if(cmds && innerWidth>=860) cmds.open=false; }
  });
  document.addEventListener('keydown', function(e){
    if(e.key==='Escape'){ fechar(); if(cmds) cmds.open=false; }
  });

  /* Na página inicial, os links dos Comandos abrem a lista do Comando escolhido
     (a lógica de filtro fica no script do index, que escuta o hashchange) */
  if(document.getElementById('comandos')){
    if(menu) menu.addEventListener('click', function(e){
      var a=e.target.closest('a[href^="/#cm"]'); if(!a) return;
      e.preventDefault();
      try{ history.pushState(null,'',a.getAttribute('href').slice(1)); }catch(x){}
      dispatchEvent(new HashChangeEvent('hashchange'));
    });
  }

  /* Botão fixo da Calculadora de Transferência (em todas as páginas, menos na própria calculadora) */
  var st=document.createElement('style');
  st.textContent=
    '.menu a.menu-calc{background:var(--accent);color:var(--accent-ink);border-radius:6px;font-weight:600}'+
    '.menu a.menu-calc:hover{filter:brightness(1.08);color:var(--accent-ink)}'+
    '.calc-fab{position:fixed;left:var(--gutter-l);bottom:calc(20px + env(safe-area-inset-bottom,0px));z-index:15;display:inline-flex;align-items:center;gap:8px;height:44px;padding:0 16px 0 12px;border-radius:999px;background:var(--mark);color:#1B1505;font-weight:600;font-size:.92rem;text-decoration:none;box-shadow:0 4px 14px rgba(0,0,0,.22);transition:transform .15s,filter .15s}'+
    '.atalhos a.atalho-calc{background:var(--accent);color:var(--accent-ink);border-color:var(--accent);font-weight:600}'+
    '.calc-fab:hover{transform:translateY(-2px);filter:brightness(1.05)}'+
    '.calc-fab svg{flex:none}'+
    '@media (max-width:640px){.calc-fab{font-size:.85rem;height:42px;max-width:calc(100% - 92px)}body{padding-bottom:64px}}'+
    '@media print{.calc-fab{display:none}}';
  document.head.appendChild(st);
  if(!/\/calculadora-de-transferencia(\.html)?$/.test(location.pathname)){
    var fab=document.createElement('a');
    fab.className='calc-fab'; fab.href='/calculadora-de-transferencia';
    fab.setAttribute('aria-label','Abrir a Calculadora de Transferência');
    fab.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01M8 19h8"/></svg><span>Calculadora de Transferência</span>';
    fab.addEventListener('click',function(){ if(window.gtag){ try{ gtag('event','calculadora_botao',{pagina:location.pathname}); }catch(e){} } });
    document.body.appendChild(fab);
  }

  /* Botão de voltar ao topo */
  var t=document.createElement('a');
  t.className='totop'; t.href='#topo'; t.setAttribute('aria-label','Voltar ao topo'); t.textContent='↑';
  t.addEventListener('click', function(e){ e.preventDefault(); scrollTo({top:0, behavior:'smooth'}); history.replaceState(null,'',location.pathname+location.search); });
  document.body.appendChild(t);
  var visivel=false;
  function checar(){ var v=scrollY>700; if(v!==visivel){ visivel=v; t.classList.toggle('show', v); } }
  addEventListener('scroll', checar, {passive:true}); checar();
})();
