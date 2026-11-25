/* Planejamento de Rota: monta o roteiro de carro com quantas cidades a pessoa quiser, traça a rota, marca os postos
   do caminho, avisa dos trechos longos sem posto, sugere onde abastecer e onde dormir, soma combustível,
   pedágios e hospedagem e lista os Hotéis de Trânsito do Exército na rota.
   Rota: OSRM sobre o OpenStreetMap (consulta na hora).
   Cidades: guarnições do Guia (calculadora-dados.js) e os municípios do IBGE (municipios-dados.js); a sede
   dos municípios muito grandes é procurada no Nominatim.
   Postos: postos-dados.js. Pedágios: pedagios-dados.js. Hotéis de Trânsito: ht-rota-dados.js.
   Todos carregados só quando precisa. A simulação fica guardada no link (?r=Cidade-UF|Cidade-UF&c=...&t=...). */
(function(){
  var $=function(id){ return document.getElementById(id); };
  var F={c:$('pr-c'),t:$('pr-t'),ini:$('pr-ini'),res:$('pr-res'),desv:$('pr-desv'),preco:$('pr-preco'),ped:$('pr-ped'),dia:$('pr-dia'),diaria:$('pr-diaria')};
  var form=$('prForm'), out=$('pr-out'), status=$('pr-status'), btn=$('pr-go'), lista=$('pr-pontos');
  if(!form||!out||!lista) return;

  var ROTAS=['https://router.project-osrm.org/route/v1/driving/','https://routing.openstreetmap.de/routed-car/route/v1/driving/'];
  var GEO='https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&countrycodes=br&accept-language=pt-BR&q=';
  var ARQ={postos:'/postos-dados.js?v=1',mun:'/municipios-dados.js?v=1',ped:'/pedagios-dados.js?v=1',ht:'/ht-rota-dados.js?v=1'};
  var MAX_PONTOS=10, HT_ROTA=25, HT_NOITE=60, PED_ROTA=0.25;
  var R=6371, RAD=Math.PI/180;

  function esc(s){ return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];}); }
  function n0(v){ return Math.round(v).toLocaleString('pt-BR'); }
  function brl(v){ return v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'}); }
  function num(el){ if(!el) return 0; var v=parseFloat(String(el.value).replace(/\s|R\$/g,'').replace(',','.')); return isFinite(v)&&v>0?v:0; }
  function norm(s){ return String(s).normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim(); }
  function hav(a1,o1,a2,o2){
    var dl=(a2-a1)*RAD, dg=(o2-o1)*RAD, h=Math.sin(dl/2)*Math.sin(dl/2)+Math.cos(a1*RAD)*Math.cos(a2*RAD)*Math.sin(dg/2)*Math.sin(dg/2);
    return 2*R*Math.asin(Math.sqrt(h));
  }
  function horas(seg){ var m=Math.round(seg/60), h=Math.floor(m/60); return h? h+' h '+(m%60<10?'0':'')+(m%60)+' min' : m+' min'; }
  function aviso(txt,cls){ status.className='pr-status'+(cls?' '+cls:''); status.textContent=txt||''; }

  /* carrega um arquivo de dados uma vez só */
  var carregados={};
  function carregar(src,teste){
    if(teste()) return Promise.resolve();
    if(carregados[src]) return carregados[src];
    return carregados[src]=new Promise(function(ok,erro){
      var s=document.createElement('script'); s.src=src; s.async=true;
      s.onload=function(){ teste()?ok():erro(new Error('sem-dados')); };
      s.onerror=function(){ delete carregados[src]; erro(new Error('sem-dados')); };
      document.head.appendChild(s);
    });
  }

  /* ---------- cidades: guarnições do Guia + municípios do IBGE ---------- */
  var IDX=null, GU=[];
  ((window.CALC&&window.CALC.guarnicoes)||[]).forEach(function(g){
    GU.push({n:g[1],uf:g[2],lat:g[4],lng:g[5],gu:1,k:norm(g[1]),sem:g[6]?1:0}); /* sem = sem ligação por estrada */
  });
  function indice(){
    if(IDX) return IDX;
    var vistos={}, L=[];
    GU.forEach(function(g){ vistos[g.k+'|'+g.uf]=1; L.push(g); });
    var M=(window.GG_MUNICIPIOS||'').split('\n');
    for(var i=0;i<M.length;i++){
      var c=M[i].split(';'); if(c.length<5) continue;
      var k=norm(c[0]); if(vistos[k+'|'+c[1]]) continue;
      L.push({n:c[0],uf:c[1],lat:+c[2],lng:+c[3],grande:c[4]==='1',k:k});
    }
    if(M.length>1) IDX=L;
    return L;
  }
  function carregarMun(){ return carregar(ARQ.mun,function(){ return !!window.GG_MUNICIPIOS; }).then(function(){ IDX=null; return indice(); }); }
  function rotulo(p){ return p.n+'-'+p.uf; }
  /* "passo fundo", "passo fundo rs", "Passo Fundo-RS", "passo fundo, rs" */
  function buscar(txt,max){
    var q=norm(txt); if(!q) return [];
    var uf=null, m=/^(.*\S)\s+([a-z]{2})$/.exec(q);
    var L=indice(), res=[];
    function testa(qq,uff){
      for(var i=0;i<L.length;i++){
        var p=L[i]; if(uff&&p.uf.toLowerCase()!==uff) continue;
        var pos=p.k.indexOf(qq); if(pos<0) continue;
        var nota=pos===0?0:(p.k.charAt(pos-1)===' '?1:2);
        res.push({p:p,s:nota*10-(p.gu?5:0)+p.k.length/100});
      }
    }
    if(m){ testa(m[1],m[2]); if(res.length) uf=m[2]; }
    if(!res.length) testa(q,null);
    res.sort(function(a,b){ return a.s-b.s; });
    return res.slice(0,max||8).map(function(r){ return r.p; });
  }
  function exato(txt){
    var q=norm(txt); if(!q) return null;
    var L=indice();
    for(var i=0;i<L.length;i++) if(norm(rotulo(L[i]))===q) return L[i];
    var so=L.filter(function(p){ return p.k===q; });
    return so.length===1?so[0]:null;
  }

  /* ---------- roteiro: linhas com busca de cidade ---------- */
  function marcas(){
    var li=lista.children, n=li.length;
    for(var i=0;i<n;i++){
      var m=li[i].querySelector('.pr-marca'), inp=li[i].querySelector('input'), rm=li[i].querySelector('.pr-rm');
      m.textContent=i===0?'A':(i===n-1?'B':String(i));
      inp.setAttribute('aria-label',i===0?'Saindo de':(i===n-1?'Indo para':'Parada '+i));
      inp.placeholder=i===0?'Saindo de':(i===n-1?'Indo para':'Parada '+i);
      rm.hidden=n<=2;
    }
    $('pr-add').disabled=n>=MAX_PONTOS;
  }
  var nLinha=0;
  function novaLinha(valor,antes){
    var id='pr-p'+(nLinha++);
    var li=document.createElement('li'); li.className='pr-ponto';
    li.innerHTML='<span class="pr-marca" aria-hidden="true"></span>'+
      '<div class="pr-ac"><input id="'+id+'" type="text" autocomplete="off" autocapitalize="words" spellcheck="false" enterkeyhint="next" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="'+id+'-l">'+
      '<ul class="pr-sug" id="'+id+'-l" role="listbox" hidden></ul></div>'+
      '<button type="button" class="pr-rm" aria-label="Tirar esta cidade do roteiro" title="Tirar do roteiro">×</button>';
    lista.insertBefore(li,antes||null);
    var inp=li.querySelector('input');
    if(valor){ inp.value=valor; }
    combo(inp,li.querySelector('.pr-sug'));
    li.querySelector('.pr-rm').addEventListener('click',function(){
      if(lista.children.length<=2) return;
      li.remove(); marcas();
    });
    marcas();
    return inp;
  }
  function combo(inp,ul){
    var itens=[], ativo=-1;
    function fechar(){ ul.hidden=true; inp.setAttribute('aria-expanded','false'); ativo=-1; inp.removeAttribute('aria-activedescendant'); }
    function marcar(i){
      ativo=i;
      [].forEach.call(ul.children,function(li,j){ li.setAttribute('aria-selected',j===i?'true':'false'); });
      if(i>=0&&ul.children[i]){ inp.setAttribute('aria-activedescendant',ul.children[i].id); ul.children[i].scrollIntoView({block:'nearest'}); }
    }
    function escolher(p){
      inp.value=rotulo(p); inp._p=p; inp.classList.add('ok'); fechar();
      /* vai para o próximo campo vazio */
      var todos=[].slice.call(lista.querySelectorAll('input')), i=todos.indexOf(inp);
      for(var j=i+1;j<todos.length;j++) if(!todos[j].value.trim()){ todos[j].focus(); return; }
    }
    function mostrar(){
      var q=inp.value.trim();
      if(q.length<2){ fechar(); return; }
      itens=buscar(q,8);
      if(!itens.length){ ul.innerHTML='<li class="vazio" role="option" aria-disabled="true">Nenhuma cidade com esse nome. Confira a grafia.</li>'; }
      else ul.innerHTML=itens.map(function(p,i){
        return '<li id="'+inp.id+'-o'+i+'" role="option" aria-selected="false" data-i="'+i+'"><span>'+esc(p.n)+' <span class="calc-sub">'+esc(p.uf)+'</span></span>'+(p.gu?'<small>'+(p.sem?'Guarnição · sem estrada':'Guarnição')+'</small>':'')+'</li>';
      }).join('');
      ul.hidden=false; inp.setAttribute('aria-expanded','true'); marcar(itens.length?0:-1);
    }
    inp.addEventListener('focus',function(){ carregarMun().then(function(){ if(document.activeElement===inp&&!inp._p) mostrar(); },function(){}); });
    inp.addEventListener('input',function(){ inp._p=null; inp.classList.remove('ok'); if(window.GG_MUNICIPIOS) mostrar(); else carregarMun().then(mostrar,function(){}); });
    inp.addEventListener('keydown',function(e){
      if(ul.hidden) return;
      if(e.key==='ArrowDown'){ e.preventDefault(); marcar(Math.min(itens.length-1,ativo+1)); }
      else if(e.key==='ArrowUp'){ e.preventDefault(); marcar(Math.max(0,ativo-1)); }
      else if(e.key==='Enter'){ if(ativo>=0&&itens[ativo]){ e.preventDefault(); escolher(itens[ativo]); } }
      else if(e.key==='Escape'){ fechar(); }
    });
    /* pointerdown evita que o blur feche a lista antes do toque */
    ul.addEventListener('pointerdown',function(e){ e.preventDefault(); });
    ul.addEventListener('click',function(e){ var li=e.target.closest('li[data-i]'); if(li) escolher(itens[+li.getAttribute('data-i')]); });
    inp.addEventListener('blur',function(){
      setTimeout(fechar,120);
      if(!inp._p&&inp.value.trim()&&window.GG_MUNICIPIOS){ var p=exato(inp.value); if(p){ inp._p=p; inp.classList.add('ok'); } }
    });
  }
  function entradas(){ return [].slice.call(lista.querySelectorAll('input')); }
  $('pr-add').addEventListener('click',function(){
    if(lista.children.length>=MAX_PONTOS) return;
    var inp=novaLinha('',lista.lastElementChild); inp.focus();
  });
  $('pr-troca').addEventListener('click',function(){
    var L=[].slice.call(lista.children).reverse();
    L.forEach(function(li){ lista.appendChild(li); }); marcas();
  });

  /* posição do aparelho como origem */
  var bAqui=$('pr-aqui');
  if(bAqui){
    if(!navigator.geolocation) bAqui.hidden=true;
    bAqui.addEventListener('click',function(){
      aviso('Buscando a sua localização…');
      navigator.geolocation.getCurrentPosition(function(p){
        var inp=entradas()[0];
        inp.value='Minha localização'; inp._p={n:'Minha localização',uf:'',lat:p.coords.latitude,lng:p.coords.longitude,aqui:1}; inp.classList.add('ok'); aviso('');
      },function(){ aviso('Não foi possível obter a localização. Digite a cidade de origem.','erro'); },{enableHighAccuracy:false,timeout:15000,maximumAge:300000});
    });
  }

  /* ---------- localizar cada cidade do roteiro ---------- */
  function getJSON(url){
    return fetch(url,{headers:{'Accept':'application/json'}}).then(function(r){ if(!r.ok) throw new Error('http '+r.status); return r.json(); });
  }
  var ultGeo=0; /* o Nominatim aceita um pedido por segundo */
  function buscaGeo(url,tent){
    var espera=Math.max(0,ultGeo+1200-Date.now());
    return new Promise(function(ok){ setTimeout(ok,espera); }).then(function(){ ultGeo=Date.now(); return getJSON(url); })
      .catch(function(e){ if(tent>0) return buscaGeo(url,tent-1); throw e; });
  }
  function localizar(inp){
    var t=inp.value.trim(), p=inp._p;
    if(!p){
      var m=/^(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)$/.exec(t);
      if(m) return Promise.resolve({nome:t,lat:+m[1],lng:+m[2]});
      p=exato(t);
    }
    if(p){
      var nome=p.aqui?p.n:rotulo(p);
      /* município muito grande: o centro do território pode ficar longe da sede; procura a sede no mapa */
      if(p.grande&&!p.gu) return buscaGeo(GEO+encodeURIComponent(p.n+', '+p.uf+', Brasil'),1)
        .then(function(j){ return j&&j.length?{nome:nome,lat:+j[0].lat,lng:+j[0].lon,uf:p.uf,n:p.n}:{nome:nome,lat:p.lat,lng:p.lng,uf:p.uf,n:p.n}; },
              function(){ return {nome:nome,lat:p.lat,lng:p.lng,uf:p.uf,n:p.n}; });
      return Promise.resolve({nome:nome,lat:p.lat,lng:p.lng,uf:p.uf,n:p.n});
    }
    var q=t.replace(/\s*[-\/]\s*([A-Za-z]{2})$/,', $1');
    return buscaGeo(GEO+encodeURIComponent(q+', Brasil'),2).then(function(j){
      if(!j||!j.length) throw new Error('nao-achou:'+t);
      return {nome:String(j[0].display_name||t).split(',').slice(0,2).join(','),lat:+j[0].lat,lng:+j[0].lon};
    });
  }
  function localizarTodos(L){
    var res=[], i=0;
    function prox(){ if(i>=L.length) return Promise.resolve(res); return localizar(L[i]).then(function(p){ res.push(p); i++; return prox(); }); }
    return prox();
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
  function rota(P,k){
    k=k||0;
    var url=ROTAS[k]+P.map(function(p){ return p.lng.toFixed(5)+','+p.lat.toFixed(5); }).join(';')+'?overview=full&geometries=polyline6&steps=true';
    return getJSON(url).then(function(j){
      if(!j||j.code!=='Ok'||!j.routes||!j.routes.length) throw new Error('sem-rota');
      return j.routes[0];
    }).catch(function(e){
      if(e.message==='sem-rota'||k+1>=ROTAS.length) throw e;
      return rota(P,k+1);
    });
  }
  /* pontos da rota a cada ~200 m, com o km acumulado; trechos, rodovias e tempo ao longo do caminho */
  function preparar(r){
    var p=decod(r.geometry), lat=[], lng=[], km=[], acc=0;
    for(var i=0;i<p.length;i+=2){
      if(i){
        var d=hav(p[i-2],p[i-1],p[i],p[i+1]), n=Math.floor(d/0.2);
        for(var s=1;s<=n;s++){ var f=s/(n+1); lat.push(p[i-2]+(p[i]-p[i-2])*f); lng.push(p[i-1]+(p[i+1]-p[i-1])*f); km.push(acc+d*f); }
        acc+=d;
      }
      lat.push(p[i]); lng.push(p[i+1]); km.push(acc);
    }
    var total=r.distance/1000, fx=acc>0?total/acc:1;
    for(var j=0;j<km.length;j++) km[j]*=fx;
    var vias=[], a=0, tk=[0], tt=[0], t=0, legs=[];
    (r.legs||[]).forEach(function(leg){
      legs.push({de:a/1000,km:leg.distance/1000,dur:leg.duration});
      (leg.steps||[]).forEach(function(st){
        var nome=(st.ref||st.name||'').split(';')[0].trim();
        if(nome && st.distance>300) vias.push([a/1000,nome]);
        a+=st.distance; t+=st.duration; tk.push(a/1000); tt.push(t);
      });
    });
    return {lat:lat,lng:lng,km:km,total:total,dur:r.duration,vias:vias,tk:tk,tt:tt,legs:legs};
  }
  function viaEm(T,k){
    var v='', L=T.vias;
    for(var i=0;i<L.length && L[i][0]<=k+0.3;i++) v=L[i][1];
    return v;
  }
  /* km da viagem em que se completa um tempo de volante, e o tempo até um km */
  function kmNoTempo(T,seg){
    var tk=T.tk, tt=T.tt;
    for(var i=1;i<tt.length;i++) if(tt[i]>=seg){ var f=(seg-tt[i-1])/Math.max(1,tt[i]-tt[i-1]); return tk[i-1]+(tk[i]-tk[i-1])*f; }
    return T.total;
  }
  function pontoNoKm(T,k){
    var lo=0, hi=T.km.length-1;
    while(lo<hi){ var m=(lo+hi)>>1; if(T.km[m]<k) lo=m+1; else hi=m; }
    return {lat:T.lat[lo],lng:T.lng[lo]};
  }

  /* ---------- dados do caminho ---------- */
  var POSTOS=null;
  function carregarPostos(){
    if(POSTOS) return Promise.resolve(POSTOS);
    return carregar(ARQ.postos,function(){ return !!(window.GG_POSTOS&&window.GG_POSTOS.p); }).then(function(){
      var D=window.GG_POSTOS, L=D.p.split('\n'), P=new Array(L.length);
      for(var i=0;i<L.length;i++){
        var c=L[i].split(';');
        P[i]={lat:parseInt(c[0],36)/1e4-40, lng:parseInt(c[1],36)/1e4-80, f:parseInt(c[2]||'0',36), cid:c[3]?D.cid[parseInt(c[3],36)]:'', b:c[4]?(D.band[parseInt(c[4],36)]||''):'', nome:c.slice(5).join(';')};
      }
      return POSTOS={lista:P,gerado:D.gerado,notas:D.notas||{}};
    });
  }
  var PEDAGIOS=null;
  function carregarPedagios(){ /* opcional: sem a base, o relatório segue sem pedágio */
    if(PEDAGIOS) return Promise.resolve(PEDAGIOS);
    return carregar(ARQ.ped,function(){ return !!(window.GG_PEDAGIOS&&window.GG_PEDAGIOS.p!=null); }).then(function(){
      var D=window.GG_PEDAGIOS, L=D.p?D.p.split('\n'):[];
      return PEDAGIOS={gerado:D.gerado,lista:L.map(function(l){ var c=l.split(';'); return {lat:+c[0],lng:+c[1],tipo:c[2],val:c[3]?+c[3]:0,nome:c.slice(4).join(';')}; })};
    },function(){ return PEDAGIOS={gerado:'',lista:[],falta:1}; });
  }
  var HTS=null;
  function carregarHT(){
    if(HTS) return Promise.resolve(HTS);
    return carregar(ARQ.ht,function(){ return !!window.GG_HT; }).then(function(){ return HTS=window.GG_HT; },function(){ return HTS={cidades:[],falta:1}; });
  }
  /* itens a até "lim" km da rota, com o km da viagem em que ficam */
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
  /* cidade (município do IBGE) mais perto de um ponto */
  function cidadePerto(lat,lng){
    var L=indice(), melhor=1e9, qual=null;
    for(var i=0;i<L.length;i++){ var d=hav(lat,lng,L[i].lat,L[i].lng); if(d<melhor){ melhor=d; qual=L[i]; } }
    return qual?{p:qual,d:melhor}:null;
  }

  /* ---------- plano de abastecimento ---------- */
  function nota(s){ return (s.p.f&1?2:0)+(s.p.nome?1:0)-(s.fora>0.6?1:0); }
  function planejar(S,total,aut,ini,reserva,band){
    var paradas=[], pos=0, comb=aut*ini, res=aut*reserva, i=0, guard=0, critico=[];
    while(guard++<300){
      var limite=pos+comb-res;
      if(total<=limite+0.5) break;
      while(i<S.length && S[i].km<=pos+0.5) i++;
      var j=i, ultimo=-1;
      while(j<S.length && S[j].km<=limite){ ultimo=j; j++; }
      var esc_=null, tipo='ok', fora=false;
      if(ultimo>=i){
        var topo=ultimo;
        if(band){
          topo=-1;
          for(var w=ultimo;w>=i;w--) if(band[S[w].p.b]){ topo=w; break; }
          if(topo<0){ topo=ultimo; fora=true; }
        }
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

  /* ---------- pedágios, hotéis de trânsito e pernoite ---------- */
  function pedagiosNaRota(T,PD,padrao){
    var A=naRota(T,PD.lista,PED_ROTA);
    A.forEach(function(a){ a.valor=a.p.val||padrao; a.doMapa=!!a.p.val; });
    return A;
  }
  function htNaRota(T,H,pontos,lim){
    var cid=H.cidades.map(function(c){ return {lat:c.lat,lng:c.lng,c:c}; });
    var A=naRota(T,cid,lim);
    /* cidade do roteiro com HT entra mesmo se o centro dela ficar um pouco fora do traçado */
    pontos.forEach(function(p,i){
      H.cidades.forEach(function(c){
        if(hav(p.lat,p.lng,c.lat,c.lng)<=15 && !A.some(function(a){ return a.p.c===c; }))
          A.push({p:{lat:c.lat,lng:c.lng,c:c},km:i===0?0:(i===pontos.length-1?T.total:T.legs.slice(0,i).reduce(function(s,l){ return s+l.km; },0)),fora:hav(p.lat,p.lng,c.lat,c.lng)});
      });
    });
    A.sort(function(a,b){ return a.km-b.km; });
    return A;
  }
  /* divide o volante em dias iguais; cada noite vai para um HT perto do ponto, para uma cidade do roteiro ou para a região */
  function pernoites(T,horasDia,htLonge,paradasKm){
    if(!horasDia) return [];
    var lim=horasDia*3600, dias=Math.ceil(T.dur/lim);
    if(dias<=1) return [];
    var noites=[], passo=T.dur/dias, kmDia=T.total/dias;
    for(var n=1;n<dias;n++){
      var alvo=kmNoTempo(T,passo*n), ini=alvo-kmDia*0.25, fim=alvo+kmDia*0.08;
      var ht=null;
      htLonge.forEach(function(h){ if(h.km>=ini&&h.km<=fim&&(!ht||Math.abs(h.km-alvo)<Math.abs(ht.km-alvo))) ht=h; });
      var parada=null;
      paradasKm.forEach(function(p){ if(p.km>=ini&&p.km<=fim&&(!parada||Math.abs(p.km-alvo)<Math.abs(parada.km-alvo))) parada=p; });
      var km=ht?ht.km:(parada?parada.km:alvo), pt=pontoNoKm(T,km), perto=cidadePerto(pt.lat,pt.lng);
      noites.push({n:n,km:km,alvo:alvo,ht:ht,parada:parada,perto:perto});
    }
    return noites;
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
  function regua(T,S,plano,gaps,noites){
    var W=1000, x=function(k){ return (k/T.total*W).toFixed(1); }, h='';
    gaps.forEach(function(g){ h+='<rect class="pr-r-gap'+(g.crit?' crit':'')+'" x="'+x(g.de)+'" y="18" width="'+Math.max(2,(g.km/T.total*W)).toFixed(1)+'" height="24"/>'; });
    h+='<rect class="pr-r-via" x="0" y="28" width="'+W+'" height="4" rx="2"/>';
    S.forEach(function(s){ h+='<rect class="pr-r-p" x="'+x(s.km)+'" y="22" width="1.2" height="16"/>'; });
    var acc=0; T.legs.slice(0,-1).forEach(function(l){ acc+=l.km; h+='<rect class="pr-r-cid" x="'+(+x(acc)-5)+'" y="25" width="10" height="10" transform="rotate(45 '+x(acc)+' 30)"/>'; });
    noites.forEach(function(nt){ h+='<text class="pr-r-km" x="'+x(nt.km)+'" y="12" text-anchor="middle">noite '+nt.n+'</text><rect class="pr-r-noite" x="'+x(nt.km)+'" y="15" width="1.5" height="30"/>'; });
    plano.paradas.forEach(function(p,i){ h+='<g><circle class="pr-r-stop" cx="'+x(p.s.km)+'" cy="30" r="9"/><text class="pr-r-n" x="'+x(p.s.km)+'" y="34" text-anchor="middle">'+(i+1)+'</text></g>'; });
    var passo=T.total>2400?800:T.total>1200?400:T.total>500?200:T.total>200?100:50;
    for(var k=0;k<=T.total;k+=passo) h+='<text class="pr-r-km" x="'+x(k)+'" y="62" text-anchor="'+(k===0?'start':'middle')+'">'+n0(k)+'</text>';
    return '<div class="pr-regua-wrap"><svg class="pr-regua" viewBox="-12 0 1024 70" role="img" aria-label="Régua da viagem com os postos, os trechos sem posto, as cidades do roteiro e as paradas sugeridas">'+h+'</svg>'+
      '<p class="pr-legenda"><span><i class="lg-p"></i>posto</span><span><i class="lg-g"></i>trecho longo sem posto</span><span><i class="lg-s"></i>parada para abastecer</span>'+(T.legs.length>1?'<span><i class="lg-c"></i>cidade do roteiro</span>':'')+'<span>km da viagem</span></p></div>';
  }
  function htCard(T,h,pontos){
    var c=h.p.c, onde=h.km<=0.5?'na saída':(h.km>=T.total-0.5?'no destino':'km '+n0(h.km)+' da viagem');
    var desvio=h.fora>3?' · '+n0(h.fora)+' km da rota':'';
    return '<article class="pr-htc"><h3>'+esc(c.c)+' <span class="calc-sub">'+esc(c.uf)+'</span></h3><span class="pr-onde">'+onde+desvio+'</span><details><summary>'+(c.h.length>1?'Ver os '+c.h.length+' hotéis':'Ver o hotel')+'</summary><ul>'+
      c.h.map(function(x){
        var info=[x.p, x.q?x.q+(x.q>1?' quartos':' quarto'):'', x.cat?'categoria '+x.cat:'', x.pet?'aceita pet':'', x.pcd?'quarto adaptado':'', x.l==='dentro'?'dentro da OM':(x.l==='fora'?'fora da OM':'')].filter(Boolean).join(' · ');
        return '<li><b>'+esc(x.n)+'</b><span>'+esc(x.om)+(info?'<br>'+esc(info):'')+'</span></li>';
      }).join('')+'</ul></details><a class="btn sec" href="'+esc(c.dap)+'" target="_blank" rel="noopener">Contato e reserva na DAP ↗</a>'+
      (c.s?' <a class="calc-link" href="/hoteis-de-transito?c='+esc(c.s)+'">Ver no Guia</a>':'')+'</article>';
  }

  function mostrar(P,T,S,PD,HT,cfg){
    var aut=cfg.c*cfg.t, util=aut*(1-cfg.res), plano=planejar(S,T.total,aut,cfg.ini,cfg.res,cfg.band);
    var nBand=cfg.band?S.filter(function(s){ return cfg.band[s.p.b]; }).length:0, txtBand=cfg.band?Object.keys(cfg.band).join(' ou '):'';
    var tr=trechos(S,T.total), limAlerta=Math.min(60,Math.max(30,util*0.5));
    var gaps=tr.filter(function(g){ return g.km>=limAlerta; }).map(function(g){ g.crit=g.km>util; return g; });
    var maior=tr.reduce(function(m,g){ return g.km>m.km?g:m; },{km:0});
    var litros=T.total/cfg.c;

    /* pedágios, HT e pernoite */
    var peds=pedagiosNaRota(T,PD,cfg.ped), pedTotal=peds.reduce(function(s,a){ return s+a.valor; },0), pedMapa=peds.filter(function(a){ return a.doMapa; }).length;
    var htR=htNaRota(T,HT,P,HT_ROTA), htLonge=htNaRota(T,HT,P,HT_NOITE);
    var legKm=[], acc=0; T.legs.forEach(function(l,i){ if(i) legKm.push({km:acc,p:P[i]}); acc+=l.km; });
    var noites=pernoites(T,cfg.dia,htLonge,legKm);
    var hosp=noites.length*cfg.diaria, combR=cfg.preco?litros*cfg.preco:0;
    var rotaTxt=P.map(function(p){ return p.nome; }).join(' → ');
    var h='';

    h+='<div class="calc-total"><span class="eyebrow">'+esc(rotaTxt)+'</span><b class="num">'+n0(T.total)+' km</b>'+
       '<span class="calc-sub">'+horas(T.dur)+' ao volante, sem contar as paradas · '+n0(S.length)+' postos no caminho'+
       (cfg.dia?' · '+(noites.length?(noites.length+1)+' dias de estrada, '+noites.length+(noites.length>1?' noites':' noite'):'dá para fazer em um dia'):'')+'</span></div>';

    /* custos */
    var faltam=[];
    if(!cfg.preco) faltam.push('o preço do litro');
    if(noites.length&&!cfg.diaria) faltam.push('a diária de hospedagem');
    h+='<div class="pr-custos">'+
      '<div><span class="eyebrow">Combustível</span><b class="num">'+(cfg.preco?brl(combR):n0(litros)+' L')+'</b><span class="calc-sub">'+n0(litros)+' L'+(cfg.preco?' a '+brl(cfg.preco)+' o litro':' · informe o preço do litro')+'</span></div>'+
      '<div><span class="eyebrow">Pedágios</span><b class="num">'+(PD.falta?'—':brl(pedTotal))+'</b><span class="calc-sub">'+(PD.falta?'base de pedágios indisponível':(peds.length?peds.length+(peds.length>1?' praças':' praça')+(pedMapa<peds.length?', '+(peds.length-pedMapa)+' com valor estimado':''):'nenhuma praça no caminho'))+'</span></div>'+
      '<div><span class="eyebrow">Hospedagem</span><b class="num">'+(noites.length?(cfg.diaria?brl(hosp):noites.length+(noites.length>1?' noites':' noite')):'R$ 0')+'</b><span class="calc-sub">'+(noites.length?noites.length+(noites.length>1?' noites':' noite')+(cfg.diaria?' a '+brl(cfg.diaria):' · informe a diária'):(cfg.dia?'viagem de um dia só':'sem pernoite'))+'</span></div>'+
      '<div class="pr-total"><span class="eyebrow">Total estimado</span><b class="num">'+brl(combR+(PD.falta?0:pedTotal)+hosp)+'</b><span class="calc-sub">'+(faltam.length?'falta informar '+faltam.join(' e '):(PD.falta?'combustível + hospedagem (sem pedágios)':'combustível + pedágios + hospedagem'))+'</span></div>'+
      '</div>';

    /* trechos do roteiro */
    if(T.legs.length>1){
      var kmIni=0;
      h+='<section class="pr-sec"><h2>Trechos do roteiro</h2><div class="pr-tab-wrap"><table class="pr-tab"><thead><tr><th>Trecho</th><th class="n">Distância</th><th class="n">Volante</th><th class="n">Pedágios</th></tr></thead><tbody>'+
        T.legs.map(function(l,i){
          var ps=peds.filter(function(a){ return a.km>=kmIni-0.01&&a.km<kmIni+l.km+0.01; }), v=ps.reduce(function(s,a){ return s+a.valor; },0);
          kmIni+=l.km;
          return '<tr><td>'+esc(P[i].nome)+' → '+esc(P[i+1].nome)+'</td><td class="n">'+n0(l.km)+' km</td><td class="n">'+horas(l.dur)+'</td><td class="n">'+(PD.falta?'—':(ps.length?brl(v)+' <span class="calc-sub">('+ps.length+')</span>':'—'))+'</td></tr>';
        }).join('')+'</tbody><tfoot><tr><td>Total</td><td class="n">'+n0(T.total)+' km</td><td class="n">'+horas(T.dur)+'</td><td class="n">'+(PD.falta?'—':brl(pedTotal))+'</td></tr></tfoot></table></div></section>';
    }

    /* pernoite */
    if(noites.length){
      h+='<section class="pr-sec"><h2>Onde dormir</h2><p class="calc-dica">A viagem foi dividida em '+(noites.length+1)+' dias de até '+cfg.dia+' h de volante. Onde há Hotel de Trânsito perto do ponto do dia, ele é a sugestão.</p><ol class="pr-noites">'+
        noites.map(function(nt){
          var lugar, det;
          if(nt.ht){ lugar=nt.ht.p.c.c+'-'+nt.ht.p.c.uf; det='Hotel de Trânsito do Exército: '+nt.ht.p.c.h.map(function(x){ return x.n+(x.p?' ('+x.p+')':''); }).join('; ')+'. <a href="'+esc(nt.ht.p.c.dap)+'" target="_blank" rel="noopener">Contato e reserva na DAP ↗</a>'; }
          else if(nt.parada){ lugar=nt.parada.p.nome; det='Cidade do seu roteiro, perto do fim do dia de estrada. Não há Hotel de Trânsito por perto.'; }
          else { lugar=nt.perto?'Região de '+rotulo(nt.perto.p):'km '+n0(nt.km); det='Não há Hotel de Trânsito perto do fim deste dia de estrada. Procure hotel ou pousada na região.'; }
          var v=viaEm(T,nt.km);
          return '<li class="'+(nt.ht?'ht':'')+'"><div class="pr-noite-t"><span class="eyebrow">Noite '+nt.n+'</span><b>'+esc(lugar)+'</b><span class="calc-sub">km '+n0(nt.km)+' da viagem'+(v?' · '+esc(v):'')+'</span></div><p class="pr-det">'+det+'</p></li>';
        }).join('')+'</ol>'+(cfg.diaria?'<p class="calc-dica">Hospedagem: '+noites.length+' × '+brl(cfg.diaria)+' = <b>'+brl(hosp)+'</b>.</p>':'')+'</section>';
    }

    /* hotéis de trânsito */
    h+='<section class="pr-sec"><h2>Hotéis de Trânsito no caminho</h2>';
    if(HT.falta) h+='<p>Não foi possível carregar a lista de Hotéis de Trânsito agora.</p>';
    else if(!htR.length) h+='<p>Nenhum Hotel de Trânsito do Exército nas cidades do roteiro nem a até '+HT_ROTA+' km da rota. Veja todos em <a href="/hoteis-de-transito">Hotéis de Trânsito</a>.</p>';
    else h+='<p class="calc-dica">'+htR.length+(htR.length>1?' cidades com Hotel de Trânsito':' cidade com Hotel de Trânsito')+' no roteiro ou a até '+HT_ROTA+' km da rota. Reserva e contato (telefone e e-mail) ficam no sistema da DAP: o botão abre a cidade certa.</p><div class="pr-hts">'+htR.map(function(x){ return htCard(T,x,P); }).join('')+'</div>';
    h+='</section>';

    /* pedágios */
    if(!PD.falta&&peds.length){
      h+='<details class="pr-todos"><summary>Ver as '+peds.length+(peds.length>1?' praças de pedágio':' praça de pedágio')+' do caminho</summary><ol class="pr-ped-lista">'+
        peds.map(function(a){ var v=viaEm(T,a.km); return '<li><b>'+esc(a.p.nome||(a.p.tipo==='f'?'Pórtico de cobrança automática':'Praça de pedágio'))+'</b> · km '+n0(a.km)+(v?' · '+esc(v):'')+' · '+brl(a.valor)+(a.doMapa?'':' <span class="calc-sub">(estimado)</span>')+(a.p.tipo==='f'?' <span class="calc-sub">· free flow: pague pelo app ou site da concessionária</span>':'')+'</li>'; }).join('')+
        '</ol><p class="calc-dica">Valores para carro de passeio. Algumas praças cobram só num sentido e as tarifas mudam: confira no site da concessionária antes de sair.</p></details>';
    }

    /* combustível: autonomia, régua e paradas */
    h+='<div class="pr-nums"><div><span class="eyebrow">Autonomia com tanque cheio</span><b class="num">'+n0(aut)+' km</b><span class="calc-sub">'+n0(util)+' km sem entrar na reserva</span></div>'+
       '<div><span class="eyebrow">Maior trecho sem posto</span><b class="num'+(maior.km>util?' pr-crit':'')+'">'+n0(maior.km)+' km</b><span class="calc-sub">entre o km '+n0(maior.de)+' e o km '+n0(maior.ate)+'</span></div>'+
       '<div><span class="eyebrow">Paradas para abastecer</span><b class="num">'+plano.paradas.length+'</b><span class="calc-sub">'+(plano.paradas.length?'enchendo o tanque em cada uma':'dá para chegar sem abastecer')+'</span></div></div>';
    h+=regua(T,S,plano,gaps,noites);

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

    /* ações: Google Maps com as cidades do roteiro e, se couber, as paradas para abastecer (até 9 pontos no meio) */
    var meio=legKm.map(function(x){ return {km:x.km,ll:x.p.lat.toFixed(5)+','+x.p.lng.toFixed(5),f:1}; });
    plano.paradas.forEach(function(p){ if(meio.length<9) meio.push({km:p.s.km,ll:p.s.p.lat.toFixed(5)+','+p.s.p.lng.toFixed(5)}); });
    meio=meio.slice(0,9).sort(function(a,b){ return a.km-b.km; });
    var A=P[0], B=P[P.length-1];
    var gm='https://www.google.com/maps/dir/?api=1&travelmode=driving&origin='+A.lat.toFixed(5)+','+A.lng.toFixed(5)+'&destination='+B.lat.toFixed(5)+','+B.lng.toFixed(5)+(meio.length?'&waypoints='+encodeURIComponent(meio.map(function(m){ return m.ll; }).join('|')):'');
    h+='<div class="calc-acoes"><a class="btn" href="'+gm+'" target="_blank" rel="noopener">Abrir no Google Maps'+(meio.length?' com as paradas':'')+'</a><button class="btn sec" type="button" id="pr-copiar">Copiar link deste plano</button></div>';

    if(S.length) h+='<details class="pr-todos"><summary>Ver os '+n0(S.length)+' postos do caminho</summary><ul class="pr-lista" id="pr-todos"></ul></details>';
    h+='<p class="calc-sub pr-fonte">Rota, postos e pedágios: © colaboradores do OpenStreetMap. Base de postos de '+esc(ULT.gerado.split('-').reverse().join('/'))+
      (PD.gerado?', de pedágios de '+esc(PD.gerado.split('-').reverse().join('/')):'')+'. Hotéis de Trânsito: DAP, cadastro consultado em '+esc(String(HT.consulta||'').split('-').reverse().join('/'))+'. Cidades: IBGE.</p>';
    out.innerHTML=h;

    var det=$('pr-todos')&&$('pr-todos').closest('details');
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
  function bandeiras(){ return [].slice.call(form.querySelectorAll('input[name="pr-band"]:checked')).map(function(i){ return i.value; }); }
  function ler(){
    var band=null;
    bandeiras().forEach(function(b){ (band=band||{})[b]=1; });
    return {band:band,c:num(F.c),t:num(F.t),ini:(parseFloat(F.ini.value)||100)/100,res:(parseFloat(F.res.value)||15)/100,desv:parseFloat(F.desv.value)||1,
            preco:num(F.preco),ped:F.ped&&F.ped.value.trim()!==''?num(F.ped):10,dia:parseFloat(F.dia&&F.dia.value)||0,diaria:num(F.diaria)};
  }
  function guardar(){
    var q=new URLSearchParams();
    q.set('r',entradas().map(function(i){ return i.value.trim(); }).join('|')); q.set('c',F.c.value); q.set('t',F.t.value);
    if(F.ini.value!=='100') q.set('i',F.ini.value); if(F.res.value!=='15') q.set('r2',F.res.value); if(F.desv.value!=='1') q.set('v',F.desv.value);
    if(F.preco.value) q.set('p',F.preco.value); if(F.ped&&F.ped.value!=='10') q.set('pd',F.ped.value);
    if(F.dia&&F.dia.value!=='9') q.set('h',F.dia.value); if(F.diaria&&F.diaria.value) q.set('dr',F.diaria.value);
    if(bandeiras().length) q.set('b',bandeiras().join('|'));
    try{ history.replaceState(null,'','?'+q.toString()); }catch(e){}
    try{ localStorage.setItem('gg_carro',JSON.stringify({c:F.c.value,t:F.t.value,p:F.preco.value,dr:F.diaria?F.diaria.value:''})); }catch(e){}
  }
  var rodando=false, ULT_ROTA='';
  function executar(){
    if(rodando) return;
    var cfg=ler(), L=entradas().filter(function(i){ return i.value.trim(); });
    if(L.length<2) return aviso('Informe pelo menos a cidade de origem e a de destino.','erro');
    if(!cfg.c||!cfg.t) return aviso('Informe o consumo (km/l) e o tamanho do tanque (litros).','erro');
    if(cfg.c>60||cfg.t>1500) return aviso('Confira o consumo e o tanque: os valores parecem altos demais.','erro');
    rodando=true; btn.disabled=true; aviso('Localizando as cidades…');
    var P,T,PD,HT;
    carregarMun().catch(function(){}).then(function(){ return localizarTodos(L); })
    .then(function(p){
      P=p;
      for(var i=1;i<P.length;i++) if(hav(P[i-1].lat,P[i-1].lng,P[i].lat,P[i].lng)<1) throw new Error('mesmo');
      var semEstrada=L.filter(function(i){ return i._p&&i._p.sem; });
      if(semEstrada.length) throw new Error('sem-estrada:'+rotulo(semEstrada[0]._p));
      aviso('Traçando a rota…'); return rota(P);
    }).then(function(r){
      T=preparar(r); aviso('Procurando postos, pedágios e Hotéis de Trânsito…');
      return Promise.all([carregarPostos(),carregarPedagios(),carregarHT()]);
    }).then(function(D){
      ULT=D[0]; PD=D[1]; HT=D[2];
      var S=naRota(T,ULT.lista,cfg.desv);
      if(!P.some(function(p){ return p.nome==='Minha localização'; })) guardar();
      ULT_ROTA=P.map(function(p){ return p.nome; }).join(' → ');
      mostrar(P,T,S,PD,HT,cfg); aviso('');
      if(window.gtag) gtag('event','postos_na_rota',{km:Math.round(T.total),cidades:P.length});
      out.scrollIntoView({behavior:'smooth',block:'start'});
    }).catch(function(e){
      var m=String(e&&e.message||'');
      if(m.indexOf('nao-achou:')===0) aviso('Não encontrei "'+m.slice(10)+'". Escolha a cidade na lista que aparece ao digitar.','erro');
      else if(m.indexOf('sem-estrada:')===0) aviso(m.slice(12)+' não tem ligação por estrada com o resto do país: a chegada é de avião ou de barco. Tire a cidade do roteiro ou use a última cidade com estrada.','erro');
      else if(m==='mesmo') aviso('Duas cidades seguidas do roteiro são o mesmo lugar.','erro');
      else if(m==='sem-rota') aviso('Não há rota de carro entre essas cidades.','erro');
      else if(m==='sem-dados') aviso('Não foi possível carregar a base de postos. Recarregue a página e tente de novo.','erro');
      else aviso('Não foi possível traçar a rota agora. Confira a internet e tente de novo em instantes.','erro');
    }).then(function(){ rodando=false; btn.disabled=false; });
  }
  form.addEventListener('submit',function(e){ e.preventDefault(); executar(); });

  /* estado inicial: link compartilhado ou último carro usado */
  (function(){
    var q=new URLSearchParams(location.search), set=function(el,v){ if(el&&v!=null&&v!=='') el.value=v; };
    try{ var g=JSON.parse(localStorage.getItem('gg_carro')||'null'); if(g){ set(F.c,g.c); set(F.t,g.t); set(F.preco,g.p); set(F.diaria,g.dr); } }catch(e){}
    var r=(q.get('r')||'').split('|').filter(function(s){ return s.trim(); });
    if(!r.length&&q.get('o')&&q.get('d')) r=[q.get('o'),q.get('d')]; /* links antigos */
    if(r.length<2) r=r.concat(['','']).slice(0,2);
    r.slice(0,MAX_PONTOS).forEach(function(v){ novaLinha(v); });
    set(F.c,q.get('c')); set(F.t,q.get('t')); set(F.ini,q.get('i')); set(F.res,q.get('r2')); set(F.desv,q.get('v')); set(F.preco,q.get('p'));
    set(F.ped,q.get('pd')); set(F.dia,q.get('h')); set(F.diaria,q.get('dr'));
    var qb=(q.get('b')||'').split('|');
    [].forEach.call(form.querySelectorAll('input[name="pr-band"]'),function(i){ if(qb.indexOf(i.value)>=0) i.checked=true; });
    if(entradas().filter(function(i){ return i.value.trim(); }).length>=2&&num(F.c)&&num(F.t)) executar();
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
      data._subject='[Guia] Planejamento de Rota — '+(data['Tipo de aviso']||'aviso');
      data._template='table';
      data['Rota consultada']=ULT_ROTA||entradas().map(function(i){ return i.value.trim()||'?'; }).join(' → ');
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
