(function () {
  var d = window.ESCRITORIO || {};
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

  // Título, monograma e ano
  if (d.nome) document.title = d.nome + (d.complemento ? " · " + d.complemento : "");
  var iniciais = (d.nome || "").split(/\s+/).filter(function (p) { return /^[A-ZÀ-Ý]/.test(p); })
    .map(function (p) { return p[0]; }).slice(0, 2).join("");
  $$("[data-monograma]").forEach(function (n) { n.textContent = iniciais || "§"; });
  $$("[data-ano]").forEach(function (n) { n.textContent = new Date().getFullYear(); });

  // Áreas de atuação
  var lista = document.querySelector("[data-areas]");
  (d.areas || []).forEach(function (a, i) {
    var li = el("li", "area rev");
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
  var sobre = document.querySelector("[data-sobre]");
  (d.sobre || []).forEach(function (p) { sobre.appendChild(el("p", null, p)); });

  // Contato
  $$("[data-oab]").forEach(function (n) { if (d.oab) n.textContent = " · " + d.oab; });
  var zaps = [].concat(d.whatsapp || []).map(function (w) {
    return typeof w === "string" ? { rotulo: "", numero: w } : w;
  }).filter(function (w) { return w.numero; });
  var linkZap = function (w) { return "https://wa.me/" + w.numero.replace(/\D/g, ""); };
  var formata = function (n) {
    var m = n.replace(/\D/g, "").match(/^55(\d{2})(\d{4,5})(\d{4})$/);
    return m ? "(" + m[1] + ") " + m[2] + "-" + m[3] : n;
  };
  var zap = zaps.length ? linkZap(zaps[0]) : "";
  var itens = [
    ["Endereço", d.endereco, d.mapa],
    ["Horário", d.horario],
    ["Telefone", d.telefone, d.telefone && /\d{8}/.test(d.telefone.replace(/\D/g, "")) ? "tel:+55" + d.telefone.replace(/\D/g, "") : ""],
    ["E-mail", d.email, d.email ? "mailto:" + d.email : ""],
    ["Instagram", d.instagram ? "@" + d.instagram : "", d.instagram ? "https://instagram.com/" + d.instagram : ""]
  ];
  zaps.forEach(function (w, i) {
    itens.splice(2 + i, 0, ["WhatsApp", [formata(w.numero) + (w.rotulo ? " · " + w.rotulo : "")], linkZap(w)]);
  });
  var dl = document.querySelector("[data-contato]");
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
  if (zap) $$("[data-contato-principal]").forEach(function (a) {
    a.href = zap; a.target = "_blank"; a.rel = "noopener";
  });

  // Cabeçalho com linha ao rolar
  var topo = document.getElementById("topo");
  var aoRolar = function () { topo.classList.toggle("rolou", window.scrollY > 8); };
  aoRolar();
  window.addEventListener("scroll", aoRolar, { passive: true });

  // Entrada suave dos blocos
  var revs = $$(".rev");
  if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) {
    revs.forEach(function (n) { n.classList.add("visivel"); });
    return;
  }
  var obs = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("visivel"); obs.unobserve(e.target); }
    });
  }, { rootMargin: "0px 0px -8% 0px" });
  revs.forEach(function (n) { obs.observe(n); });
})();
