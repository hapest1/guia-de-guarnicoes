/* Calculadora de Ajuda de Custo do Guia de Guarnições.
   Situações e multiplicadores: Tabela de Ajuda de Custo da Lei nº 13.954/2019 (Anexo), valores a partir de 1º/1/2020.
   Soldos: window.CALC (calculadora-dados.js). A simulação fica guardada no link (?s=...&pg=...). */
(function(){
  var C=window.CALC; if(!C) return;
  var $=function(id){ return document.getElementById(id); };
  var F={pg:$('pg'),am:$('am'),hab:$('hab'),disp:$('disp'),gle:$('gle'),ats:$('ats'),perm:$('perm'),co:$('co'),copg:$('copg'),dep:$('dep')};
  var out=$('res'), sitBox=$('sits');
  if(!F.pg||!out||!sitBox) return;

  var POSTO={}; C.postos.forEach(function(p){ POSTO[p[0]]={id:p[0],nome:p[1],soldo:p[2],disp:p[4]}; });

  /* [id, letra, título, descrição, ida, volta] — multiplicadores da remuneração para quem tem dependente */
  var SIT=[
    ['transf','a','Transferência com desligamento','Movimentação com desligamento da OM (a transferência comum).',2,0],
    ['lea','d','Transferência para ou de Loc. Esp. Cat. A','Movimentação com desligamento da OM para Localidade Especial Categoria A, ou de uma Localidade Cat. A para qualquer outra.',4,0],
    ['com12','b','Curso/Estágio de 3 a 12 meses','Curso ou estágio superior a 3 e igual ou inferior a 12 meses, sem desligamento da OM.',2,1],
    ['com3','c','Curso/Estágio de 15 dias a 3 meses','Curso ou estágio superior a 15 dias e igual ou inferior a 3 meses, sem desligamento da OM.',1,1],
    ['inat','f','Transferência para a inatividade','Passagem para a reserva remunerada ou reforma, com ou sem dependente.',8,0]
  ];
  var S={}; SIT.forEach(function(s){ S[s[0]]=s; });

  /* Inatividade: remuneração calculada com o soldo do último posto do círculo do oficial; praça, com o soldo de Suboficial (Subtenente) */
  var BASE_INAT={'gen-ex':'gen-ex','gen-div':'gen-ex','gen-bda':'gen-ex','cel':'cel','tc':'cel','maj':'cel','cap':'cap','1ten':'1ten','2ten':'1ten'};
  function baseInat(id){ return BASE_INAT[id]||'st'; }

  function num(el){ var v=parseFloat(String(el.value).replace(',','.')); return isFinite(v)&&v>0?v:0; }
  function brl(v){ return v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'}); }
  function n0(v){ return v.toLocaleString('pt-BR',{maximumFractionDigits:1}); }
  function xm(v){ return '× '+String(v).replace('.',','); }

  /* Botões de situação */
  var sitAtual='transf';
  sitBox.innerHTML=SIT.map(function(s){
    return '<label class="ac-sit"><input type="radio" name="sit" value="'+s[0]+'"'+(s[0]===sitAtual?' checked':'')+'>'+
      '<span><b>'+s[2]+'</b><span class="calc-sub">'+s[3]+'</span><span class="ac-mult">Ida '+xm(s[4])+(s[5]?' · Volta '+xm(s[5]):'')+'</span></span></label>';
  }).join('');

  function remuneracao(posto, comBase){
    var p=comBase||posto, soldo=p.soldo, linhas=[['Soldo ('+p.nome+', '+C.ano+')',soldo]], rem=soldo;
    [['Adicional militar',num(F.am)],['Adicional de habilitação',num(F.hab)],['Disponibilidade militar',num(F.disp)],['Localidade especial',num(F.gle)],['Tempo de serviço',num(F.ats)],['Permanência',num(F.perm)]]
      .forEach(function(x){ if(x[1]){ var v=soldo*x[1]/100; rem+=v; linhas.push([x[0]+' ('+n0(x[1])+'%)',v]); } });
    if(num(F.co)){ var pb=POSTO[F.copg.value]||p, v=pb.soldo*num(F.co)/100; rem+=v; linhas.push(['Compensação orgânica ('+n0(num(F.co))+'% do soldo de '+pb.nome+')',v]); }
    return {rem:rem, linhas:linhas};
  }
  function valores(sid, p){
    var s=S[sid], inat=sid==='inat', fator=(inat||F.dep.checked)?1:0.5;
    var r=inat? remuneracao(p, POSTO[baseInat(p.id)]) : remuneracao(p);
    var ida=r.rem*s[4]*fator, volta=r.rem*s[5]*fator;
    return {r:r, ida:ida, volta:volta, total:ida+volta, mi:s[4]*fator, mv:s[5]*fator};
  }

  function calc(){
    sitAtual=(document.querySelector('input[name="sit"]:checked')||{}).value||'transf';
    var depWrap=$('depWrap'); if(depWrap) depWrap.hidden=sitAtual==='inat';
    salvaLink();
    var p=POSTO[F.pg.value];
    if(!p){ out.innerHTML='<p class="cmp-vazio">Escolha o posto ou graduação para ver o cálculo.</p>'; return; }
    var s=S[sitAtual], v=valores(sitAtual,p), inat=sitAtual==='inat';
    var h='<div class="calc-total"><span class="eyebrow">Ajuda de custo estimada</span><b class="num">'+brl(v.total)+'</b>';
    h+='<span class="calc-sub">'+s[2]+' · '+p.nome+(inat?'':(F.dep.checked?' · com dependentes':' · sem dependentes'))+'</span></div>';
    h+='<div class="calc-blocos">';
    h+='<div class="calc-bloco"><h3>Base de cálculo <span class="num">'+brl(v.r.rem)+'</span></h3><table><tbody>';
    v.r.linhas.forEach(function(l){ h+='<tr><td>'+l[0]+'</td><td class="num">'+brl(l[1])+'</td></tr>'; });
    h+='<tr class="calc-sub-t"><td>Remuneração de referência</td><td class="num">'+brl(v.r.rem)+'</td></tr></tbody></table>';
    if(inat){ var b=POSTO[baseInat(p.id)]; h+='<p class="calc-sub">Na inatividade, a remuneração é calculada com o soldo de '+b.nome+' ('+(BASE_INAT[p.id]?'último posto do seu círculo hierárquico':'soldo de Suboficial/Subtenente, para todas as praças')+').</p>'; }
    h+='</div>';
    h+='<div class="calc-bloco"><h3>Valores a receber <span class="num">'+brl(v.total)+'</span></h3><table><tbody>';
    h+='<tr><td>Ida ('+xm(v.mi)+')</td><td class="num">'+brl(v.ida)+'</td></tr>';
    h+='<tr><td>Volta ('+xm(v.mv)+')</td><td class="num">'+brl(v.volta)+'</td></tr>';
    h+='<tr class="calc-sub-t"><td>Total</td><td class="num">'+brl(v.total)+'</td></tr></tbody></table>';
    if(!inat&&!F.dep.checked) h+='<p class="calc-sub">Sem dependente, o militar recebe metade dos valores (situação “e” da tabela).</p>';
    h+='</div></div>';

    /* Quadro com todas as situações para o mesmo militar */
    h+='<div class="calc-bloco ac-todas"><h3>Em cada situação</h3><table><tbody>';
    SIT.forEach(function(x){ var y=valores(x[0],p); h+='<tr'+(x[0]===sitAtual?' class="calc-sub-t"':'')+'><td>'+x[2]+'<span class="calc-sub"> · ida '+xm(y.mi)+(y.mv?', volta '+xm(y.mv):'')+'</span></td><td class="num">'+brl(y.total)+'</td></tr>'; });
    h+='</tbody></table></div>';

    h+='<div class="calc-acoes"><button type="button" class="btn" id="copiar">Copiar link da simulação</button><button type="button" class="btn sec" id="imprimir">Imprimir</button><a class="btn sec" href="/calculadora-de-transferencia">Calcular a transferência completa</a></div>';
    out.innerHTML=h;
    $('copiar').addEventListener('click',function(){ var b=this; try{ navigator.clipboard.writeText(location.href).then(function(){ b.textContent='Link copiado'; setTimeout(function(){ b.textContent='Copiar link da simulação'; },1800); }); }catch(e){} });
    $('imprimir').addEventListener('click',function(){ print(); });
  }

  function aplicaPosto(){ var p=POSTO[F.pg.value]; if(p) F.disp.value=p.disp; }

  var CHAVES=['pg','am','hab','disp','gle','ats','perm','co','copg'];
  function salvaLink(){
    var q=[], pp=POSTO[F.pg.value]||{};
    if(sitAtual!=='transf') q.push('s='+sitAtual);
    CHAVES.forEach(function(k){ var v=F[k].value; if(v===''||v==null||v==='0') return; if(k==='disp'&&+v===pp.disp) return; q.push(k+'='+encodeURIComponent(v)); });
    if(!F.dep.checked) q.push('sd=1');
    try{ history.replaceState(null,'',location.pathname+(q.length?'?'+q.join('&'):'')); }catch(e){}
  }
  function leLink(){
    var p=new URLSearchParams(location.search);
    if(p.get('pg')&&POSTO[p.get('pg')]){ F.pg.value=p.get('pg'); aplicaPosto(); }
    CHAVES.forEach(function(k){ var v=p.get(k); if(v!=null&&k!=='pg') F[k].value=v; });
    if(p.get('sd')) F.dep.checked=false;
    var s=p.get('s'); if(s&&S[s]){ var r=document.querySelector('input[name="sit"][value="'+s+'"]'); if(r) r.checked=true; }
  }

  leLink();
  if(!F.pg.value){ F.pg.value='1ten'; aplicaPosto(); }
  else if(!F.disp.value) aplicaPosto();
  F.pg.addEventListener('change',function(){ aplicaPosto(); calc(); });
  ['am','hab','disp','gle','ats','perm','co','copg','dep'].forEach(function(k){ F[k].addEventListener(F[k].tagName==='SELECT'||F[k].type==='checkbox'?'change':'input',calc); });
  sitBox.addEventListener('change',function(){ calc(); if(window.gtag){ try{ gtag('event','calc_ajuda_custo',{situacao:sitAtual}); }catch(e){} } });
  calc();
})();
