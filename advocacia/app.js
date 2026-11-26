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
    lista.appendChild(li);
  });

  // Sobre
  var sobre = document.querySelector("[data-sobre]");
  (d.sobre || []).forEach(function (p) { sobre.appendChild(el("p", null, p)); });

  // Contato
  var zap = d.whatsapp ? "https://wa.me/" + d.whatsapp.replace(/\D/g, "") : "";
  var itens = [
    ["Endereço", d.endereco, d.mapa],
    ["Horário", d.horario],
    ["Telefone", d.telefone, d.telefone && /\d{8}/.test(d.telefone.replace(/\D/g, "")) ? "tel:+55" + d.telefone.replace(/\D/g, "") : ""],
    ["WhatsApp", zap ? "Enviar mensagem" : "", zap],
    ["E-mail", d.email, d.email ? "mailto:" + d.email : ""],
    ["Instagram", d.instagram ? "@" + d.instagram : "", d.instagram ? "https://instagram.com/" + d.instagram : ""]
  ];
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
