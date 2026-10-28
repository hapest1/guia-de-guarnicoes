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

  /* Destaque da Calculadora de Transferência no menu e nos atalhos das fichas */
  var st=document.createElement('style');
  st.textContent=
    '.menu a.menu-calc{background:var(--accent);color:var(--accent-ink);border-radius:6px;font-weight:600}'+
    '.menu a.menu-calc:hover{filter:brightness(1.08);color:var(--accent-ink)}'+
    '.atalhos a.atalho-calc{background:var(--accent);color:var(--accent-ink);border-color:var(--accent);font-weight:600}'+
    '';
  document.head.appendChild(st);
  /* Botão de voltar ao topo */
  var t=document.createElement('a');
  t.className='totop'; t.href='#topo'; t.setAttribute('aria-label','Voltar ao topo'); t.textContent='↑';
  t.addEventListener('click', function(e){ e.preventDefault(); scrollTo({top:0, behavior:'smooth'}); history.replaceState(null,'',location.pathname+location.search); });
  document.body.appendChild(t);
  var visivel=false;
  function checar(){ var v=scrollY>700; if(v!==visivel){ visivel=v; t.classList.toggle('show', v); } }
  addEventListener('scroll', checar, {passive:true}); checar();
})();
