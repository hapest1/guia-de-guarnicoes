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
    menu.addEventListener('click', function(e){ if(e.target.closest('a')) { fechar(); if(innerWidth>=860) menu.querySelectorAll('details').forEach(function(d){ d.open=false; }); } });
  }
  var cmds=document.querySelectorAll('.menu details');
  function fecharDet(){ cmds.forEach(function(d){ d.open=false; }); }
  /* Abrir um menu suspenso fecha o outro */
  cmds.forEach(function(d){ d.addEventListener('toggle',function(){ if(d.open) cmds.forEach(function(o){ if(o!==d) o.open=false; }); }); });
  document.addEventListener('click', function(e){
    if(!top.contains(e.target)){ fechar(); if(innerWidth>=860) fecharDet(); }
  });
  document.addEventListener('keydown', function(e){
    if(e.key==='Escape'){ fechar(); fecharDet(); }
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
    '.menu summary.menu-calc{background:var(--accent);color:var(--accent-ink);border-radius:6px;font-weight:600}'+
    '.menu summary.menu-calc:hover{filter:brightness(1.08);color:var(--accent-ink)}'+
    '.menu summary.menu-calc::after{color:inherit;opacity:.8}'+
    '.menu .menu-calcs .cmds-list{width:260px}'+
    '.menu a.menu-idi{border:1px solid var(--accent);color:var(--accent);border-radius:6px;font-weight:600}'+
    '.menu a.menu-idi:hover{background:var(--accent);color:var(--accent-ink)}'+
    '@media (min-width:1120px){.menu{flex-wrap:wrap;justify-content:flex-end;row-gap:0;min-width:0}}'+
    '.atalhos a.atalho-calc{background:var(--accent);color:var(--accent-ink);border-color:var(--accent);font-weight:600}'+
    '';
  document.head.appendChild(st);
  /* Fichas: destaque da seção atual no índice e, no computador, atalhos no painel lateral "Nesta ficha" */
  var sn=document.querySelector('main > .secnav');
  if(sn){
    var ac=document.createElement('div'); ac.className='sn-acoes';
    document.querySelectorAll('.fhead .atalhos a').forEach(function(a){ ac.appendChild(a.cloneNode(true)); });
    var h1=document.querySelector('.fhead h1'), nome=h1?h1.textContent.replace(/\s+/g,' ').trim():document.title;
    var z=document.createElement('a'); z.className='sn-zap'; z.target='_blank'; z.rel='noopener';
    z.href='https://wa.me/?text='+encodeURIComponent('Guia de Guarnições: '+nome+' — '+location.origin+location.pathname);
    z.textContent='Compartilhar no WhatsApp';
    ac.appendChild(z); sn.appendChild(ac);

    espiar([].slice.call(sn.querySelectorAll('a[href^="#"]')));
  }

  /* Guias: índice lateral "Neste guia" no computador, montado a partir dos títulos do artigo */
  var art=document.querySelector('main.art:not(.ht)');
  if(art){
    var hs=[].slice.call(art.children).filter(function(e){ return e.tagName==='H2'; });
    if(hs.length>=3){
      var toc=document.createElement('nav'); toc.className='art-toc'; toc.setAttribute('aria-label','Seções do guia');
      var tt=document.createElement('b'); tt.textContent='Neste guia'; toc.appendChild(tt);
      hs.forEach(function(h,i){
        if(!h.id) h.id='parte-'+(i+1);
        var l=document.createElement('a'); l.href='#'+h.id; l.textContent=h.textContent; toc.appendChild(l);
      });
      art.appendChild(toc);
      espiar([].slice.call(toc.querySelectorAll('a')));
    }
  }

  /* Marca no índice a seção que está na tela */
  function espiar(links){
    var secs=[], atual=null, marcando=false;
    links.forEach(function(a){ var s=document.getElementById(a.getAttribute('href').slice(1)); if(s) secs.push({a:a,s:s}); });
    function marcar(){
      marcando=false;
      var lim=top.offsetHeight+90, alvo=null;
      for(var i=0;i<secs.length;i++){ if(secs[i].s.getBoundingClientRect().top<=lim) alvo=secs[i].a; }
      if(alvo===atual) return;
      if(atual) atual.removeAttribute('aria-current');
      if(alvo) alvo.setAttribute('aria-current','true');
      atual=alvo;
    }
    addEventListener('scroll', function(){ if(!marcando){ marcando=true; requestAnimationFrame(marcar); } }, {passive:true});
    marcar();
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
