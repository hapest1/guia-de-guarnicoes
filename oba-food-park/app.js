/* OBA FOOD PARK — interações */
(function () {
  "use strict";
  var D = window.OBA;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------------- textos PT / ES ---------------- */
  var ES = {
    "pular": "Ir a los locales",
    "nav.lojas": "Locales", "nav.roleta": "Ruleta", "nav.turma": "Grupos", "nav.chegar": "Cómo llegar", "nav.parceiro": "Sumate",
    "hero.t1": "Muchos sabores,", "hero.t2": "un solo destino.",
    "hero.lead": "El primer food park de Uruguaiana. Pizza, pastas, papas, açaí, helado y lo que se te antoje, todo en el mismo lugar y al aire libre.",
    "hero.cta1": "Ver los locales", "hero.cta2": "Cómo llegar",
    "fato.dias": "Mar a Dom", "fato.panvel": "al lado de Panvel", "fato.lojas": "locales y contando",
    "lojas.sobre": "Quiénes están en el parque", "lojas.t": "Elegí tu contenedor.",
    "lojas.lead": "Cada local es independiente: pedís en todos los que quieras y te sentás donde prefieras. Ideal para el grupo que nunca se pone de acuerdo.",
    "roleta.sobre": "¿No sabés qué comer?", "roleta.t": "Que decida la ruleta.",
    "roleta.lead": "Girala y confiá. Si no te gusta el resultado, nadie se entera: girala otra vez.",
    "roleta.vontade": "Hoy quiero:", "roleta.qualquer": "lo que sea", "roleta.salgado": "salado", "roleta.doce": "dulce",
    "roleta.girar": "Girar la ruleta",
    "turma.sobre": "Cumpleaños, after office, juntada", "turma.t": "¿Venís con un grupo? Avisanos.",
    "turma.lead": "Mesa grande, cumpleaños, cena de la empresa. Completá acá y el mensaje sale listo para el WhatsApp del parque.",
    "turma.b1": "Espacio al aire libre con mesas compartidas", "turma.b2": "Cada uno pide lo que quiere, sin menú único", "turma.b3": "Martes a domingo, de 18 a 24 h",
    "f.nome": "Tu nombre", "f.data": "Día", "f.hora": "Hora", "f.pessoas": "Cuántas personas", "f.ocasiao": "Ocasión",
    "o.aniv": "Cumpleaños", "o.happy": "After office / empresa", "o.turma": "Juntada de amigos", "o.outro": "Otro",
    "f.enviar": "Enviar por WhatsApp", "f.marca": "Nombre de la marca", "f.tipo": "Qué vendés", "f.tipo.ph": "Ej.: hamburguesa, empanadas, cerveza…", "f.ig": "Instagram (opcional)",
    "hist.sobre": "Del papel a la Presidente Vargas", "hist.t": "Cómo nació el OBA.",
    "hist.d1": "Agosto 2026", "hist.h1": "La idea tiene dirección", "hist.p1": "El equipo de Oba Pizzas anuncia un nuevo espacio de gastronomía y ocio en Uruguaiana.",
    "hist.d2": "Septiembre 2026", "hist.h2": "Llegan los contenedores", "hist.p2": "Los primeros contenedores llegan al terreno y el parque empieza a tomar forma.",
    "hist.d3": "Octubre 2026", "hist.h3": "Locales confirmados", "hist.p3": "Pastas, papas, açaí, helado y pochoclo se suman a la pizza. Se anuncia la fecha de apertura.",
    "hist.h4": "¡Inauguración!", "hist.p4": "Desde las 20 h, puertas abiertas y el parque lleno. Gracias a todos los que vinieron.",
    "ch.sobre": "Cómo llegar", "ch.t": "Presidente Vargas, al lado de Panvel.",
    "ch.lead": "Sobre la avenida principal de Uruguaiana. Fácil de encontrar: buscá las luces y los contenedores de colores.",
    "ch.copiar": "Copiar dirección",
    "p.sobre": "Para emprendedores", "p.t": "Tu marca en un contenedor del OBA.",
    "p.lead": "¿Tenés un local, un food truck o una receta que todos piden? El parque está creciendo. Contanos qué hacés.",
    "p.b1": "Público de martes a domingo, de noche", "p.b2": "Estructura lista y difusión en conjunto", "p.b3": "Al lado de marcas que ya son conocidas en la ciudad",
    "rod.nota": "Horarios y locales pueden cambiar en feriados y eventos. Ante la duda, mirá el Instagram."
  };
  var UI = {
    pt: {
      dias: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
      fechado: "Fechado", hoje: "hoje",
      abertoAgora: "<b>Aberto agora</b> · até a meia-noite",
      fechaEm: function (m) { return "<b>Aberto agora</b> · fecha em " + m + " min"; },
      abreHoje: function (h) { return "<b>Abre hoje</b> às " + h + "h"; },
      abreEm: function (m) { return "<b>Abre em " + m + " min</b> · às 18h"; },
      abreDia: function (d, h) { return "Fechado agora · <b>abre " + d + " às " + h + "h</b>"; },
      amanha: "amanhã",
      loja: "Loja", ig: "Ver no Instagram", semIg: "Procure no parque",
      vagaT: "Seu contêiner aqui", vagaP: "O parque está crescendo. Quer ser o próximo?",
      parceiros: "Parceiros:",
      resPre: "Hoje é dia de", resGo: "Ver no Instagram →", girando: "Girando…",
      copiado: "Endereço copiado!", erro: "Preencha os campos destacados.",
      zapGeral: "Olá! Vim pelo site do OBA Food Park e queria uma informação.",
      msgTurma: function (v) {
        return "Olá! Vim pelo site do OBA Food Park.\n\nQueria avisar que vou levar uma turma:\n• Nome: " + v.nome +
          "\n• Dia: " + v.data + " às " + v.hora + "\n• Pessoas: " + v.pessoas + "\n• Ocasião: " + v.ocasiao +
          "\n\nTem como deixar umas mesas juntas pra gente?";
      },
      msgParceiro: function (v) {
        return "Olá! Vim pelo site do OBA Food Park e tenho interesse em ter um espaço no parque.\n\n• Nome: " + v.nome +
          "\n• Marca: " + v.marca + "\n• O que vendo: " + v.tipo + (v.ig ? "\n• Instagram: " + v.ig : "");
      }
    },
    es: {
      dias: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
      fechado: "Cerrado", hoje: "hoy",
      abertoAgora: "<b>Abierto ahora</b> · hasta la medianoche",
      fechaEm: function (m) { return "<b>Abierto ahora</b> · cierra en " + m + " min"; },
      abreHoje: function (h) { return "<b>Abre hoy</b> a las " + h + " h"; },
      abreEm: function (m) { return "<b>Abre en " + m + " min</b> · a las 18 h"; },
      abreDia: function (d, h) { return "Cerrado ahora · <b>abre el " + d.toLowerCase() + " a las " + h + " h</b>"; },
      amanha: "mañana",
      loja: "Local", ig: "Ver en Instagram", semIg: "Buscalo en el parque",
      vagaT: "Tu contenedor acá", vagaP: "El parque está creciendo. ¿Querés ser el próximo?",
      parceiros: "Socios:",
      resPre: "Hoy toca", resGo: "Ver en Instagram →", girando: "Girando…",
      copiado: "¡Dirección copiada!", erro: "Completá los campos marcados.",
      zapGeral: "¡Hola! Vengo de la web del OBA Food Park y quería hacer una consulta.",
      msgTurma: function (v) {
        return "¡Hola! Vengo de la web del OBA Food Park.\n\nQuería avisar que voy con un grupo:\n• Nombre: " + v.nome +
          "\n• Día: " + v.data + " a las " + v.hora + "\n• Personas: " + v.pessoas + "\n• Ocasión: " + v.ocasiao +
          "\n\n¿Se pueden juntar algunas mesas para nosotros?";
      },
      msgParceiro: function (v) {
        return "¡Hola! Vengo de la web del OBA Food Park y me interesa tener un espacio en el parque.\n\n• Nombre: " + v.nome +
          "\n• Marca: " + v.marca + "\n• Qué vendo: " + v.tipo + (v.ig ? "\n• Instagram: " + v.ig : "");
      }
    }
  };

  var PT = {};
  $$("[data-i18n]").forEach(function (el) { PT[el.getAttribute("data-i18n")] = el.textContent; });
  $$("[data-i18n-ph]").forEach(function (el) { PT[el.getAttribute("data-i18n-ph")] = el.placeholder; });

  var lang = "pt";
  try { lang = localStorage.getItem("oba-lang") || ""; } catch (e) { lang = ""; }
  if (lang !== "pt" && lang !== "es") lang = /^es/i.test(navigator.language || "") ? "es" : "pt";

  function t() { return UI[lang]; }
  function zap(msg) { return "https://wa.me/" + D.whatsapp + "?text=" + encodeURIComponent(msg); }

  function aplicarIdioma() {
    var dic = lang === "es" ? ES : PT;
    document.documentElement.lang = lang === "es" ? "es" : "pt-BR";
    $$("[data-i18n]").forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      if (dic[k] != null) el.textContent = dic[k];
    });
    $$("[data-i18n-ph]").forEach(function (el) {
      var k = el.getAttribute("data-i18n-ph");
      if (dic[k] != null) el.placeholder = dic[k];
    });
    $$(".idioma button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.lang === lang)); });
    $("#zapFlutuante").href = zap(t().zapGeral);
    $("#rodapeZap").href = zap(t().zapGeral);
    montarFiltros();
    montarLojas();
    montarParceiros();
    montarHorarios();
    atualizarStatus();
    if (ultimoSorteio) mostrarResultado(ultimoSorteio, false);
  }

  $$(".idioma button").forEach(function (b) {
    b.addEventListener("click", function () {
      lang = b.dataset.lang;
      try { localStorage.setItem("oba-lang", lang); } catch (e) {}
      aplicarIdioma();
    });
  });

  /* ---------------- horário / status ---------------- */
  function agoraNoParque() {
    var partes = new Intl.DateTimeFormat("en-US", {
      timeZone: D.fuso, weekday: "short", hour: "numeric", minute: "numeric", hour12: false
    }).formatToParts(new Date());
    var o = {};
    partes.forEach(function (p) { o[p.type] = p.value; });
    var dias = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    var h = parseInt(o.hour, 10) % 24;
    return { dia: dias[o.weekday], min: h * 60 + parseInt(o.minute, 10) };
  }

  function atualizarStatus() {
    var el = $("#status"), txt = $(".status-txt", el), a = agoraNoParque(), u = t();
    var hoje = D.horarios[a.dia];
    el.classList.remove("aberto", "breve");
    if (hoje && a.min >= hoje.abre * 60 && a.min < hoje.fecha * 60) {
      var falta = hoje.fecha * 60 - a.min;
      el.classList.add("aberto");
      txt.innerHTML = falta <= 60 ? u.fechaEm(falta) : u.abertoAgora;
      return;
    }
    if (hoje && a.min < hoje.abre * 60) {
      var ate = hoje.abre * 60 - a.min;
      el.classList.add("breve");
      txt.innerHTML = ate <= 90 ? u.abreEm(ate) : u.abreHoje(hoje.abre);
      return;
    }
    for (var i = 1; i <= 7; i++) {
      var d = (a.dia + i) % 7, h = D.horarios[d];
      if (h) { txt.innerHTML = u.abreDia(i === 1 ? u.amanha : u.dias[d], h.abre); return; }
    }
  }

  function montarHorarios() {
    var u = t(), hoje = agoraNoParque().dia, ordem = [2, 3, 4, 5, 6, 0, 1];
    $("#tabHorarios").innerHTML = ordem.map(function (d) {
      var h = D.horarios[d];
      var cls = (d === hoje ? "hoje " : "") + (h ? "" : "fechado");
      var faixa = h ? h.abre + "h – " + (h.fecha === 24 ? "00h" : h.fecha + "h") : u.fechado;
      return '<tr class="' + cls + '"><td data-hoje="' + u.hoje + '">' + u.dias[d] + "</td><td>" + faixa + "</td></tr>";
    }).join("");
  }

  /* ---------------- lojas ---------------- */
  var filtro = "todos";
  function montarFiltros() {
    $("#filtros").innerHTML = D.categorias.map(function (c) {
      return '<button type="button" class="chip" data-cat="' + c.id + '" aria-pressed="' + (c.id === filtro) + '">' + c[lang] + "</button>";
    }).join("");
    $$("#filtros .chip").forEach(function (b) {
      b.addEventListener("click", function () { filtro = b.dataset.cat; montarFiltros(); montarLojas(); });
    });
  }

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  function montarLojas() {
    var u = t();
    var lista = D.lojas.filter(function (l) { return filtro === "todos" || l.cats.indexOf(filtro) > -1; });
    var html = lista.map(function (l, i) {
      var num = D.lojas.indexOf(l) + 1;
      var ig = l.ig
        ? '<a class="loja-ig" href="https://www.instagram.com/' + esc(l.ig) + '/" target="_blank" rel="noopener">@' + esc(l.ig) + " ↗</a>"
        : '<span class="loja-ig" style="color:var(--tinta-2)">' + u.semIg + "</span>";
      return '<article class="loja" style="--cor:' + l.cor + ";animation-delay:" + (i * 60) + 'ms">' +
        '<div class="loja-topo"><span class="loja-num">' + u.loja.toUpperCase() + " " + String(num).padStart(2, "0") + '</span><span class="loja-emoji" aria-hidden="true">' + l.emoji + "</span></div>" +
        '<div class="loja-corpo"><span class="loja-tipo">' + esc(l[lang].tipo) + "</span><h3>" + esc(l.nome) + '</h3><p class="loja-desc">' + esc(l[lang].desc) + "</p>" + ig + "</div></article>";
    }).join("");
    html += '<a class="loja loja-vaga" href="#parceiro"><span class="mais">+</span><b>' + u.vagaT + "</b><span>" + u.vagaP + "</span></a>";
    $("#gradeLojas").innerHTML = html;
    $("#qtdLojas").textContent = D.lojas.length;
  }

  function montarParceiros() {
    var u = t();
    $("#parceiros").innerHTML = u.parceiros + " " + D.parceiros.map(function (p) {
      return '<a href="https://www.instagram.com/' + esc(p.ig) + '/" target="_blank" rel="noopener">' + esc(p.nome) + "</a> (" + esc(p[lang]) + ")";
    }).join(", ") + ".";
  }

  /* ---------------- roleta ---------------- */
  var roda = $("#roda"), giro = 0, girando = false, ultimoSorteio = null;
  var N = D.lojas.length, passo = 360 / N;
  (function desenharRoda() {
    var r = 100, html = "";
    D.lojas.forEach(function (l, i) {
      var a0 = (i * passo - 90 - passo / 2) * Math.PI / 180, a1 = ((i + 1) * passo - 90 - passo / 2) * Math.PI / 180;
      var x0 = r * Math.cos(a0), y0 = r * Math.sin(a0), x1 = r * Math.cos(a1), y1 = r * Math.sin(a1);
      html += '<path d="M0 0 L' + x0.toFixed(2) + " " + y0.toFixed(2) + " A" + r + " " + r + " 0 0 1 " + x1.toFixed(2) + " " + y1.toFixed(2) + 'Z" fill="' + l.cor + '" stroke="#16110D" stroke-width="2"/>';
      var am = i * passo;
      html += '<g transform="rotate(' + am + ')"><text class="fatia-emoji" x="0" y="-70" text-anchor="middle" dominant-baseline="middle">' + l.emoji + "</text>" +
        '<text x="0" y="-48" text-anchor="middle" dominant-baseline="middle">' + esc(l.nome) + "</text></g>";
    });
    html += '<circle r="20" fill="#16110D"/><circle r="14" fill="#FFC52E"/><text y="1" text-anchor="middle" dominant-baseline="middle" style="font:800 8px Bricolage Grotesque,sans-serif;fill:#16110D">OBA!</text>';
    html += '<circle r="104" fill="none" stroke="#FFC52E" stroke-width="5"/>';
    roda.innerHTML = html;
  })();

  function mostrarResultado(l, anima) {
    var u = t();
    var link = l.ig ? '<a href="https://www.instagram.com/' + esc(l.ig) + '/" target="_blank" rel="noopener">' + u.resGo + "</a>" : "";
    $("#roletaRes").innerHTML = '<div class="res-cartao" style="--cor:' + l.cor + (anima ? "" : ";animation:none") + '"><span class="res-emoji" aria-hidden="true">' + l.emoji +
      "</span><div><small>" + u.resPre + "</small><b>" + esc(l.nome) + "</b><br>" + link + "</div></div>";
  }

  $("#girar").addEventListener("click", function () {
    if (girando) return;
    var vontade = ($("input[name=vontade]:checked") || {}).value || "todos";
    var doces = ["doce", "acai"];
    var candidatos = D.lojas.map(function (l, i) { return i; }).filter(function (i) {
      var ehDoce = D.lojas[i].cats.some(function (c) { return doces.indexOf(c) > -1; });
      return vontade === "todos" || (vontade === "doce" ? ehDoce : !ehDoce);
    });
    var idx = candidatos[Math.floor(Math.random() * candidatos.length)];
    var alvo = (360 - idx * passo) % 360;
    var atual = ((giro % 360) + 360) % 360;
    var delta = (alvo - atual + 360) % 360;
    var jitter = (Math.random() - .5) * passo * .6;
    giro += 360 * 5 + delta + jitter;
    girando = true;
    $("#roletaRes").innerHTML = '<p style="opacity:.6">' + t().girando + "</p>";
    roda.style.transform = "rotate(" + giro + "deg)";
    var reduz = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setTimeout(function () {
      girando = false;
      giro -= jitter; // mantém a referência alinhada à fatia
      ultimoSorteio = D.lojas[idx];
      mostrarResultado(ultimoSorteio, true);
    }, reduz ? 50 : 4300);
  });

  /* ---------------- formulários ---------------- */
  function validar(form, erroEl) {
    var ok = true;
    $$("[required]", form).forEach(function (i) {
      var vazio = !String(i.value).trim();
      i.setAttribute("aria-invalid", String(vazio));
      if (vazio && ok) { i.focus(); ok = false; }
    });
    erroEl.textContent = ok ? "" : t().erro;
    return ok;
  }
  function abrir(url) { window.open(url, "_blank", "noopener"); }

  var tData = $("#tData");
  (function () {
    var d = new Date(), iso = function (x) { return x.getFullYear() + "-" + String(x.getMonth() + 1).padStart(2, "0") + "-" + String(x.getDate()).padStart(2, "0"); };
    tData.min = iso(d);
  })();
  var tPessoas = $("#tPessoas");
  tPessoas.addEventListener("input", function () { $("#tPessoasOut").textContent = tPessoas.value; });

  $("#formTurma").addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validar(this, $("#tErro"))) return;
    var p = tData.value.split("-");
    var dataFmt = p.length === 3 ? p[2] + "/" + p[1] + "/" + p[0] : tData.value;
    var oc = $("#tOcasiao");
    abrir(zap(t().msgTurma({
      nome: $("#tNome").value.trim(), data: dataFmt, hora: $("#tHora").value,
      pessoas: tPessoas.value, ocasiao: oc.options[oc.selectedIndex].text
    })));
  });

  $("#formParceiro").addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validar(this, $("#pErro"))) return;
    var ig = $("#pIg").value.trim();
    if (ig && ig.charAt(0) !== "@" && !/^https?:/.test(ig)) ig = "@" + ig;
    abrir(zap(t().msgParceiro({ nome: $("#pNome").value.trim(), marca: $("#pMarca").value.trim(), tipo: $("#pTipo").value.trim(), ig: ig })));
  });

  /* ---------------- mapa ---------------- */
  var q = encodeURIComponent(D.mapaBusca);
  $("#mapa").src = "https://maps.google.com/maps?q=" + q + "&z=16&output=embed";
  $("#linkMaps").href = "https://www.google.com/maps/search/?api=1&query=" + q;
  $("#linkWaze").href = "https://waze.com/ul?q=" + q + "&navigate=yes";
  $("#copiarEnd").addEventListener("click", function () {
    var msg = t().copiado;
    var ok = function () { toast(msg); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(D.endereco).then(ok, function () { toast(D.endereco); });
    } else { toast(D.endereco); }
  });

  var toastT;
  function toast(m) {
    var el = $("#toast");
    el.textContent = m; el.classList.add("mostra");
    clearTimeout(toastT); toastT = setTimeout(function () { el.classList.remove("mostra"); }, 2400);
  }

  aplicarIdioma();
  setInterval(atualizarStatus, 60000);
})();
