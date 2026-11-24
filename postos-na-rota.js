/* Postos na Rota: traça a viagem de carro, marca os postos do caminho, avisa dos trechos longos sem posto
   e sugere onde abastecer conforme o consumo e o tanque.
   Rota: OSRM sobre o OpenStreetMap (consulta na hora). Cidades fora da lista: Nominatim.
   Postos: window.GG_POSTOS (postos-dados.js, gerado por gerar_postos.py), carregado só ao planejar.
   A simulação fica guardada no link (?o=...&d=...&c=...&t=...). */
(function(){
  var $=function(id){ return document.getElementById(id); };
  var F={o:$('pr-o'),d:$('pr-d'),c:$('pr-c'),t:$('pr-t'),ini:$('pr-ini'),res:$('pr-res'),desv:$('pr-desv'),preco:$('pr-preco')};
  var form=$('prForm'), out=$('pr-out'), status=$('pr-status'), btn=$('pr-go');
  if(!form||!out) return;

  var ROTAS=['https://router.project-osrm.org/route/v1/driving/','https://routing.openstreetmap.de/routed-car/route/v1/driving/'];
  var GEO='https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&countrycodes=br&accept-language=pt-BR&q=';
  var DADOS='/postos-dados.js?v=1';
  var R=6371, RAD=Math.PI/180;

  function esc(s){ return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];}); }
  function n0(v){ return Math.round(v).toLocaleString('pt-BR'); }
  function n1(v){ return v.toLocaleString('pt-BR',{minimumFractionDigits:1,maximumFractionDigits:1}); }
  function brl(v){ return v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'}); }
  function num(el){ var v=parseFloat(String(el.value).replace(',','.')); return isFinite(v)&&v>0?v:0; }
  function norm(s){ return String(s).normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim(); }
  function hav(a1,o1,a2,o2){
    var dl=(a2-a1)*RAD, dg=(o2-o1)*RAD, h=Math.sin(dl/2)*Math.sin(dl/2)+Math.cos(a1*RAD)*Math.cos(a2*RAD)*Math.sin(dg/2)*Math.sin(dg/2);
    return 2*R*Math.asin(Math.sqrt(h));
  }
  function horas(seg){ var m=Math.round(seg/60), h=Math.floor(m/60); return h? h+' h '+(m%60<10?'0':'')+(m%60)+' min' : m+' min'; }

  /* ---------- guarnições como sugestão de origem e destino ---------- */
  var GU={}, lista=$('pr-lista');
  ((window.CALC&&window.CALC.guarnicoes)||[]).forEach(function(g){
    if(g[6]) return; /* sem acesso rodoviário */
    var nome=g[1]+'-'+g[2], p={nome:nome,lat:g[4],lng:g[5]};
    GU[norm(nome)]=p; if(!GU[norm(g[1])]) GU[norm(g[1])]=p;
    if(lista){ var o=document.createElement('option'); o.value=nome; lista.appendChild(o); }
  });

  var aqui=null; /* posição do aparelho, quando o usuário pede */
  var bAqui=$('pr-aqui');
  if(bAqui){
    if(!navigator.geolocation) bAqui.hidden=true;
    bAqui.addEventListener('click',function(){
      aviso('Buscando a sua localização…');
      navigator.geolocation.getCurrentPosition(function(p){
        aqui={nome:'Minha localização',lat:p.coords.latitude,lng:p.coords.longitude};
        F.o.value=aqui.nome; aviso('');
      },function(){ aviso('Não foi possível obter a localização. Digite a cidade de origem.','erro'); },{enableHighAccuracy:false,timeout:15000,maximumAge:300000});
    });
  }
  var troca=$('pr-troca');
  if(troca) troca.addEventListener('click',function(){ var a=F.o.value; F.o.value=F.d.value; F.d.value=a; });

  function aviso(txt,cls){ status.className='pr-status'+(cls?' '+cls:''); status.textContent=txt||''; }

  function getJSON(url){
    return fetch(url,{headers:{'Accept':'application/json'}}).then(function(r){ if(!r.ok) throw new Error('http '+r.status); return r.json(); });
  }
  /* o Nominatim aceita um pedido por segundo: espaça as buscas e repete quando recusa */
  var ultGeo=0;
  function buscaGeo(url,tent){
    var espera=Math.max(0,ultGeo+1200-Date.now());
    return new Promise(function(ok){ setTimeout(ok,espera); }).then(function(){
      ultGeo=Date.now();
      return getJSON(url);
    }).catch(function(e){
      if(tent>0) return buscaGeo(url,tent-1);
      throw e;
    });
  }
  function localizar(txt){
    var t=String(txt).trim();
    if(aqui && t===aqui.nome) return Promise.resolve(aqui);
    var m=/^(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)$/.exec(t);
    if(m) return Promise.resolve({nome:t,lat:+m[1],lng:+m[2]});
    var g=GU[norm(t)]; if(g) return Promise.resolve(g);
    /* "Cidade-UF" vira "Cidade, UF" para a busca */
    var q=t.replace(/\s*[-\/]\s*([A-Za-z]{2})$/,', $1');
    return buscaGeo(GEO+encodeURIComponent(q+', Brasil'),2).then(function(j){
      if(!j||!j.length) throw new Error('nao-achou:'+t);
      var nome=String(j[0].display_name||t).split(',').slice(0,2).join(',');
      return {nome:nome,lat:+j[0].lat,lng:+j[0].lon};
    });
  }

  /* ---------- rota ---------- */
  function decod(str){ /* polyline com 6 casas */
    var i=0, lat=0, lng=0, pts=[], n=str.length;
    while(i<n){
      var b, sh=0, r=0;
      do{ b=str.charCodeAt(i++)-63; r|=(b&31)<<sh; sh+=5; }while(b>=32);
      lat+=(r&1)?~(r>>1):(r>>1); sh=0; r=0;
      do{ b=str.charCodeAt(i++)-63; r|=(b&31)<<sh; sh+=5; }while(b>=32);
      lng+=(r&1)?~(r>>1):(r>>1);
      pts.push(lat/1e6, lng/1e6);
    }
    return pts;
  }
  function rota(A,B,k){
    k=k||0;
    var url=ROTAS[k]+A.lng.toFixed(5)+','+A.lat.toFixed(5)+';'+B.lng.toFixed(5)+','+B.lat.toFixed(5)+'?overview=full&geometries=polyline6&steps=true';
    return getJSON(url).then(function(j){
      if(!j||j.code!=='Ok'||!j.routes||!j.routes.length) throw new Error('sem-rota');
      return j.routes[0];
    }).catch(function(e){
      if(e.message==='sem-rota'||k+1>=ROTAS.length) throw e;
      return rota(A,B,k+1);
    });
  }
  /* pontos da rota com o km acumulado; trechos longos ganham pontos intermediários para a busca por proximidade */
  function preparar(r){
    var p=decod(r.geometry), lat=[], lng=[], km=[], acc=0;
    for(var i=0;i<p.length;i+=2){
      if(i){
        var d=hav(p[i-2],p[i-1],p[i],p[i+1]), n=Math.floor(d/0.4);
        for(var s=1;s<=n;s++){ var f=s/(n+1); lat.push(p[i-2]+(p[i]-p[i-2])*f); lng.push(p[i-1]+(p[i+1]-p[i-1])*f); km.push(acc+d*f); }
        acc+=d;
      }
      lat.push(p[i]); lng.push(p[i+1]); km.push(acc);
    }
    /* o km oficial é o da rota; ajusta o acumulado geométrico para fechar com ele */
    var total=r.distance/1000, fx=acc>0?total/acc:1;
    for(var j=0;j<km.length;j++) km[j]*=fx;
    /* rodovias por trecho, a partir das instruções */
    var vias=[], a=0;
    (r.legs||[]).forEach(function(leg){ (leg.steps||[]).forEach(function(st){
      var nome=(st.ref||st.name||'').split(';')[0].trim();
      if(nome && st.distance>300) vias.push([a/1000,nome]);
      a+=st.distance;
    }); });
    return {lat:lat,lng:lng,km:km,total:total,dur:r.duration,vias:vias};
  }
  function viaEm(T,k){
    var v='', L=T.vias;
    for(var i=0;i<L.length && L[i][0]<=k+0.3;i++) v=L[i][1];
    return v;
  }

  /* ---------- postos ---------- */
  var POSTOS=null;
  function carregarPostos(){
    if(POSTOS) return Promise.resolve(POSTOS);
    return new Promise(function(ok,erro){
      function pronto(){
        var D=window.GG_POSTOS; if(!D||!D.p) return erro(new Error('sem-dados'));
        var L=D.p.split('\n'), P=new Array(L.length);
        for(var i=0;i<L.length;i++){
          var c=L[i].split(';');
          P[i]={lat:parseInt(c[0],36)/1e4-40, lng:parseInt(c[1],36)/1e4-80, f:parseInt(c[2]||'0',36), cid:c[3]?D.cid[parseInt(c[3],36)]:'', b:c[4]?(D.band[parseInt(c[4],36)]||''):'', nome:c.slice(5).join(';')};
        }
        POSTOS={lista:P,gerado:D.gerado,notas:D.notas||{}};
        ok(POSTOS);
      }
      if(window.GG_POSTOS) return pronto();
      var s=document.createElement('script'); s.src=DADOS; s.onload=pronto; s.onerror=function(){ erro(new Error('sem-dados')); };
      document.head.appendChild(s);
    });
  }
  /* postos a até "lim" km da rota, com o km da viagem em que ficam */
  function naRota(T,P,lim){
    var C=0.02, grade={}, n=T.lat.length, i, k;
    var mnA=90,mxA=-90,mnO=180,mxO=-180;
    for(i=0;i<n;i++){
      var a=T.lat[i], o=T.lng[i];
      if(a<mnA)mnA=a; if(a>mxA)mxA=a; if(o<mnO)mnO=o; if(o>mxO)mxO=o;
      k=Math.floor(a/C)+':'+Math.floor(o/C);
      (grade[k]=grade[k]||[]).push(i);
    }
    var folga=lim/100, alc=Math.max(1,Math.ceil(lim/(C*111*0.85))), achados=[];
    for(var j=0;j<P.length;j++){
      var p=P[j];
      if(p.lat<mnA-folga||p.lat>mxA+folga||p.lng<mnO-folga||p.lng>mxO+folga) continue;
      var ca=Math.floor(p.lat/C), co=Math.floor(p.lng/C), melhor=1e9, onde=-1;
      for(var da=-alc;da<=alc;da++) for(var dc=-alc;dc<=alc;dc++){
        var cel=grade[(ca+da)+':'+(co+dc)]; if(!cel) continue;
        for(var x=0;x<cel.length;x++){ var d=hav(p.lat,p.lng,T.lat[cel[x]],T.lng[cel[x]]); if(d<melhor){ melhor=d; onde=cel[x]; } }
      }
      if(onde>=0 && melhor<=lim) achados.push({p:p,km:T.km[onde],fora:melhor});
    }
    achados.sort(function(a,b){ return a.km-b.km; });
    return achados;
  }

  /* ---------- plano de paradas ---------- */
  function nota(s){ /* preferência entre postos próximos: 24 h, depois com nome */
    return (s.p.f&1?2:0)+(s.p.nome?1:0)-(s.fora>0.6?1:0);
  }
  function planejar(S,total,aut,ini,reserva,band){
    var paradas=[], pos=0, comb=aut*ini, res=aut*reserva, i=0, guard=0, critico=[];
    while(guard++<200){
      var limite=pos+comb-res;
      if(total<=limite+0.5) break;
      while(i<S.length && S[i].km<=pos+0.5) i++;
      var j=i, ultimo=-1;
      while(j<S.length && S[j].km<=limite){ ultimo=j; j++; }
      var esc_=null, tipo='ok', fora=false;
      if(ultimo>=i){
        /* com bandeira escolhida: o mais distante dessa bandeira ao alcance; sem nenhum ao alcance, qualquer posto */
        var topo=ultimo;
        if(band){
          topo=-1;
          for(var w=ultimo;w>=i;w--) if(band[S[w].p.b]){ topo=w; break; }
          if(topo<0){ topo=ultimo; fora=true; }
        }
        /* entre os últimos 25 km, o mais bem cotado */
        esc_=S[topo];
        for(var q=topo;q>=i && S[q].km>=S[topo].km-25;q--) if((!band||fora||band[S[q].p.b]) && nota(S[q])>nota(esc_)) esc_=S[q];
      }else if(i<S.length && S[i].km<=pos+comb){
        esc_=S[i]; tipo='reserva';
      }else if(i<S.length){
        esc_=S[i]; tipo='critico'; critico.push({de:pos,ate:S[i].km});
      }else{
        critico.push({de:pos,ate:total,fim:true}); break;
      }
      var rodou=esc_.km-pos, sobra=comb-rodou;
      paradas.push({s:esc_,tipo:tipo,fora:fora||(!!band&&!band[esc_.p.b]),rodou:rodou,sobra:sobra,chegaPct:sobra/aut,abastece:aut-Math.max(sobra,0)});
      pos=esc_.km; comb=aut;
    }
    var fim=comb-(total-pos);
    return {paradas:paradas,critico:critico,chegaPct:fim/aut,sobraFim:fim};
  }
  function trechos(S,total){
    var T=[], ant=0, antS=null;
    for(var i=0;i<=S.length;i++){
      var k=i<S.length?S[i].km:total;
      T.push({de:ant,ate:k,km:k-ant,antes:antS,depois:i<S.length?S[i]:null});
      ant=k; antS=i<S.length?S[i]:antS;
    }
    return T;
  }

  /* ---------- saída ---------- */
  var ULT=null;
  function nomePosto(p){ return p.nome||'Posto sem nome no mapa'; }
  function etiquetas(p){
    var t=[]; if(p.b) t.push(p.b); if(p.f&1) t.push('24 h'); if(p.f&2) t.push('diesel'); if(p.f&4) t.push('etanol'); if(p.f&8) t.push('GNV'); if(p.f&16) t.push('conveniência'); if(p.f&32) t.push('banheiro');
    return t.map(function(x){ return '<span class="tag">'+x+'</span>'; }).join('');
  }
  function mapa(p){ return 'https://www.google.com/maps/search/?api=1&query='+p.lat.toFixed(5)+'%2C'+p.lng.toFixed(5); }
  function chave(p){ return p.lat.toFixed(4)+','+p.lng.toFixed(4); }
  function ondeFica(T,s){
    var v=viaEm(T,s.km), partes=['km '+n0(s.km)+' da viagem']; if(v) partes.push(v); if(s.p.cid) partes.push(s.p.cid);
    return partes.join(' · ');
  }
  function linhaPosto(T,s,extra){
    var nt=ULT.notas[chave(s.p)];
    return '<li class="pr-posto"><div class="pr-posto-t"><b>'+esc(nomePosto(s.p))+'</b><span class="pr-onde">'+esc(ondeFica(T,s))+'</span></div>'+
      (extra||'')+
      (etiquetas(s.p)?'<div class="tags">'+etiquetas(s.p)+'</div>':'')+
      (nt?'<p class="pr-nota"><b>Aviso de quem passou:</b> '+esc(nt)+'</p>':'')+
      '<div class="pr-acoes"><a href="'+mapa(s.p)+'" target="_blank" rel="noopener">Ver no mapa</a><button type="button" class="calc-link" data-avisar="'+esc(nomePosto(s.p)+' — '+ondeFica(T,s)+' ('+chave(s.p)+')')+'">Avisar sobre este posto</button></div></li>';
  }
  function regua(T,S,plano,gaps){
    var W=1000, x=function(k){ return (k/T.total*W).toFixed(1); }, h='';
    gaps.forEach(function(g){ h+='<rect class="pr-r-gap'+(g.crit?' crit':'')+'" x="'+x(g.de)+'" y="18" width="'+Math.max(2,(g.km/T.total*W)).toFixed(1)+'" height="24"/>'; });
    h+='<rect class="pr-r-via" x="0" y="28" width="'+W+'" height="4" rx="2"/>';
    S.forEach(function(s){ h+='<rect class="pr-r-p" x="'+x(s.km)+'" y="22" width="1.2" height="16"/>'; });
    plano.paradas.forEach(function(p,i){ h+='<g><circle class="pr-r-stop" cx="'+x(p.s.km)+'" cy="30" r="9"/><text class="pr-r-n" x="'+x(p.s.km)+'" y="34" text-anchor="middle">'+(i+1)+'</text></g>'; });
    var passo=T.total>1200?400:T.total>500?200:T.total>200?100:50;
    for(var k=0;k<=T.total;k+=passo) h+='<text class="pr-r-km" x="'+x(k)+'" y="62" text-anchor="'+(k===0?'start':'middle')+'">'+n0(k)+'</text>';
    return '<div class="pr-regua-wrap"><svg class="pr-regua" viewBox="-12 0 1024 70" role="img" aria-label="Régua da viagem com os postos, os trechos sem posto e as paradas sugeridas">'+h+'</svg>'+
      '<p class="pr-legenda"><span><i class="lg-p"></i>posto</span><span><i class="lg-g"></i>trecho longo sem posto</span><span><i class="lg-s"></i>parada sugerida</span><span>km da viagem</span></p></div>';
  }

  function mostrar(A,B,T,S,cfg){
    var aut=cfg.c*cfg.t, util=aut*(1-cfg.res), plano=planejar(S,T.total,aut,cfg.ini,cfg.res,cfg.band);
    var nBand=cfg.band?S.filter(function(s){ return cfg.band[s.p.b]; }).length:0, txtBand=cfg.band?Object.keys(cfg.band).join(' ou '):'';
    var tr=trechos(S,T.total), limAlerta=Math.min(60,Math.max(30,util*0.5));
    var gaps=tr.filter(function(g){ return g.km>=limAlerta; }).map(function(g){ g.crit=g.km>util; return g; });
    var maior=tr.reduce(function(m,g){ return g.km>m.km?g:m; },{km:0});
    var litros=T.total/cfg.c, h='';

    h+='<div class="calc-total"><span class="eyebrow">'+esc(A.nome)+' → '+esc(B.nome)+'</span><b class="num">'+n0(T.total)+' km</b>'+
       '<span class="calc-sub">'+horas(T.dur)+' ao volante, sem contar as paradas · '+n0(S.length)+' postos no caminho · '+
       (plano.paradas.length? plano.paradas.length+(plano.paradas.length>1?' paradas sugeridas':' parada sugerida') : 'dá para chegar sem abastecer')+'</span></div>';

    h+='<div class="pr-nums"><div><span class="eyebrow">Autonomia com tanque cheio</span><b class="num">'+n0(aut)+' km</b><span class="calc-sub">'+n0(util)+' km sem entrar na reserva</span></div>'+
       '<div><span class="eyebrow">Maior trecho sem posto</span><b class="num'+(maior.km>util?' pr-crit':'')+'">'+n0(maior.km)+' km</b><span class="calc-sub">entre o km '+n0(maior.de)+' e o km '+n0(maior.ate)+'</span></div>'+
       '<div><span class="eyebrow">Combustível na viagem</span><b class="num">'+n0(litros)+' L</b><span class="calc-sub">'+(cfg.preco? brl(litros*cfg.preco)+' a '+brl(cfg.preco)+' o litro' : 'informe o preço do litro para ver o custo')+'</span></div></div>';

    h+=regua(T,S,plano,gaps);

    /* alertas */
    if(plano.critico.length){
      h+='<div class="note pr-alerta crit"><b>Atenção: a autonomia informada não cobre um trecho desta rota.</b> '+plano.critico.map(function(c){
        return 'Do km '+n0(c.de)+' ao km '+n0(c.ate)+' são '+n0(c.ate-c.de)+' km sem posto no mapa'+(c.fim?' até o destino':'')+'.';
      }).join(' ')+' Saia com o tanque mais cheio, confirme se há posto no trecho antes de sair ou leve combustível extra em recipiente apropriado.</div>';
    }
    if(gaps.length){
      h+='<section class="pr-sec"><h2>Trechos longos sem posto</h2><ul class="pr-gaps">'+gaps.sort(function(a,b){ return a.de-b.de; }).map(function(g){
        var v=viaEm(T,g.de+g.km/2);
        return '<li class="'+(g.crit?'crit':'')+'"><b class="num">'+n0(g.km)+' km</b><span>do km '+n0(g.de)+' ao km '+n0(g.ate)+(v?' · '+esc(v):'')+
          (g.antes?'<br>Último posto antes: <a href="'+mapa(g.antes.p)+'" target="_blank" rel="noopener">'+esc(nomePosto(g.antes.p))+'</a>'+(g.antes.p.cid?' ('+esc(g.antes.p.cid)+')':''):'<br>Abasteça antes de sair.')+
          (g.depois?'<br>Próximo posto: '+esc(nomePosto(g.depois.p))+(g.depois.p.cid?' ('+esc(g.depois.p.cid)+')':''):'')+'</span></li>';
      }).join('')+'</ul></section>';
    }else if(S.length){
      h+='<p class="pr-ok">Nenhum trecho com mais de '+n0(limAlerta)+' km sem posto nesta rota.</p>';
    }

    /* paradas */
    h+='<section class="pr-sec"><h2>Onde abastecer</h2>';
    if(!S.length){
      h+='<p>Não há postos mapeados perto desta rota. Aumente a distância aceita da rodovia ou confira o trajeto em outro mapa.</p>';
    }else if(!plano.paradas.length){
      h+='<p>Com '+n0(cfg.ini*100)+'% do tanque na saída, você chega ao destino com cerca de '+n0(Math.max(plano.chegaPct,0)*100)+'% ('+n0(Math.max(plano.sobraFim,0))+' km de autonomia). Não é preciso abastecer no caminho.</p>';
    }else{
      h+='<ol class="pr-paradas">'+plano.paradas.map(function(p,i){
        var prox=i+1<plano.paradas.length?plano.paradas[i+1].s.km:T.total;
        var extra='<p class="pr-det">Você chega com <b>'+n0(Math.max(p.chegaPct,0)*100)+'%</b> do tanque depois de '+n0(p.rodou)+' km. Para encher: cerca de <b>'+n0(p.abastece/cfg.c)+' L</b>'+(cfg.preco?' ('+brl(p.abastece/cfg.c*cfg.preco)+')':'')+'. '+
          (i+1<plano.paradas.length?'Próxima parada em '+n0(prox-p.s.km)+' km.':'Daqui ao destino: '+n0(prox-p.s.km)+' km.')+'</p>'+
          (p.fora?'<p class="pr-det calc-alerta">Não há posto '+esc(txtBand)+' ao alcance neste trecho. Esta parada é em outra bandeira.</p>':'')+
          (p.tipo==='reserva'?'<p class="pr-det calc-alerta">Você chega aqui já usando a reserva de segurança. Não havia posto antes dentro da margem.</p>':'')+
          (p.tipo==='critico'?'<p class="pr-det calc-alerta">Pela autonomia informada, o combustível acaba antes deste posto.</p>':'');
        return linhaPosto(T,p.s,extra);
      }).join('')+'</ol>';
      if(cfg.band) h+='<p class="calc-dica">Bandeira preferida: '+esc(txtBand)+' ('+n0(nBand)+' de '+n0(S.length)+' postos do caminho). Posto sem bandeira identificada no mapa não entra nessa conta.</p>';
      h+='<p class="calc-dica">Chegada ao destino com cerca de '+n0(Math.max(plano.chegaPct,0)*100)+'% do tanque. O plano enche o tanque em cada parada e escolhe o último posto ao alcance antes da reserva, dando preferência aos que funcionam 24 h.</p>';
    }
    h+='</section>';

    /* ações */
    var pts=plano.paradas.slice(0,9).map(function(p){ return p.s.p.lat.toFixed(5)+','+p.s.p.lng.toFixed(5); });
    var gm='https://www.google.com/maps/dir/?api=1&travelmode=driving&origin='+A.lat.toFixed(5)+','+A.lng.toFixed(5)+'&destination='+B.lat.toFixed(5)+','+B.lng.toFixed(5)+(pts.length?'&waypoints='+encodeURIComponent(pts.join('|')):'');
    h+='<div class="calc-acoes"><a class="btn" href="'+gm+'" target="_blank" rel="noopener">Abrir a rota no Google Maps'+(pts.length?' com as paradas':'')+'</a><button class="btn sec" type="button" id="pr-copiar">Copiar link deste plano</button></div>';

    /* todos os postos */
    if(S.length){
      h+='<details class="pr-todos"><summary>Ver os '+n0(S.length)+' postos do caminho</summary><ul class="pr-lista" id="pr-todos"></ul></details>';
    }
    h+='<p class="calc-sub pr-fonte">Postos e rota: © colaboradores do OpenStreetMap. Base de postos de '+esc(ULT.gerado.split('-').reverse().join('/'))+'.</p>';
    out.innerHTML=h;

    var det=out.querySelector('.pr-todos');
    if(det) det.addEventListener('toggle',function(){
      var ul=$('pr-todos'); if(!det.open||ul.childNodes.length) return;
      ul.innerHTML=S.map(function(s){ return linhaPosto(T,s,''); }).join('');
    });
    var cp=$('pr-copiar');
    if(cp) cp.addEventListener('click',function(){
      var fim=function(){ cp.textContent='Link copiado'; setTimeout(function(){ cp.textContent='Copiar link deste plano'; },2000); };
      if(navigator.clipboard) navigator.clipboard.writeText(location.href).then(fim,function(){ prompt('Copie o link:',location.href); });
      else prompt('Copie o link:',location.href);
    });
  }

  /* botão "Avisar sobre este posto": leva ao formulário já preenchido */
  out.addEventListener('click',function(e){
    var b=e.target.closest&&e.target.closest('[data-avisar]'); if(!b) return;
    var campo=$('av-posto'), box=$('pr-avisar');
    if(campo){ campo.value=b.getAttribute('data-avisar'); }
    if(box){ box.scrollIntoView({behavior:'smooth',block:'start'}); var t=$('av-tipo'); if(t) setTimeout(function(){ t.focus(); },400); }
  });

  /* ---------- fluxo ---------- */
  function ler(){
    var band=null;
    bandeiras().forEach(function(b){ (band=band||{})[b]=1; });
    return {band:band,c:num(F.c),t:num(F.t),ini:(parseFloat(F.ini.value)||100)/100,res:(parseFloat(F.res.value)||15)/100,desv:parseFloat(F.desv.value)||1,preco:num(F.preco)};
  }
  function bandeiras(){
    return [].slice.call(form.querySelectorAll('input[name="pr-band"]:checked')).map(function(i){ return i.value; });
  }
  function guardar(){
    var q=new URLSearchParams();
    q.set('o',F.o.value.trim()); q.set('d',F.d.value.trim()); q.set('c',F.c.value); q.set('t',F.t.value);
    if(F.ini.value!=='100') q.set('i',F.ini.value); if(F.res.value!=='15') q.set('r',F.res.value); if(F.desv.value!=='1') q.set('v',F.desv.value); if(F.preco.value) q.set('p',F.preco.value);
    if(bandeiras().length) q.set('b',bandeiras().join('|'));
    try{ history.replaceState(null,'','?'+q.toString()); }catch(e){}
    try{ localStorage.setItem('gg_carro',JSON.stringify({c:F.c.value,t:F.t.value})); }catch(e){}
  }
  var rodando=false;
  function executar(){
    if(rodando) return;
    var cfg=ler();
    if(!F.o.value.trim()||!F.d.value.trim()) return aviso('Informe a cidade de origem e a de destino.','erro');
    if(!cfg.c||!cfg.t) return aviso('Informe o consumo (km/l) e o tamanho do tanque (litros).','erro');
    if(cfg.c>60||cfg.t>1500) return aviso('Confira o consumo e o tanque: os valores parecem altos demais.','erro');
    rodando=true; btn.disabled=true; aviso('Localizando as cidades…');
    var A,B,T;
    localizar(F.o.value).then(function(a){ A=a; return localizar(F.d.value); })
    .then(function(b){
      B=b;
      if(hav(A.lat,A.lng,B.lat,B.lng)<1) throw new Error('mesmo');
      aviso('Traçando a rota…'); return rota(A,B);
    }).then(function(r){
      T=preparar(r); aviso('Procurando os postos do caminho…'); return carregarPostos();
    }).then(function(P){
      ULT=P;
      var S=naRota(T,P.lista,cfg.desv);
      if(!(aqui&&F.o.value===aqui.nome)) guardar();
      mostrar(A,B,T,S,cfg); aviso('');
      if(window.gtag) gtag('event','postos_na_rota',{km:Math.round(T.total)});
      out.scrollIntoView({behavior:'smooth',block:'start'});
    }).catch(function(e){
      var m=String(e&&e.message||'');
      if(m.indexOf('nao-achou:')===0) aviso('Não encontrei "'+m.slice(10)+'". Escreva a cidade com a UF, por exemplo: Passo Fundo-RS.','erro');
      else if(m==='mesmo') aviso('Origem e destino são o mesmo lugar.','erro');
      else if(m==='sem-rota') aviso('Não há rota de carro entre esses dois pontos.','erro');
      else if(m==='sem-dados') aviso('Não foi possível carregar a base de postos. Recarregue a página e tente de novo.','erro');
      else aviso('Não foi possível traçar a rota agora. Confira a internet e tente de novo em instantes.','erro');
    }).then(function(){ rodando=false; btn.disabled=false; });
  }
  form.addEventListener('submit',function(e){ e.preventDefault(); executar(); });

  /* estado inicial: link compartilhado ou último carro usado */
  (function(){
    var q=new URLSearchParams(location.search), set=function(el,v){ if(v!=null&&v!=='') el.value=v; };
    try{ var g=JSON.parse(localStorage.getItem('gg_carro')||'null'); if(g){ set(F.c,g.c); set(F.t,g.t); } }catch(e){}
    set(F.o,q.get('o')); set(F.d,q.get('d')); set(F.c,q.get('c')); set(F.t,q.get('t')); set(F.ini,q.get('i')); set(F.res,q.get('r')); set(F.desv,q.get('v')); set(F.preco,q.get('p'));
    var qb=(q.get('b')||'').split('|');
    [].forEach.call(form.querySelectorAll('input[name="pr-band"]'),function(i){ if(qb.indexOf(i.value)>=0) i.checked=true; });
    if(q.get('o')&&q.get('d')&&num(F.c)&&num(F.t)) executar();
  })();

  /* ---------- avisos da comunidade (vão por e-mail ao Guia, que confere e publica) ---------- */
  var av=$('avForm');
  if(av){
    var avS=$('av-status'), avB=av.querySelector('button[type=submit]');
    av.addEventListener('submit',function(e){
      e.preventDefault();
      if(av.querySelector('input[name="_honey"]').value) return;
      if(!av.reportValidity()) return;
      var data={}; new FormData(av).forEach(function(v,k){ if(String(v).trim()!=='') data[k]=v; });
      delete data._honey;
      data._subject='[Guia] Postos na Rota — '+(data['Tipo de aviso']||'aviso');
      data._template='table';
      data['Rota consultada']=(F.o.value||'?')+' → '+(F.d.value||'?');
      avB.disabled=true; avS.className='ctb-status'; avS.textContent='Enviando…';
      fetch('https://formsubmit.co/ajax/guiadeguarnicoes@gmail.com',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(data)})
        .then(function(r){ return r.json().then(function(j){ return {ok:r.ok,j:j}; }); })
        .then(function(res){
          if(!res.ok||String(res.j.success)==='false') throw new Error('falha');
          av.reset(); avB.disabled=false; avS.className='ctb-status ok'; avS.textContent='Aviso recebido. Obrigado por ajudar quem vem atrás.';
          if(window.gtag) gtag('event','aviso_posto');
        })
        .catch(function(){ avB.disabled=false; avS.className='ctb-status erro'; avS.textContent='Não foi possível enviar agora. Tente de novo em alguns minutos.'; });
    });
  }
})();
