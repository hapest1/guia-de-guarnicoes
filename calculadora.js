/* Calculadora de transferência: ajuda de custo, bagagem, veículos e passagens.
   Usa window.CALC (calculadora-dados.js) e window.GG_DIST (calculadora-distancias.js).
   A simulação fica guardada no link (?o=...&d=...&pg=...). */
(function(){
  var C=window.CALC; if(!C) return;
  var $=function(id){ return document.getElementById(id); };
  var F={o:$('go'),d:$('gd'),km:$('km'),dep:$('dep'),lea:$('lea'),pg:$('pg'),am:$('am'),hab:$('hab'),disp:$('disp'),gle:$('gle'),
         ats:$('ats'),perm:$('perm'),co:$('co'),copg:$('copg'),cub:$('cub'),carro:$('carro'),moto:$('moto'),pass:$('pass')};
  var out=$('res'), info=$('distInfo');
  if(!F.o||!F.d||!out) return;

  var POSTO={}; C.postos.forEach(function(p){ POSTO[p[0]]={id:p[0],nome:p[1],soldo:p[2],cub:p[3],disp:p[4]}; });
  var GU={}, IDX={}; C.guarnicoes.forEach(function(g,i){ GU[g[0]]={s:g[0],c:g[1],uf:g[2],lat:g[4],lng:g[5],sem:!!g[6]}; });

  /* Matriz de distâncias: triângulo superior, valores em km na base 36 separados por ponto */
  var DIST=null;
  (function(){
    var D=window.GG_DIST; if(!D||!D.ids||!D.d) return;
    D.ids.forEach(function(s,i){ IDX[s]=i; });
    var v=D.d.split('.'), n=D.ids.length;
    DIST={n:n,v:v};
  })();
  function kmRota(a,b){
    if(!DIST||IDX[a]==null||IDX[b]==null) return null;
    var i=IDX[a], j=IDX[b]; if(i===j) return 0;
    if(i>j){ var t=i; i=j; j=t; }
    var n=DIST.n, k=i*n - i*(i+1)/2 + (j-i-1), x=DIST.v[k];
    return x ? parseInt(x,36) : null;
  }
  function kmReta(a,b){
    var A=GU[a], B=GU[b], R=6371, r=Math.PI/180;
    var dl=(B.lat-A.lat)*r, dg=(B.lng-A.lng)*r;
    var h=Math.sin(dl/2)*Math.sin(dl/2)+Math.cos(A.lat*r)*Math.cos(B.lat*r)*Math.sin(dg/2)*Math.sin(dg/2);
    return Math.round(2*R*Math.asin(Math.sqrt(h)));
  }

  function num(el){ var v=parseFloat(String(el.value).replace(',','.')); return isFinite(v)&&v>0?v:0; }
  function brl(v){ return v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'}); }
  function n0(v){ return v.toLocaleString('pt-BR',{maximumFractionDigits:0}); }
  function esc(s){ return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];}); }
  function nomeG(s){ var g=GU[s]; return g? g.c+'-'+g.uf : ''; }

  function faixa(km){
    var k=Math.ceil(km);
    for(var i=0;i<C.faixas.length;i++){
      var f=C.faixas[i], ant=i?C.faixas[i-1][0]:0;
      if(f[0]===null || k<=f[0]) return {tarifa:f[1], txt: f[0]===null ? 'acima de '+n0(ant)+' km' : (i? 'de '+n0(ant+1)+' a '+n0(f[0])+' km' : 'até '+n0(f[0])+' km')};
    }
  }

  /* Distância automática ao escolher as guarnições (o usuário pode editar) */
  var kmManual=false;
  function atualizaDist(){
    var a=F.o.value, b=F.d.value;
    if(!a||!b){ info.innerHTML=''; if(!kmManual) F.km.value=''; return; }
    if(a===b){ info.innerHTML='<span class="calc-alerta">Origem e destino são a mesma guarnição.</span>'; if(!kmManual) F.km.value=''; return; }
    var r=kmRota(a,b), reta=kmReta(a,b), sem=GU[a].sem||GU[b].sem;
    if(sem||r==null){
      if(!kmManual) F.km.value='';
      info.innerHTML='<span class="calc-alerta"><b>Sem ligação rodoviária</b> entre '+esc(nomeG(a))+' e '+esc(nomeG(b))+'. Informe a distância usada pela sua OM.</span><span class="calc-sub">Em linha reta: ~'+n0(reta)+' km.</span>';
    } else {
      if(!kmManual) F.km.value=r;
      info.innerHTML='<span><b>'+n0(r)+' km</b> pela estrada (rota OpenStreetMap)'+(kmManual&&num(F.km)!==r?' · você alterou para '+n0(num(F.km))+' km <button type="button" class="calc-link" id="kmReset">usar '+n0(r)+' km</button>':'')+'</span><span class="calc-sub">Em linha reta: ~'+n0(reta)+' km.</span>';
      var bt=$('kmReset'); if(bt) bt.addEventListener('click',function(){ kmManual=false; F.km.value=r; calc(); });
    }
  }

  /* Ao trocar o posto, preenche disponibilidade e cubagem do posto */
  function aplicaPosto(){
    var p=POSTO[F.pg.value]; if(!p) return;
    F.disp.value=p.disp; F.cub.value=p.cub;
  }

  function calc(){
    salvaLink();
    var p=POSTO[F.pg.value];
    if(!p){ out.innerHTML='<p class="cmp-vazio">Escolha o posto ou graduação para ver o cálculo.</p>'; return; }
    var soldo=p.soldo;
    var pcts=[['Adicional militar',num(F.am)],['Adicional de habilitação',num(F.hab)],['Disponibilidade militar',num(F.disp)],['Localidade especial',num(F.gle)],['Tempo de serviço',num(F.ats)],['Permanência',num(F.perm)]];
    var linhasRem=[['Soldo ('+esc(p.nome)+', 2026)',soldo]], rem=soldo;
    pcts.forEach(function(x){ if(x[1]){ var v=soldo*x[1]/100; rem+=v; linhasRem.push([x[0]+' ('+n0(x[1])+'%)',v]); } });
    if(num(F.co)){ var pb=POSTO[F.copg.value]||p, v=pb.soldo*num(F.co)/100; rem+=v; linhasRem.push(['Compensação orgânica ('+n0(num(F.co))+'% do soldo de '+esc(pb.nome)+')',v]); }

    var mult=(F.lea.checked?4:2)*(F.dep.checked?1:0.5);
    var ajuda=rem*mult;

    var km=num(F.km), cub=num(F.cub), nc=+F.carro.value||0, nm=+F.moto.value||0;
    var m3Veic=nc*C.veiculo.carro+nm*C.veiculo.moto;
    var fx=km?faixa(km):null;
    var bag=fx?cub*fx.tarifa:0, veic=fx?m3Veic*fx.tarifa:0;
    var pass=num(F.pass);
    var total=ajuda+bag+veic+pass;

    var h='';
    h+='<div class="calc-total"><span class="eyebrow">Total estimado a receber</span><b class="num">'+brl(total)+'</b>';
    h+='<span class="calc-sub">'+(F.o.value&&F.d.value?esc(nomeG(F.o.value))+' → '+esc(nomeG(F.d.value))+' · ':'')+esc(p.nome)+(F.dep.checked?' · com dependentes':' · sem dependentes')+'</span></div>';
    h+='<div class="calc-blocos">';
    h+='<div class="calc-bloco"><h3>Ajuda de custo <span class="num">'+brl(ajuda)+'</span></h3><table><tbody>';
    linhasRem.forEach(function(l){ h+='<tr><td>'+l[0]+'</td><td class="num">'+brl(l[1])+'</td></tr>'; });
    h+='<tr class="calc-sub-t"><td>Remuneração de referência</td><td class="num">'+brl(rem)+'</td></tr>';
    h+='<tr><td>Multiplicador ('+(F.dep.checked?'com':'sem')+' dependente'+(F.lea.checked?', Loc. Esp. Cat. A':'')+')</td><td class="num">× '+String(mult).replace('.',',')+'</td></tr>';
    h+='</tbody></table></div>';

    h+='<div class="calc-bloco"><h3>Transporte <span class="num">'+brl(bag+veic+pass)+'</span></h3>';
    if(!fx){ h+='<p class="calc-sub">Informe a distância para calcular a bagagem e os veículos.</p>'; }
    h+='<table><tbody>';
    if(fx) h+='<tr><td>Faixa de distância ('+esc(fx.txt)+')</td><td class="num">'+brl(fx.tarifa)+'/m³</td></tr>';
    h+='<tr><td>Bagagem ('+n0(cub)+' m³)</td><td class="num">'+brl(bag)+'</td></tr>';
    if(m3Veic) h+='<tr><td>Veículos ('+[nc?nc+' carro'+(nc>1?'s':''):'',nm?nm+' moto'+(nm>1?'s':''):''].filter(Boolean).join(' e ')+' · '+n0(m3Veic)+' m³)</td><td class="num">'+brl(veic)+'</td></tr>';
    h+='<tr><td>Passagens</td><td class="num">'+brl(pass)+'</td></tr>';
    h+='</tbody></table></div></div>';
    h+='<div class="calc-acoes"><button type="button" class="btn" id="copiar">Copiar link da simulação</button><button type="button" class="btn sec" id="imprimir">Imprimir</button></div>';
    out.innerHTML=h;
    $('copiar').addEventListener('click',function(){ var b=this; try{ navigator.clipboard.writeText(location.href).then(function(){ b.textContent='Link copiado'; setTimeout(function(){ b.textContent='Copiar link da simulação'; },1800); }); }catch(e){} });
    $('imprimir').addEventListener('click',function(){ print(); });
  }

  var CHAVES=['o','d','km','pg','am','hab','disp','gle','ats','perm','co','copg','cub','carro','moto','pass'];
  function salvaLink(){
    var q=[];
    var pp=POSTO[F.pg.value]||{};
    CHAVES.forEach(function(k){
      var el=F[k]; if(!el) return; var v=el.value;
      if(v===''||v==null||v==='0'||(k==='km'&&!kmManual)) return;
      if((k==='disp'&&+v===pp.disp)||(k==='cub'&&+v===pp.cub)) return;
      q.push(k+'='+encodeURIComponent(v));
    });
    if(!F.dep.checked) q.push('sd=1'); if(F.lea.checked) q.push('lea=1');
    try{ history.replaceState(null,'',location.pathname+(q.length?'?'+q.join('&'):'')); }catch(e){}
  }
  function leLink(){
    var p=new URLSearchParams(location.search);
    if(p.get('pg')&&POSTO[p.get('pg')]){ F.pg.value=p.get('pg'); aplicaPosto(); }
    CHAVES.forEach(function(k){ var v=p.get(k); if(v!=null&&F[k]){ if(k==='o'||k==='d'){ if(GU[v]) F[k].value=v; } else F[k].value=v; } });
    if(p.get('km')) kmManual=true;
    if(p.get('sd')) F.dep.checked=false; if(p.get('lea')) F.lea.checked=true;
  }

  leLink();
  if(!F.pg.value){ F.pg.value='1ten'; }
  if(!F.disp.value||!F.cub.value){ var keep={d:F.disp.value,c:F.cub.value}; aplicaPosto(); if(keep.d) F.disp.value=keep.d; if(keep.c) F.cub.value=keep.c; }

  [F.o,F.d].forEach(function(s){ s.addEventListener('change',function(){ kmManual=false; atualizaDist(); calc(); if(window.gtag&&F.o.value&&F.d.value){ try{ gtag('event','calculadora',{rota:F.o.value+' > '+F.d.value}); }catch(e){} } }); });
  F.km.addEventListener('input',function(){ kmManual=true; atualizaDist(); calc(); });
  F.pg.addEventListener('change',function(){ aplicaPosto(); calc(); });
  ['am','hab','disp','gle','ats','perm','co','copg','cub','carro','moto','pass','dep','lea'].forEach(function(k){ F[k].addEventListener(F[k].tagName==='SELECT'||F[k].type==='checkbox'?'change':'input',calc); });
  $('troca').addEventListener('click',function(){
    var a=F.o.value; F.o.value=F.d.value; F.d.value=a;
    [F.o,F.d].forEach(function(s){ if(s._busca&&s._busca.sync) s._busca.sync(); });
    atualizaDist(); calc();
  });

  function iniciar(){
    [F.o,F.d].forEach(function(s){ if(s._busca&&s._busca.sync) s._busca.sync(); });
    atualizaDist(); calc();
  }
  if(document.readyState==='complete') iniciar(); else addEventListener('load',iniciar);
})();
