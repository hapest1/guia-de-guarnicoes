/* Formulário "Contribua com o Guia": vivências e sugestões, enviadas por e-mail via FormSubmit. */
(function(){
  var form=document.getElementById('ctbForm'); if(!form) return;
  var DEST='https://formsubmit.co/ajax/guiadeguarnicoes@gmail.com';
  var $=function(s){return form.querySelector(s)};
  var params=new URLSearchParams(location.search);

  /* guarnições no select, agrupadas por Comando */
  var sel=$('#ctb-g'), CMP=window.CMP||[];
  if(sel && CMP.length){
    var by={}, nomes={};
    CMP.forEach(function(g){(by[g.cmd]=by[g.cmd]||[]).push(g); nomes[g.cmd]=g.cmdN});
    ['CMA','CMAO','CMNE','CMP','CML','CMSE','CMO','CMS'].forEach(function(c){
      if(!by[c]) return;
      var og=document.createElement('optgroup'); og.label=c+' · '+nomes[c];
      by[c].sort(function(a,b){return a.c.localeCompare(b.c)}).forEach(function(g){
        var o=document.createElement('option'); o.value=g.c+'-'+g.uf; o.textContent=g.c+'-'+g.uf; o.dataset.s=g.s; og.appendChild(o);
      });
      sel.appendChild(og);
    });
    var outra=document.createElement('option'); outra.value='Outra (não está na lista)'; outra.textContent='Outra guarnição'; outra.dataset.extra='1'; outra.dataset.buscaTxt='Outra — não está na lista'; sel.appendChild(outra);
    var pre=params.get('g');
    if(pre){var op=sel.querySelector('option[data-s="'+pre+'"]'); if(op) op.selected=true}
  }
  /* busca digitável no lugar da lista de 171 cidades */
  var busca=sel&&window.buscaGuarnicao?window.buscaGuarnicao(sel):null;
  if(busca) busca.sync();
  var outraBox=$('#ctb-outra');
  function verOutra(){
    if(!outraBox) return; var on=sel&&sel.value==='Outra (não está na lista)';
    outraBox.hidden=!on; var i=outraBox.querySelector('input'); i.disabled=!on; i.required=on;
    if(on) i.focus();
  }
  if(sel) sel.addEventListener('change',verOutra);

  /* modo: vivência ou sugestão */
  var modos=[].slice.call(form.querySelectorAll('input[name="modo"]'));
  function setModo(m){
    form.dataset.modo=m;
    if(busca) busca.required=(m==='vivencia'); else if(sel) sel.required=(m==='vivencia');
    modos.forEach(function(r){r.checked=r.value===m});
    form.querySelectorAll('[data-so]').forEach(function(el){
      var on=el.dataset.so===m; el.hidden=!on;
      el.querySelectorAll('input,textarea,select').forEach(function(i){i.disabled=!on});
    });
  }
  modos.forEach(function(r){r.addEventListener('change',function(){setModo(r.value)})});
  var tipo=params.get('tipo');
  setModo(tipo==='correcao'||tipo==='sugestao'||location.hash==='#sugestao'?'sugestao':'vivencia');
  if(tipo==='correcao'){var t=$('#ctb-tipo'); if(t) t.value='Correção de dado de uma ficha'}

  /* envio */
  var status=document.getElementById('ctb-status'), btn=$('button[type=submit]');
  form.addEventListener('submit',function(e){
    e.preventDefault();
    if($('input[name="_honey"]').value) return;
    if(!form.reportValidity()) return;
    var fd=new FormData(form), data={}, modo=form.dataset.modo;
    fd.forEach(function(v,k){ if(String(v).trim()!=='') data[k]=v });
    if(data['Guarnição (outra)']){ data['Guarnição']='Outra: '+data['Guarnição (outra)']; delete data['Guarnição (outra)']; }
    var g=data['Guarnição']||'sem guarnição';
    data._subject=(modo==='vivencia'?'[Guia] Vivência — ':'[Guia] Sugestão — ')+g;
    data._template='table';
    if(data['E-mail']) data._replyto=data['E-mail'];
    delete data.modo; delete data._next; data['Tipo de contribuição']=modo==='vivencia'?'Vivência':'Sugestão / correção';
    var ref=document.referrer, orig='';
    try{ var u=new URL(ref); orig=u.host===location.host?(u.pathname||'/'):u.host+u.pathname; }catch(err){}
    var utm=params.get('utm_source')||(function(){try{return new URL(ref).searchParams.get('utm_source')}catch(err){return null}})();
    data['Veio da página']=orig||'acesso direto';
    if(utm) data['Origem (campanha)']=utm;
    btn.disabled=true; status.className='ctb-status'; status.textContent='Enviando…';
    fetch(DEST,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(data)})
      .then(function(r){return r.json().then(function(j){return {ok:r.ok,j:j}})})
      .then(function(res){
        if(!res.ok || String(res.j.success)==='false') throw new Error(res.j.message||'falha');
        form.hidden=true;
        var ok=document.getElementById('ctb-ok'); ok.hidden=false; ok.focus();
        if(window.gtag) gtag('event','contribuicao',{tipo:modo});
      })
      .catch(function(){
        btn.disabled=false; status.className='ctb-status erro';
        status.innerHTML='Não foi possível enviar agora. Tente de novo em alguns minutos ou escreva para <a href="mailto:guiadeguarnicoes@gmail.com">guiadeguarnicoes@gmail.com</a>.';
      });
  });
})();
