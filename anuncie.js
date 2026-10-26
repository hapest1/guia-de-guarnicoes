/* Formulário "Anuncie no Guia": envia o pedido de contato por e-mail via FormSubmit. */
(function(){
  var form=document.getElementById('adForm'); if(!form) return;
  var DEST='https://formsubmit.co/ajax/guiadeguarnicoes@gmail.com';
  var status=document.getElementById('ad-status'), btn=form.querySelector('button[type=submit]');

  /* cidade sugerida pelas guarnições do Guia (lista de apoio, a pessoa pode digitar outra) */
  var dl=document.getElementById('ad-cidades'), CMP=window.CMP||[];
  if(dl) CMP.slice().sort(function(a,b){return a.c.localeCompare(b.c)}).forEach(function(g){
    var o=document.createElement('option'); o.value=g.c+'-'+g.uf; dl.appendChild(o);
  });

  form.addEventListener('submit',function(e){
    e.preventDefault();
    if(form.querySelector('input[name="_honey"]').value) return;
    if(!form.reportValidity()) return;
    var fd=new FormData(form), data={}, formatos=[];
    fd.forEach(function(v,k){
      if(k==='Formato'){formatos.push(v);return}
      if(String(v).trim()!=='') data[k]=v;
    });
    if(formatos.length) data['Formatos de interesse']=formatos.join(', ');
    delete data._next;
    data._subject='[Guia] Anúncio — '+(data['Empresa']||'sem nome')+(data['Cidade']?' ('+data['Cidade']+')':'');
    data._template='table';
    if(data['E-mail']) data._replyto=data['E-mail'];
    btn.disabled=true; status.className='ctb-status'; status.textContent='Enviando…';
    fetch(DEST,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(data)})
      .then(function(r){return r.json().then(function(j){return {ok:r.ok,j:j}})})
      .then(function(res){
        if(!res.ok || String(res.j.success)==='false') throw new Error('falha');
        form.hidden=true; var ok=document.getElementById('ad-ok'); ok.hidden=false; ok.focus();
        if(window.gtag) gtag('event','pedido_anuncio');
      })
      .catch(function(){
        btn.disabled=false; status.className='ctb-status erro';
        status.innerHTML='Não foi possível enviar agora. Tente de novo em alguns minutos ou escreva para <a href="mailto:guiadeguarnicoes@gmail.com">guiadeguarnicoes@gmail.com</a>.';
      });
  });
})();
