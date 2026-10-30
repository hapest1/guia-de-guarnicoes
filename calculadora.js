/* Calculadora de transferência: ajuda de custo, bagagem, veículos e passagens.
   Usa window.CALC (calculadora-dados.js) e window.GG_DIST (calculadora-distancias.js).
   A simulação fica guardada no link (?o=...&d=...&pg=...). */
(function(){
  var C=window.CALC; if(!C) return;
  var $=function(id){ return document.getElementById(id); };
  var F={o:$('go'),d:$('gd'),km:$('km'),dep:$('dep'),lea:$('lea'),pg:$('pg'),am:$('am'),hab:$('hab'),disp:$('disp'),gle:$('gle'),
         ats:$('ats'),perm:$('perm'),co:$('co'),copg:$('copg'),cub:$('cub'),carro:$('carro'),moto:$('moto'),pass:$('pass'),ndep:$('ndep')};
  var passInfo=$('passInfo'), ndepWrap=$('ndepWrap');
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

  /* Passagens: modal pela regra do Decreto nº 4.307/2002 (arts. 45 e 46).
     Avião: tarifa média do trecho entre os aeroportos de origem e destino (ANAC, calculadora-aereo.js).
     Ônibus: tarifa média interestadual da ANTT por faixa de distância. */
  var AEREO_MEDIA=746.62; // média doméstica geral da ANAC, set/2026 — só se faltar o trecho
  /* Ajuste das passagens aéreas: a média da ANAC não inclui taxa de embarque e reflete compras com antecedência.
     Calibrado com um caso real de out/2026 (Rio → Boa Vista, valor recebido x média ANAC do trecho = 1,382). */
  var AJ_AEREO=1.382;
  var AE=window.CALC_AEREO, AEv=AE&&AE.t?AE.t.split('.'):null;
  function tarifaAerea(a,b){
    if(!AE||!AE.g[a]||!AE.g[b]) return null;
    var A=AE.g[a], B=AE.g[b], i=A[0], j=B[0];
    var r={de:AE.cid[i], para:AE.cid[j], kmO:A[1], kmD:B[1]};
    if(i===j) return null;
    if(i>j){ var t=i; i=j; j=t; }
    var n=AE.ap.length, x=AEv[i*n - i*(i+1)/2 + (j-i-1)];
    if(!x) return null;
    r.est=x.charAt(0)==='~'; r.v=parseInt(x.replace('~',''),16);
    return r;
  }
  var ONIBUS=[[200,69.96],[400,106.60],[600,149.10],[800,205.45],[1000,244.54],[1500,299.06],[null,418.94]]; // ANTT, Anuário 2025
  var SUPERIOR={'gen-ex':1,'gen-div':1,'gen-bda':1,'cel':1,'tc':1,'maj':1};
  var passManual=false;
  function estimaPass(){
    var km=num(F.km), a=F.o.value, b=F.d.value;
    if(!a||!b||a===b) return null;
    var sem=GU[a]&&GU[b]&&(GU[a].sem||GU[b].sem);
    if(!km&&!sem) return null;
    var dep=F.dep.checked, nd=dep?Math.max(1,Math.round(num(F.ndep))||1):0, pax=1+nd;
    var aereo=SUPERIOR[F.pg.value]||(dep&&km>1000)||sem, unit, porque, fonte, trecho=null;
    if(aereo){
      porque=SUPERIOR[F.pg.value]?'oficial superior ou general viaja de avião':(sem?'sem ligação rodoviária':'trecho rodoviário acima de 1.000 km, com dependentes');
      trecho=tarifaAerea(a,b);
      var base=trecho?trecho.v:AEREO_MEDIA;
      unit=Math.round(base*AJ_AEREO*100)/100;
      fonte=(trecho?'tarifa média do trecho '+trecho.de+' → '+trecho.para+' (ANAC, jul–set/2026: '+brl(base)+(trecho.est?', estimada com conexão':'')+')':'tarifa média doméstica geral da ANAC, set/2026 ('+brl(base)+')')
        +' + 38% para taxa de embarque e compra perto da data da viagem, ajuste conferido com um caso real';
    } else {
      for(var i=0;i<ONIBUS.length;i++){ if(ONIBUS[i][0]===null||km<=ONIBUS[i][0]){ unit=ONIBUS[i][1]; break; } }
      porque=km>1000?'trecho acima de 1.000 km sem dependentes: ônibus leito':'trecho de até 1.000 km';
      fonte='tarifa média interestadual da ANTT para a faixa de distância, 2025';
    }
    var longe=[];
    if(trecho){ if(trecho.kmO>=40) longe.push(nomeG(a)+' fica a ~'+n0(trecho.kmO)+' km do aeroporto de '+trecho.de); if(trecho.kmD>=40) longe.push(nomeG(b)+' fica a ~'+n0(trecho.kmD)+' km do aeroporto de '+trecho.para); }
    return {pax:pax, unit:unit, total:Math.round(pax*unit*100)/100, modal:aereo?'aérea':'de ônibus', fonte:fonte, porque:porque, longe:longe};
  }
  function atualizaPass(){
    if(ndepWrap) ndepWrap.hidden=!F.dep.checked;
    var e=estimaPass();
    if(!e){ if(!passManual) F.pass.value=''; passInfo.innerHTML=passManual?'':'<span class="calc-sub">Escolha as guarnições para estimar as passagens.</span>'; return; }
    if(!passManual) F.pass.value=e.total.toFixed(2);
    var txt='<span><b>'+e.pax+' passage'+(e.pax>1?'ns':'m')+' '+(e.modal==='aérea'&&e.pax>1?'aéreas':e.modal)+' × '+brl(e.unit)+' = '+brl(e.total)+'</b> ('+esc(e.porque)+')</span><span class="calc-sub">Estimativa pela '+esc(e.fonte)+'.'+(e.longe.length?' '+esc(e.longe.join('; '))+'.':'')+'</span>';
    if(passManual&&Math.abs(num(F.pass)-e.total)>0.005) txt+='<span class="calc-sub">Você informou '+brl(num(F.pass))+'. <button type="button" class="calc-link" id="passReset">usar a estimativa</button></span>';
    passInfo.innerHTML=txt;
    var bt=$('passReset'); if(bt) bt.addEventListener('click',function(){ passManual=false; atualizaPass(); calc(); });
  }

  function calc(){
    atualizaPass();
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

  var CHAVES=['o','d','km','pg','am','hab','disp','gle','ats','perm','co','copg','cub','carro','moto','pass','ndep'];
  function salvaLink(){
    var q=[];
    var pp=POSTO[F.pg.value]||{};
    CHAVES.forEach(function(k){
      var el=F[k]; if(!el) return; var v=el.value;
      if(v===''||v==null||v==='0'||(k==='km'&&!kmManual)||(k==='pass'&&!passManual)||(k==='ndep'&&(v==='1'||!F.dep.checked))) return;
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
    if(p.get('pass')) passManual=true;
    if(p.get('sd')) F.dep.checked=false; if(p.get('lea')) F.lea.checked=true;
  }

  leLink();
  if(!F.pg.value){ F.pg.value='1ten'; }
  if(!F.disp.value||!F.cub.value){ var keep={d:F.disp.value,c:F.cub.value}; aplicaPosto(); if(keep.d) F.disp.value=keep.d; if(keep.c) F.cub.value=keep.c; }

  [F.o,F.d].forEach(function(s){ s.addEventListener('change',function(){ kmManual=false; atualizaDist(); calc(); if(window.gtag&&F.o.value&&F.d.value){ try{ gtag('event','calculadora',{rota:F.o.value+' > '+F.d.value}); }catch(e){} } }); });
  F.km.addEventListener('input',function(){ kmManual=true; atualizaDist(); calc(); });
  F.pass.addEventListener('input',function(){ passManual=true; calc(); });
  F.pg.addEventListener('change',function(){ aplicaPosto(); calc(); });
  ['am','hab','disp','gle','ats','perm','co','copg','cub','carro','moto','ndep','dep','lea'].forEach(function(k){ F[k].addEventListener(F[k].tagName==='SELECT'||F[k].type==='checkbox'?'change':'input',calc); });
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
