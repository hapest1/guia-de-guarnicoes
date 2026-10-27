/* Comparador de guarnições: duas fichas lado a lado, com a escolha guardada no link (?a=...&b=...). */
(function(){
  var D=window.CMP||[], por={}; D.forEach(function(g){ por[g.s]=g; });
  var A=document.getElementById('ga'), B=document.getElementById('gb'), out=document.getElementById('cmp');
  if(!A||!B||!out) return;
  function esc(s){ return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];}); }
  function val(o){ return o ? '<span class="v">'+esc(o.v)+'</span>'+(o.s?'<span class="s">'+esc(o.s)+'</span>':'') : '<span class="nd">ver na ficha</span>'; }
  function txt(t){ return t ? esc(t) : '<span class="nd">ver na ficha</span>'; }
  var LINHAS=[
    ['Comando', function(g){ return '<span class="v">'+esc(g.cmd)+'</span><span class="s">'+esc(g.cmdN)+'</span>'; }],
    ['Estado', function(g){ return esc(g.e)+' · Região '+esc(g.r); }],
    ['Perfil', function(g){ return txt(g.d); }],
    ['População', function(g){ return val(g.pop); }],
    ['Fuso', function(g){ return val(g.fuso); }],
    ['Aluguel', function(g){ return val(g.alu); }],
    ['Cesta básica', function(g){ return val(g.cesta); }],
    ['Distância', function(g){ return val(g.dist); }],
    ['Saúde militar', function(g){ return txt(g.saude); }],
    ['Colégio Militar', function(g){ return txt(g.cm); }],
    ['Clima', function(g){ return txt(g.clima); }],
    ['OM sediadas', function(g){ return g.om && g.om.length ? '<ul class="om">'+g.om.map(function(o){return '<li>'+esc(o)+'</li>';}).join('')+'</ul>' : '<span class="nd">ver na ficha</span>'; }]
  ];
  function cab(g){
    if(!g) return '<div class="cmp-h vazio">Escolha a guarnição</div>';
    return '<div class="cmp-h"><b>'+esc(g.c)+' <span>'+esc(g.uf)+'</span></b><p>'+esc(g.res)+'</p><a href="/'+esc(g.s)+'">Abrir ficha →</a></div>';
  }
  function render(){
    var a=por[A.value], b=por[B.value];
    var q=[]; if(A.value) q.push('a='+A.value); if(B.value) q.push('b='+B.value);
    try{ history.replaceState(null,'',location.pathname+(q.length?'?'+q.join('&'):'')); }catch(e){}
    if(!a && !b){ out.innerHTML='<p class="cmp-vazio">Escolha duas guarnições acima para começar.</p>'; return; }
    var h='<div class="cmp-row cmp-top"><div class="cmp-k"></div>'+cab(a)+cab(b)+'</div>';
    LINHAS.forEach(function(l){
      h+='<div class="cmp-row"><div class="cmp-k">'+l[0]+'</div><div class="cmp-c">'+(a?l[1](a):'')+'</div><div class="cmp-c">'+(b?l[1](b):'')+'</div></div>';
    });
    out.innerHTML=h;
    if(window.gtag && a && b){ try{ gtag('event','comparar',{guarnicoes:a.s+' x '+b.s}); }catch(e){} }
  }
  var p=new URLSearchParams(location.search);
  if(por[p.get('a')]) A.value=p.get('a');
  if(por[p.get('b')]) B.value=p.get('b');
  function sync(){ [A,B].forEach(function(s){ if(s._busca) s._busca.sync(); }); }
  A.addEventListener('change',render); B.addEventListener('change',render);
  document.getElementById('troca').addEventListener('click',function(){ var t=A.value; A.value=B.value; B.value=t; sync(); render(); });
  sync(); render();
})();
