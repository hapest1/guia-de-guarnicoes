(function () {
  var d = window.ESCRITORIO || {};
  var $ = function (s) { return document.querySelector(s); };
  var $$ = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };
  var el = function (tag, cls, txt) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (txt != null) e.textContent = txt;
    return e;
  };

  // Textos simples
  $$("[data-d]").forEach(function (n) {
    var v = d[n.getAttribute("data-d")];
    if (v == null) return;
    n.textContent = "";
    String(v).split("\n").forEach(function (linha, i) {
      if (i) n.appendChild(document.createElement("br"));
      n.appendChild(document.createTextNode(linha));
    });
  });
  if (d.nome) document.title = d.nome + (d.complemento ? " · " + d.complemento : "");
  $$("[data-ano]").forEach(function (n) { n.textContent = new Date().getFullYear(); });

  // Áreas de atuação
  var lista = $("[data-areas]");
  (d.areas || []).forEach(function (a, i) {
    var li = el("li", "area");
    li.appendChild(el("span", "area-n", ("0" + (i + 1)).slice(-2)));
    li.appendChild(el("h3", "area-nome", a.nome));
    li.appendChild(el("p", "area-texto", a.texto));
    if (a.temas && a.temas.length) {
      var ul = el("ul", "area-temas");
      a.temas.forEach(function (t) { ul.appendChild(el("li", null, t)); });
      li.appendChild(ul);
    }
    lista.appendChild(li);
  });

  // Sobre
  var sobre = $("[data-sobre]");
  (d.sobre || []).forEach(function (p) { sobre.appendChild(el("p", null, p)); });

  // Contato
  var zaps = [].concat(d.whatsapp || []).map(function (w) {
    return typeof w === "string" ? { rotulo: "", numero: w } : w;
  }).filter(function (w) { return w.numero; });
  var linkZap = function (w, texto) {
    return "https://wa.me/" + w.numero.replace(/\D/g, "") + (texto ? "?text=" + encodeURIComponent(texto) : "");
  };
  var formata = function (n) {
    var m = n.replace(/\D/g, "").match(/^55(\d{2})(\d{4,5})(\d{4})$/);
    return m ? "(" + m[1] + ") " + m[2] + "-" + m[3] : n;
  };
  var itens = [
    ["Endereço", d.endereco, d.mapa],
    ["Horário", d.horario]
  ];
  zaps.forEach(function (w) {
    itens.push(["WhatsApp", [formata(w.numero), w.rotulo], linkZap(w)]);
  });
  itens.push(
    ["Telefone", d.telefone, d.telefone ? "tel:+55" + d.telefone.replace(/\D/g, "") : ""],
    ["E-mail", d.email, d.email ? "mailto:" + d.email : ""],
    ["Instagram", d.instagram ? "@" + d.instagram : "", d.instagram ? "https://instagram.com/" + d.instagram : ""]
  );
  var dl = $("[data-contato]");
  itens.forEach(function (it) {
    var linhas = [].concat(it[1] || []).filter(Boolean);
    if (!linhas.length) return;
    var grupo = el("div", "contato-item");
    grupo.appendChild(el("dt", null, it[0]));
    var dd = el("dd");
    var alvo = dd;
    if (it[2]) {
      alvo = el("a");
      alvo.href = it[2];
      if (/^https?:/.test(it[2])) { alvo.target = "_blank"; alvo.rel = "noopener"; }
      dd.appendChild(alvo);
    }
    linhas.forEach(function (l, i) {
      if (i) alvo.appendChild(document.createElement("br"));
      alvo.appendChild(document.createTextNode(l));
    });
    grupo.appendChild(dd);
    dl.appendChild(grupo);
  });

  // Pré-atendimento: monta a mensagem e abre o WhatsApp do primeiro contato
  var form = $("[data-triagem]");
  var t = d.triagem || {};
  if (!form || !zaps.length) { if (form) form.hidden = true; return; }
  $$("[data-opcoes]").forEach(function (sel) {
    (t[sel.getAttribute("data-opcoes")] || []).forEach(function (o) {
      var op = el("option", null, o); op.value = o; sel.appendChild(op);
    });
  });
  $$("[data-pilulas]").forEach(function (box) {
    var nome = box.getAttribute("data-nome");
    (t[box.getAttribute("data-pilulas")] || []).forEach(function (o) {
      var lab = el("label", "pilula");
      var inp = el("input"); inp.type = "radio"; inp.name = nome; inp.value = o; inp.required = true;
      lab.appendChild(inp); lab.appendChild(el("span", null, o));
      box.appendChild(lab);
    });
  });
  var erro = form.querySelector(".triagem-erro");
  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    var f = form.elements;
    var faltando = !form.checkValidity();
    form.classList.add("tentou");
    if (faltando) {
      erro.textContent = "Preencha todos os campos e marque a confirmação para continuar.";
      erro.hidden = false;
      var primeiro = form.querySelector(":invalid");
      if (primeiro && primeiro.focus) primeiro.focus();
      return;
    }
    erro.hidden = true;
    var limpa = function (s) { return String(s).replace(/\s+/g, " ").trim(); };
    var msg = [
      "Olá! Vim pelo site da " + (d.nome || "") + ".",
      "",
      "*Nome:* " + limpa(f.nome.value),
      "*Cidade:* " + limpa(f.cidade.value),
      "*Assunto:* " + f.assunto.value,
      "*Situação:* " + f.situacao.value,
      "*Atendimento:* " + f.atendimento.value,
      "",
      "*Resumo:* " + limpa(f.resumo.value)
    ].join("\n");
    var url = linkZap(zaps[0], msg);
    var aba = window.open(url, "_blank");
    if (aba) aba.opener = null; else window.location.href = url;
  });
})();
