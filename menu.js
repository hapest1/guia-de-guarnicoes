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

  /* Na página inicial, os links dos Comandos limpam a busca e rolam até o grupo certo
     (os grupos usam content-visibility, então a posição só é exata depois de renderizados) */
  if(document.querySelector('.cmdgroup')){
    var irPara=function(id, suave){
      var g=document.getElementById(id); if(!g || !g.classList.contains('cmdgroup')) return false;
      var q=document.getElementById('q'), sel=document.getElementById('cmd');
      var uf=document.getElementById('uf');
      if(q && sel && (q.value || sel.value || (uf && uf.value))){ q.value=''; sel.value=''; if(uf) uf.value=''; q.dispatchEvent(new Event('input')); }
      [].forEach.call(document.querySelectorAll('.cmdgroup'), function(el){ el.style.contentVisibility='visible'; });
      requestAnimationFrame(function(){ g.scrollIntoView({behavior: suave?'smooth':'instant'}); });
      return true;
    };
    if(menu) menu.addEventListener('click', function(e){
      var a=e.target.closest('a[href^="/#cm"]'); if(!a) return;
      var id=a.getAttribute('href').slice(2);
      if(irPara(id, true)){ e.preventDefault(); history.replaceState(null,'','#'+id); }
    });
    if(/^#cm/.test(location.hash)) addEventListener('load', function(){ irPara(location.hash.slice(1), false); });
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
