/* Campo digitável para escolher guarnição. Transforma um <select data-busca> em busca com sugestões
   (cidade, UF, estado, Comando ou OM), sem acento e sem diferenciar maiúsculas.
   O <select> continua no formulário, escondido, e recebe o valor escolhido (dispara "change"). */
(function(){
  var D=window.CMP||[], por={};
  D.forEach(function(g){ por[g.s]=g; });
  function norm(s){ return String(s||'').normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().replace(/[º°ª]/g,'').replace(/[^a-z0-9]+/g,' ').trim(); }
  function esc(s){ return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];}); }
  var IDX=D.map(function(g){
    return {g:g, nome:norm(g.c), uf:norm(g.uf), resto:norm([g.e,g.cmd,g.cmdN,g.r].join(' ')), om:(g.om||[]).map(function(o){return {t:o,n:norm(o)};})};
  });
  function buscar(q){
    var n=norm(q); if(!n) return [];
    var termos=n.split(' '), res=[];
    IDX.forEach(function(it){
      var pont=0, omHit=null, tudo=it.nome+' '+it.uf+' '+it.resto;
      if(it.nome.indexOf(n)===0) pont=100;
      else if((it.nome+' '+it.uf).indexOf(n)===0) pont=95;
      else if((' '+it.nome).indexOf(' '+n)>-1) pont=80;
      else if(termos.every(function(t){return tudo.indexOf(t)>-1;})) pont=60;
      if(!pont || pont<80){
        for(var i=0;i<it.om.length;i++){
          var on=it.om[i].n;
          if(termos.every(function(t){return on.indexOf(t)>-1;})){ omHit=it.om[i].t; pont=Math.max(pont,70); break; }
        }
      }
      if(pont) res.push({g:it.g,p:pont,om:omHit});
    });
    res.sort(function(a,b){ return b.p-a.p || a.g.c.localeCompare(b.g.c); });
    return res.slice(0,8);
  }
  var seq=0;
  function montar(sel){
    if(sel._busca) return sel._busca;
    var id='bg'+(++seq), extra=sel.getAttribute('data-busca-extra');
    var box=document.createElement('div'); box.className='bg';
    box.innerHTML='<div class="bg-campo"><input type="text" class="bg-in" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="'+id+'" autocomplete="off" autocapitalize="off" spellcheck="false" enterkeyhint="search">'
      +'<button type="button" class="bg-limpa" aria-label="Limpar" hidden>×</button></div><ul class="bg-lista" id="'+id+'" role="listbox" hidden></ul>';
    sel.parentNode.insertBefore(box,sel.nextSibling);
    sel.hidden=true; sel.tabIndex=-1; sel.setAttribute('aria-hidden','true');
    var inp=box.querySelector('.bg-in'), lst=box.querySelector('.bg-lista'), limpa=box.querySelector('.bg-limpa');
    inp.placeholder=sel.getAttribute('data-busca-ph')||'Digite a cidade, o estado ou a OM';
    inp.id=id+'-in';
    var lbl=sel.getAttribute('aria-label'); if(lbl) inp.setAttribute('aria-label',lbl);
    var wrapLabel=sel.closest('label'); if(wrapLabel && !lbl){ var sp=wrapLabel.querySelector('span'); if(sp) inp.setAttribute('aria-label',sp.textContent.replace(/\s+/g,' ').trim()); }
    if(wrapLabel) wrapLabel.htmlFor=inp.id;
    if(sel.required){ sel.required=false; inp.required=true; }
    var itens=[], ativo=-1;
    function optDe(slug){
      return sel.querySelector('option[value="'+slug+'"]')||sel.querySelector('option[data-s="'+slug+'"]');
    }
    function slugDoSelect(){
      var o=sel.options[sel.selectedIndex]; if(!o||!o.value) return '';
      return o.getAttribute('data-s')||o.value;
    }
    function textoDe(slug){ var g=por[slug]; if(g) return g.c+'-'+g.uf; var o=optDe(slug); return o?o.textContent:''; }
    function validar(){
      if(inp.value.trim() && !sel.value) inp.setCustomValidity('Escolha uma opção da lista de sugestões.');
      else inp.setCustomValidity('');
    }
    function fechar(){ lst.hidden=true; inp.setAttribute('aria-expanded','false'); inp.removeAttribute('aria-activedescendant'); ativo=-1; }
    function marcar(i){
      ativo=i;
      var ops=lst.querySelectorAll('li[role=option]');
      [].forEach.call(ops,function(li,k){ li.setAttribute('aria-selected',k===i?'true':'false'); });
      if(i>-1){ inp.setAttribute('aria-activedescendant',id+'-'+i); var li=ops[i]; if(li&&li.scrollIntoView) li.scrollIntoView({block:'nearest'}); }
    }
    function escolher(slug){
      var o=optDe(slug); if(!o) return;
      sel.value=o.value; inp.value=o.getAttribute('data-busca-txt')||textoDe(slug);
      limpa.hidden=false; validar(); fechar();
      sel.dispatchEvent(new Event('change',{bubbles:true}));
    }
    function abrir(){
      var q=inp.value; itens=buscar(q);
      var h=itens.map(function(r,i){
        var g=r.g, sub=r.om?esc(r.om)+' · '+esc(g.cmd):esc(g.e)+' · '+esc(g.cmd);
        return '<li id="'+id+'-'+i+'" role="option" data-s="'+esc(g.s)+'"><b>'+esc(g.c)+'<span>-'+esc(g.uf)+'</span></b><small>'+sub+'</small></li>';
      }).join('');
      if(q.trim() && !itens.length) h+='<li class="bg-vazio" aria-disabled="true">Nenhuma guarnição encontrada</li>';
      if(extra && q.trim()){ itens.push({extra:1}); h+='<li id="'+id+'-'+(itens.length-1)+'" role="option" class="bg-extra" data-extra="1">'+esc(extra)+'</li>'; }
      lst.innerHTML=h;
      var tem=!!h; lst.hidden=!tem; inp.setAttribute('aria-expanded',tem?'true':'false');
      marcar(itens.length&&!itens[0].extra?0:-1);
    }
    function escolherItem(i){
      var it=itens[i]; if(!it) return;
      if(it.extra){ var o=sel.querySelector('option[data-extra]'); if(o){ sel.value=o.value; inp.value=o.getAttribute('data-busca-txt')||o.textContent; limpa.hidden=false; validar(); fechar(); sel.dispatchEvent(new Event('change',{bubbles:true})); } return; }
      escolher(it.g.s);
    }
    inp.addEventListener('input',function(){
      if(sel.value){ sel.value=''; sel.dispatchEvent(new Event('change',{bubbles:true})); }
      limpa.hidden=!inp.value; inp.setCustomValidity(''); abrir();
    });
    inp.addEventListener('focus',function(){ if(inp.value && !sel.value) abrir(); });
    inp.addEventListener('keydown',function(e){
      if(e.key==='ArrowDown'){ e.preventDefault(); if(lst.hidden) abrir(); else marcar(Math.min(ativo+1,itens.length-1)); }
      else if(e.key==='ArrowUp'){ e.preventDefault(); marcar(Math.max(ativo-1,0)); }
      else if(e.key==='Enter'){ if(!lst.hidden && ativo>-1){ e.preventDefault(); escolherItem(ativo); } }
      else if(e.key==='Escape'){ fechar(); }
    });
    lst.addEventListener('mousedown',function(e){ e.preventDefault(); });
    lst.addEventListener('click',function(e){
      var li=e.target.closest('li[role=option]'); if(!li) return;
      escolherItem([].indexOf.call(lst.querySelectorAll('li[role=option]'),li));
    });
    inp.addEventListener('blur',function(){ setTimeout(function(){ fechar(); validar(); },120); });
    limpa.addEventListener('click',function(){
      inp.value=''; limpa.hidden=true; inp.setCustomValidity('');
      if(sel.value){ sel.value=''; sel.dispatchEvent(new Event('change',{bubbles:true})); }
      fechar(); inp.focus();
    });
    var api={
      input:inp,
      sync:function(){ var s=slugDoSelect(), o=sel.options[sel.selectedIndex]; inp.value=s?(o.getAttribute('data-busca-txt')||textoDe(s)):''; limpa.hidden=!inp.value; validar(); },
      set required(v){ inp.required=!!v; }, get required(){ return inp.required; },
      set disabled(v){ inp.disabled=!!v; limpa.disabled=!!v; }
    };
    sel._busca=api; api.sync();
    return api;
  }
  window.buscaGuarnicao=montar;
  function iniciar(){ [].forEach.call(document.querySelectorAll('select[data-busca]'),montar); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',iniciar); else iniciar();
})();
