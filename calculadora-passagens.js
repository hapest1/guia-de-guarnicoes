/* Calculadora de Passagens: estimativa por distância, igual para qualquer meio de transporte.
   Valor unitário sugerido = distância rodoviária (km) × TARIFA_PASSAGEM_KM, com 2 casas.
   Total = unitário do adulto × adultos + unitário da criança × crianças.
   Cidades: municípios do IBGE (municipios-dados.js). Rota: OSRM, com dados do OpenStreetMap, direto do navegador. */
(function(){
  'use strict';

  /* Tarifa por quilômetro. Para atualizar a estimativa, mude só este número. */
  var TARIFA_PASSAGEM_KM = 0.49;

  var ROTAS=['https://router.project-osrm.org/route/v1/driving/','https://routing.openstreetmap.de/routed-car/route/v1/driving/'];
  var GEO='https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&countrycodes=br&accept-language=pt-BR&q=';
  var UFS=[['AC','Acre'],['AL','Alagoas'],['AP','Amapá'],['AM','Amazonas'],['BA','Bahia'],['CE','Ceará'],['DF','Distrito Federal'],['ES','Espírito Santo'],['GO','Goiás'],['MA','Maranhão'],['MT','Mato Grosso'],['MS','Mato Grosso do Sul'],['MG','Minas Gerais'],['PA','Pará'],['PB','Paraíba'],['PR','Paraná'],['PE','Pernambuco'],['PI','Piauí'],['RJ','Rio de Janeiro'],['RN','Rio Grande do Norte'],['RS','Rio Grande do Sul'],['RO','Rondônia'],['RR','Roraima'],['SC','Santa Catarina'],['SP','São Paulo'],['SE','Sergipe'],['TO','Tocantins']];

  /* ---------- contas (sem tela), também usadas nos testes ---------- */
  function unitario(km){
    km=+km; if(!(km>0)) return 0;
    return Math.round(km*TARIFA_PASSAGEM_KM*100+1e-7)/100;
  }
  function total(unitAdulto,qtdAdultos,unitCrianca,qtdCriancas){
    return Math.round(((+unitAdulto||0)*(+qtdAdultos||0)+(+unitCrianca||0)*(+qtdCriancas||0))*100+1e-7)/100;
  }
  var fmtBRL=new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'});
  var fmtInt=new Intl.NumberFormat('pt-BR',{maximumFractionDigits:0});
  function brl(v){ return fmtBRL.format(v); }
  window.GG_PASSAGENS={TARIFA_PASSAGEM_KM:TARIFA_PASSAGEM_KM, unitario:unitario, total:total, brl:brl};

  function $(id){ return document.getElementById(id); }
  var F={ufO:$('ufO'),cidO:$('cidO'),ufD:$('ufD'),cidD:$('cidD'),km:$('km'),ua:$('ua'),uc:$('uc'),qa:$('qa'),qc:$('qc')};
  if(!F.km) return;
  var rotaInfo=$('rotaInfo'), out=$('res'), bRecalc=$('recalc'), bTroca=$('troca');

  /* ---------- municípios por estado ---------- */
  var MUN={}; /* UF -> [{n,lat,lng,grande}] */
  (window.GG_MUNICIPIOS||'').split('\n').forEach(function(l){
    var p=l.split(';'); if(p.length<4) return;
    (MUN[p[1]]=MUN[p[1]]||[]).push({n:p[0],uf:p[1],lat:+p[2],lng:+p[3],grande:p[4]==='1'});
  });
  function slug(s){ return s.normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''); }
  function opcoes(sel,lista,vazio){
    sel.innerHTML='';
    var o=document.createElement('option'); o.value=''; o.textContent=vazio; sel.appendChild(o);
    lista.forEach(function(x){ var e=document.createElement('option'); e.value=x[0]; e.textContent=x[1]; sel.appendChild(e); });
  }
  function encheCidades(selUF,selCid){
    var L=(MUN[selUF.value]||[]).slice().sort(function(a,b){ return a.n.localeCompare(b.n,'pt-BR'); });
    opcoes(selCid, L.map(function(m){ return [m.n,m.n]; }), selUF.value?'Escolha a cidade':'Escolha o estado primeiro');
    selCid.disabled=!selUF.value;
  }
  function cidade(selUF,selCid){
    var L=MUN[selUF.value]||[];
    for(var i=0;i<L.length;i++) if(L[i].n===selCid.value) return L[i];
    return null;
  }
  [F.ufO,F.ufD].forEach(function(s){ opcoes(s, UFS.map(function(u){ return [u[0],u[1]+' ('+u[0]+')']; }), 'Escolha o estado'); });
  encheCidades(F.ufO,F.cidO); encheCidades(F.ufD,F.cidD);

  /* ---------- rota ---------- */
  function getJSON(url){
    /* conexão lenta: desiste depois de 25 s, para a tela não ficar esperando sem fim */
    var ctl=window.AbortController?new AbortController():null, t=ctl&&setTimeout(function(){ ctl.abort(); },25000);
    return fetch(url,{headers:{'Accept':'application/json'},signal:ctl?ctl.signal:undefined})
      .then(function(r){ if(!r.ok) throw new Error('http '+r.status); return r.json(); })
      .then(function(j){ clearTimeout(t); return j; },function(e){ clearTimeout(t); throw e; });
  }
  /* Município de território muito grande: o centro do território pode ficar longe da cidade.
     Nesses casos a sede é procurada no mapa antes de traçar a rota. */
  var sedes={};
  function ponto(m){
    if(!m.grande) return Promise.resolve(m);
    var k=m.n+'|'+m.uf;
    if(sedes[k]) return Promise.resolve(sedes[k]);
    return getJSON(GEO+encodeURIComponent(m.n+', '+m.uf+', Brasil')).then(function(j){
      var p=(j&&j[0]&&isFinite(+j[0].lat))?{lat:+j[0].lat,lng:+j[0].lon}:m;
      sedes[k]=p; return p;
    }).catch(function(){ return m; });
  }
  function rota(A,B,k){
    k=k||0;
    var url=ROTAS[k]+A.lng.toFixed(5)+','+A.lat.toFixed(5)+';'+B.lng.toFixed(5)+','+B.lat.toFixed(5)+'?overview=false';
    return getJSON(url).then(function(j){
      if(!j||j.code!=='Ok'||!j.routes||!j.routes.length) throw new Error('sem-rota');
      return j.routes[0];
    }).catch(function(e){
      if(e.message==='sem-rota'||k+1>=ROTAS.length) throw e;
      return rota(A,B,k+1);
    });
  }
  function tempo(seg){
    var min=Math.round(seg/60), h=Math.floor(min/60), m=min%60;
    return h?(h+' h'+(m?' '+m+' min':'')):(m+' min');
  }
  function info(html){ rotaInfo.innerHTML=html; }

  var pedido=0, kmRota=null;
  function calcularRota(){
    var A=cidade(F.ufO,F.cidO), B=cidade(F.ufD,F.cidD), meu=++pedido;
    bRecalc.hidden=!(A&&B);
    if(!A||!B){ info('<span class="calc-sub">Escolha a cidade de origem e a de destino para calcular a distância.</span>'); return; }
    if(A===B){ kmRota=null; info('<span class="calc-sub calc-alerta">Origem e destino são a mesma cidade. Escolha cidades diferentes ou digite a distância.</span>'); return; }
    info('<span class="calc-sub">Calculando a rota de '+esc(A.n)+'-'+A.uf+' a '+esc(B.n)+'-'+B.uf+'…</span>');
    bRecalc.disabled=true;
    Promise.all([ponto(A),ponto(B)]).then(function(P){ return rota(P[0],P[1]); }).then(function(r){
      if(meu!==pedido) return;
      bRecalc.disabled=false;
      kmRota=Math.round(r.distance/1000);
      F.km.value=kmRota;
      info('<span><b>'+fmtInt.format(kmRota)+' km</b> por estrada · tempo estimado de viagem: <b>'+tempo(r.duration)+'</b></span><span class="calc-sub">'+esc(A.n)+'-'+A.uf+' → '+esc(B.n)+'-'+B.uf+'. Rota calculada no OpenStreetMap; a distância pode ser ajustada no campo abaixo.</span>');
      distanciaMudou();
    }).catch(function(e){
      if(meu!==pedido) return;
      bRecalc.disabled=false; kmRota=null;
      info('<span class="calc-sub calc-alerta">'+(e&&e.message==='sem-rota'
        ?'Não há rota por estrada entre '+esc(A.n)+'-'+A.uf+' e '+esc(B.n)+'-'+B.uf+'. Digite a distância no campo abaixo.'
        :'Não foi possível calcular a rota agora. Confira a internet e toque em "Recalcular rota manualmente", ou digite a distância no campo abaixo.')+'</span>');
    });
  }

  /* ---------- valores ---------- */
  function num(el){ var v=parseFloat(String(el.value).replace(',','.')); return isFinite(v)&&v>0?v:0; }
  function inteiro(el){ var v=Math.floor(num(el)); return v>0?v:0; }
  function esc(s){ return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];}); }

  /* Mudou a distância: os dois valores unitários voltam para a sugestão */
  function distanciaMudou(){
    var km=num(F.km), u=unitario(km);
    F.ua.value=km?u.toFixed(2):''; F.uc.value=km?u.toFixed(2):'';
    mostrar();
  }
  function mostrar(){
    var km=num(F.km);
    if(!km){ out.innerHTML='<p class="cmp-vazio">Escolha a origem e o destino, ou digite a distância, para ver a estimativa.</p>'; return; }
    var ua=num(F.ua), uc=num(F.uc), qa=inteiro(F.qa), qc=inteiro(F.qc), t=total(ua,qa,uc,qc), sug=unitario(km);
    var h='<div class="calc-total"><span class="eyebrow">Total de passagens</span><b>'+brl(t)+'</b><span class="calc-sub">'
      +((qa+qc)?(qa+' adulto'+(qa===1?'':'s')+' e '+qc+' criança'+(qc===1?'':'s')):'Informe a quantidade de adultos e de crianças')+' · '+fmtInt.format(km)+' km</span></div>';
    h+='<div class="calc-blocos"><div class="calc-bloco"><h3>Passagens <span class="num">'+brl(t)+'</span></h3><table>';
    h+='<tr><td>Distância</td><td class="num">'+fmtInt.format(km)+' km</td></tr>';
    h+='<tr><td>Valor sugerido por passagem ('+fmtInt.format(km)+' km × '+brl(TARIFA_PASSAGEM_KM)+')</td><td class="num">'+brl(sug)+'</td></tr>';
    h+='<tr><td>Adultos: '+qa+' × '+brl(ua)+'</td><td class="num">'+brl(Math.round(ua*qa*100+1e-7)/100)+'</td></tr>';
    h+='<tr><td>Crianças: '+qc+' × '+brl(uc)+'</td><td class="num">'+brl(Math.round(uc*qc*100+1e-7)/100)+'</td></tr>';
    h+='<tr class="calc-sub-t"><td>Total</td><td class="num">'+brl(t)+'</td></tr>';
    h+='</table></div></div>';
    out.innerHTML=h;
  }

  /* ---------- eventos ---------- */
  F.ufO.addEventListener('change',function(){ encheCidades(F.ufO,F.cidO); calcularRota(); });
  F.ufD.addEventListener('change',function(){ encheCidades(F.ufD,F.cidD); calcularRota(); });
  F.cidO.addEventListener('change',calcularRota);
  F.cidD.addEventListener('change',calcularRota);
  bRecalc.addEventListener('click',calcularRota);
  if(bTroca) bTroca.addEventListener('click',function(){
    var u=F.ufO.value, c=F.cidO.value, u2=F.ufD.value, c2=F.cidD.value;
    F.ufO.value=u2; encheCidades(F.ufO,F.cidO); F.cidO.value=c2;
    F.ufD.value=u; encheCidades(F.ufD,F.cidD); F.cidD.value=c;
    calcularRota();
  });
  F.km.addEventListener('input',distanciaMudou);
  [F.ua,F.uc,F.qa,F.qc].forEach(function(el){ el.addEventListener('input',mostrar); });

  /* ---------- destino (ou origem) já preenchido: ?d=manaus-am, vindo da ficha da guarnição ---------- */
  function preencher(selUF,selCid,s){
    var m=/^(.+)-([a-z]{2})$/.exec(s||''); if(!m) return;
    var uf=m[2].toUpperCase(), L=MUN[uf]||[];
    for(var i=0;i<L.length;i++) if(slug(L[i].n)===m[1]){ selUF.value=uf; encheCidades(selUF,selCid); selCid.value=L[i].n; return; }
  }
  var q=new URLSearchParams(location.search);
  preencher(F.ufD,F.cidD,q.get('d'));
  preencher(F.ufO,F.cidO,q.get('o'));
  calcularRota();
  mostrar();
})();
