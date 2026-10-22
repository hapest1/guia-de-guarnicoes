(function(){
  var el=document.getElementById('visitas'), wrap=document.getElementById('visitas-wrap'); if(!el) return;
  var visto=false; try{ visto=sessionStorage.getItem('gg_visita')==='1'; }catch(e){}
  fetch('https://abacus.jasoncameron.dev/'+(visto?'get':'hit')+'/guiadeguarnicoes-com/visitas')
    .then(function(r){return r.json();})
    .then(function(d){ if(d && typeof d.value==='number'){ el.textContent=d.value.toLocaleString('pt-BR'); wrap.hidden=false; try{sessionStorage.setItem('gg_visita','1');}catch(e){} } })
    .catch(function(){});
})();
