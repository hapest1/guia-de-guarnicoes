/* Locais de servir: mapa das guarnições (geral) e das OM por arma (piloto: Cavalaria).
   Dados em /locais-dados.js (window.LS) e contorno dos estados em /br-geo.js (window.BRGEO). */
(function(){
  var LS=window.LS, GEO=window.BRGEO; if(!LS||!GEO) return;
  var $=function(s){return document.querySelector(s)};
  var NS='http://www.w3.org/2000/svg';
  var esc=function(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
  var norm=function(s){return String(s).normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase()};
  var el=function(t,a,p){var e=document.createElementNS(NS,t);for(var k in a)e.setAttribute(k,a[k]);if(p)p.appendChild(e);return e};

  var G=LS.g, BYS={}; G.forEach(function(g){BYS[g.s]=g});
  var CMDN={CMA:'Amazônia',CMN:'Norte',CMNE:'Nordeste',CMP:'Planalto',CML:'Leste',CMSE:'Sudeste',CMO:'Oeste',CMS:'Sul'};
  var REGS=['Norte','Nordeste','Centro-Oeste','Sudeste','Sul'];

  /* OM de Cavalaria por guarnição */
  var CAVG={}; LS.cav.forEach(function(c){(CAVG[c.s]=CAVG[c.s]||[]).push(c)});

  var S={tab:'geral',reg:null,sel:null,q:''};
  var svg=$('#lsmap'), gLand=$('#ls-land'), gMk=$('#ls-mk'), gLb=$('#ls-lb');
  if(!svg) return;

  /* ---- estados ---- */
  var ufEl={}, all=[1e9,1e9,-1e9,-1e9];
  Object.keys(GEO).forEach(function(uf){
    var p=el('path',{d:GEO[uf].d,'class':'ls-uf'},gLand); ufEl[uf]=p;
    var b=GEO[uf].bb; all=[Math.min(all[0],b[0]),Math.min(all[1],b[1]),Math.max(all[2],b[2]),Math.max(all[3],b[3])];
  });
  var BASE=[all[0]-12,all[1]-12,all[2]-all[0]+24,all[3]-all[1]+24];
  var vb=BASE.slice(), anim=null;
  function setVB(v){vb=v;svg.setAttribute('viewBox',v.join(' '));sizeMarkers()}

  /* ---- marcadores ---- */
  var mk={};
  G.forEach(function(g){
    var a=el('a',{href:'/'+g.s,'class':'ls-mk','data-s':g.s,'aria-label':g.n+'-'+g.uf},gMk);
    el('circle',{cx:g.x,cy:g.y,r:4},a);
    var t=el('text',{x:g.x,y:g.y},a);
    a.addEventListener('click',function(e){e.preventDefault();select(g.s,true)});
    mk[g.s]={a:a,c:a.firstChild,t:t};
  });

  function visible(g){
    if(S.tab==='cav' && !CAVG[g.s]) return false;
    if(S.reg && g.r!==S.reg) return false;
    if(S.q){
      var txt=g.n+' '+g.uf+' '+g.om.join(' ')+' '+g.ou+' '+(CAVG[g.s]||[]).map(function(c){return c.om}).join(' ');
      if(norm(txt).indexOf(S.q)<0) return false;
    }
    return true;
  }
  function weight(g){return S.tab==='cav'?(CAVG[g.s]||[]).length:Math.max(1,g.om.length)}

  function sizeMarkers(){
    var k=vb[2]/BASE[2]; /* 1 = Brasil inteiro; menor = zoom */
    var px=vb[2]/ (svg.clientWidth||600); /* unidades do mapa por pixel */
    G.forEach(function(g){
      var m=mk[g.s]; if(m.a.style.display==='none') return;
      var r = S.tab==='cav' ? (8+3*Math.sqrt(weight(g)))*px : (3.2+1.1*Math.sqrt(weight(g)))*px;
      m.c.setAttribute('r',r.toFixed(2));
      m.t.setAttribute('font-size',(11*px).toFixed(2));
    });
    var lpx=11*px; gLb.querySelectorAll('text').forEach(function(t){t.setAttribute('font-size',lpx.toFixed(2));t.setAttribute('stroke-width',(3*px).toFixed(2))});
    svg.style.setProperty('--k',k);
  }

  function render(){
    document.body.dataset.lstab=S.tab;
    var vis=G.filter(visible);
    G.forEach(function(g){
      var m=mk[g.s], v=visible(g);
      m.a.style.display=v?'':'none';
      m.a.classList.toggle('on',S.sel===g.s);
      m.t.textContent=(S.tab==='cav'&&weight(g)>1)?weight(g):'';
    });
    /* estados com OM da arma */
    var ufs={}; if(S.tab==='cav') LS.cav.forEach(function(c){ufs[BYS[c.s].uf]=1});
    Object.keys(ufEl).forEach(function(u){ufEl[u].classList.toggle('has',!!ufs[u])});
    /* rótulos: só na Cavalaria e no zoom de região */
    while(gLb.firstChild) gLb.removeChild(gLb.firstChild);
    if(S.tab==='cav' && (S.reg||vis.length<=12)){
      /* rótulos sem sobreposição: os de mais OM primeiro, pula quem colidir */
      var tv=targetVB(), px=tv[2]/(svg.clientWidth||600), boxes=[];
      vis.slice().sort(function(a,b){return weight(b)-weight(a)}).forEach(function(g){
        var r=(8+3*Math.sqrt(weight(g)))*px, x=g.x+r+2*px, w=g.n.length*6.4*px, h=14*px;
        var bx=[x,g.y-h/2,x+w,g.y+h/2];
        if(boxes.some(function(o){return bx[0]<o[2]&&bx[2]>o[0]&&bx[1]<o[3]&&bx[3]>o[1]})) return;
        boxes.push(bx); el('text',{x:x,y:g.y,'class':'ls-lb'},gLb).textContent=g.n;
      });
    }
    sizeMarkers();
    renderKpis(vis); renderList(vis); renderInfo();
    document.querySelectorAll('.ls-reg button').forEach(function(b){b.setAttribute('aria-pressed',String((b.dataset.r||null)===S.reg))});
    document.querySelectorAll('.ls-tabs [role=tab]').forEach(function(b){var on=b.dataset.tab===S.tab;b.setAttribute('aria-selected',String(on));b.tabIndex=on?0:-1});
    var q=$('#ls-q'); if(q) q.placeholder=S.tab==='cav'?'Buscar cidade ou OM (ex.: RCB, Esqd)':'Buscar cidade ou OM';
  }

  function renderKpis(vis){
    var k=$('#ls-kpis'); if(!k) return;
    var ufs={}, n=0; vis.forEach(function(g){ufs[g.uf]=1; n+= S.tab==='cav'?CAVG[g.s].length:g.om.length});
    var h;
    if(S.tab==='cav'){
      var rs=LS.cav.filter(function(c){return BYS[c.s].uf==='RS'}).length;
      h=kpi('OM de Cavalaria',n,S.reg?S.reg:'no Brasil')+kpi('Guarnições',vis.length,'com OM de Cavalaria')+kpi('Estados',Object.keys(ufs).length,'')+kpi('No Rio Grande do Sul',Math.round(100*rs/LS.cav.length)+'%','das OM do Brasil');
    } else {
      h=kpi('Guarnições',vis.length,S.reg?S.reg:'com ficha no Guia')+kpi('OM listadas',n,'nas fichas')+kpi('Estados',Object.keys(ufs).length,'')+kpi('Comandos',Object.keys(vis.reduce(function(a,g){a[g.c]=1;return a},{})).length,'militares de área');
    }
    k.innerHTML=h;
  }
  function kpi(a,v,s){return '<div class="fact"><div class="eyebrow">'+a+'</div><div class="v num">'+v+'</div><div class="s">'+esc(s)+'</div></div>'}

  function renderList(vis){
    var box=$('#ls-list'); if(!box) return;
    if(!vis.length){box.innerHTML='<p class="ls-vazio">Nada encontrado com esse filtro.</p>';return}
    var h='';
    if(S.tab==='cav'){
      vis.sort(function(a,b){return CAVG[b.s].length-CAVG[a.s].length||a.n.localeCompare(b.n)});
      h=vis.map(function(g){
        return '<li class="'+(S.sel===g.s?'on':'')+'"><button type="button" data-s="'+g.s+'"><b>'+esc(g.n)+'</b> <span class="uf">'+g.uf+'</span><span class="k num">'+CAVG[g.s].length+'</span></button><div class="chips">'+CAVG[g.s].map(function(c){return '<span class="tag">'+esc(c.om)+'</span>'}).join('')+'</div></li>';
      }).join('');
    } else {
      var by={}; vis.forEach(function(g){(by[g.c]=by[g.c]||[]).push(g)});
      ['CMA','CMN','CMNE','CMP','CML','CMSE','CMO','CMS'].forEach(function(c){
        if(!by[c]) return;
        h+='<li class="grp"><span class="eyebrow">'+c+' · '+CMDN[c]+'</span><span class="k num">'+by[c].length+'</span></li>';
        by[c].sort(function(a,b){return a.n.localeCompare(b.n)}).forEach(function(g){
          h+='<li class="'+(S.sel===g.s?'on':'')+'"><button type="button" data-s="'+g.s+'"><b>'+esc(g.n)+'</b> <span class="uf">'+g.uf+'</span><span class="k num">'+g.om.length+'</span></button></li>';
        });
      });
    }
    box.innerHTML='<ul>'+h+'</ul>';
  }

  function renderInfo(){
    var box=$('#ls-info'); if(!box) return;
    var g=S.sel&&BYS[S.sel];
    if(!g){
      box.innerHTML='<p class="ls-hint">'+(S.tab==='cav'?'Toque num ponto para ver as OM de Cavalaria da guarnição. O número no ponto é a quantidade de OM.':'Toque num ponto para ver as OM da guarnição e abrir a ficha da cidade.')+'</p>';
      return;
    }
    var oms = S.tab==='cav' ? CAVG[g.s]||[] : null;
    var h='<button type="button" class="ls-x" aria-label="Fechar">×</button><p class="eyebrow">'+g.c+' · '+CMDN[g.c]+' · '+g.r+'</p><h3>'+esc(g.n)+' <span>'+g.uf+'</span></h3>';
    if(oms){
      h+='<ul class="ls-oms">'+oms.map(function(c){return '<li><b>'+esc(c.om)+'</b>'+(c.d?' <span>'+esc(c.d)+'</span>':' <span>'+esc(LS.tipos[c.t].replace(/s de /,' de ').replace(/s$/,''))+'</span>')+'</li>'}).join('')+'</ul>';
      var outras=g.om.filter(function(o){return !oms.some(function(c){return o.indexOf(c.om.replace('Cmdo ',''))>=0})});
      if(outras.length) h+='<p class="ls-outras"><span class="eyebrow">Outras OM na guarnição</span> '+esc(outras.join(' · '))+'</p>';
    } else {
      h+='<ul class="ls-oms">'+g.om.map(function(o){return '<li><b>'+esc(o)+'</b></li>'}).join('')+'</ul>';
      if(g.ou) h+='<p class="ls-outras"><span class="eyebrow">Outras</span> '+esc(g.ou)+'</p>';
    }
    h+='<a class="btn" href="/'+g.s+'">Abrir a ficha de '+esc(g.n)+' →</a>';
    box.innerHTML=h;
    box.querySelector('.ls-x').onclick=function(){select(null)};
  }

  function select(s,fromMap){
    S.sel=(s&&S.sel===s&&fromMap)?null:s; render();
    if(S.sel){
      var li=document.querySelector('#ls-list button[data-s="'+S.sel+'"]');
      var box=$('#ls-list');
      if(li&&box){var t=li.offsetTop-box.offsetTop, h=li.offsetHeight; if(t<box.scrollTop||t+h>box.scrollTop+box.clientHeight) box.scrollTo({top:t-40,behavior:'smooth'})}
      if(!fromMap && innerWidth<860){var i=$('#ls-info'); if(i) i.scrollIntoView({block:'nearest',behavior:'smooth'})}
    }
  }

  /* ---- zoom por região ---- */
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  function targetVB(){
    if(!S.reg) return BASE;
    var pts=G.filter(function(g){return g.r===S.reg});
    var a=1e9,b=1e9,c=-1e9,d=-1e9;
    pts.forEach(function(g){a=Math.min(a,g.x);b=Math.min(b,g.y);c=Math.max(c,g.x);d=Math.max(d,g.y)});
    var w=c-a,h=d-b,pad=Math.max(w,h)*.12+25; a-=pad;b-=pad;w+=2*pad;h+=2*pad;
    var ar=svg.clientWidth/(svg.clientHeight||svg.clientWidth); /* mantém proporção do palco */
    if(w/h<ar){var nw=h*ar;a-=(nw-w)/2;w=nw}else{var nh=w/ar;b-=(nh-h)/2;h=nh}
    return [a,b,w,h];
  }
  function goVB(){
    var to=targetVB(), from=vb.slice(); if(anim) cancelAnimationFrame(anim);
    if(reduce){setVB(to);return}
    var t0=performance.now(), D=450;
    (function step(t){var p=Math.min(1,(t-t0)/D), e=1-Math.pow(1-p,3);
      setVB(from.map(function(v,i){return v+(to[i]-v)*e}));
      if(p<1) anim=requestAnimationFrame(step)})(t0);
  }

  /* ---- controles ---- */
  document.querySelectorAll('.ls-tabs [role=tab]').forEach(function(b){
    b.addEventListener('click',function(){ if(b.disabled) return; setTab(b.dataset.tab,true) });
  });
  $('.ls-tabs').addEventListener('keydown',function(e){
    if(e.key!=='ArrowRight'&&e.key!=='ArrowLeft') return;
    var tabs=[].slice.call(document.querySelectorAll('.ls-tabs [role=tab]:not([disabled])')), i=tabs.indexOf(document.activeElement);
    if(i<0) return; var n=tabs[(i+(e.key==='ArrowRight'?1:tabs.length-1))%tabs.length]; n.focus(); n.click();
  });
  function setTab(t,push){
    S.tab=t==='cav'?'cav':'geral'; if(S.sel && S.tab==='cav' && !CAVG[S.sel]) S.sel=null;
    render(); if(push) history.replaceState(null,'',S.tab==='cav'?'#cavalaria':location.pathname);
  }
  document.querySelectorAll('.ls-reg button').forEach(function(b){
    b.addEventListener('click',function(){S.reg=b.dataset.r||null; render(); goVB()});
  });
  var q=$('#ls-q'); if(q) q.addEventListener('input',function(){S.q=norm(q.value.trim()); render()});
  $('#ls-list').addEventListener('click',function(e){var b=e.target.closest('button[data-s]'); if(b) select(b.dataset.s)});
  addEventListener('resize',function(){sizeMarkers()},{passive:true});
  addEventListener('hashchange',function(){setTab(location.hash==='#cavalaria'?'cav':'geral')});

  setVB(BASE);
  setTab(location.hash==='#cavalaria'?'cav':'geral');
})();
