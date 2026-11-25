#!/usr/bin/env python3
"""Gera postos-dados.js, a base de postos da ferramenta /planejamento-de-rota.

Fonte: OpenStreetMap, pelo extrato do Brasil da Geofabrik. O fluxo .github/workflows/postos.yml
baixa o extrato, separa com o osmium os postos (amenity=fuel) e as cidades e vilas (place=*)
e entrega a este script um arquivo GeoJSON em linhas:

  osmium tags-filter brazil-latest.osm.pbf nwr/amenity=fuel n/place=city,town,village -o filtro.osm.pbf
  osmium export filtro.osm.pbf -f geojsonseq -o postos.geojsonseq
  python3 gerar_postos.py postos.geojsonseq

Cada posto vira uma linha "lat;lon;marcas;cidade;bandeira;nome":
  lat, lon  (graus + 40 / + 80) x 10.000, em base 36
  marcas    bits em base 36: 1 = 24 h, 2 = diesel, 4 = etanol, 8 = GNV, 16 = conveniência, 32 = banheiro
  cidade    índice (base 36) em "cid", a cidade ou vila mais próxima (até 25 km)
  bandeira  índice (base 36) em "band", tirada da marca ou do nome do posto; vazio = sem bandeira conhecida

Correções vindas dos avisos dos usuários ficam em dados/postos-avisos.json:
  "remover":   [[lat, lon], ...]                     posto fechado ou que não existe
  "adicionar": [{"lat":..,"lon":..,"nome":"..","bandeira":"Shell","h24":true}, ...]
  "notas":     {"lat,lon": "texto do aviso"}         lat,lon com 4 casas, como aparece no e-mail do aviso
"""
import datetime
import json
import math
import pathlib
import re
import sys
import unicodedata

RAIZ = pathlib.Path(__file__).resolve().parent
ENTRADA = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else None
# bandeiras reconhecidas: (nome exibido, expressão procurada na marca, no operador e no nome, sem acentos e em minúsculas)
BANDEIRAS = [
    ("Petrobras (BR)", r"petrobras|petrobr[aá]s|\bbr\b|vibra"),
    ("Ipiranga", r"ipiranga"),
    ("Shell", r"shell|raizen"),
    ("Ale", r"\bale\b|alesat"),
    ("Rodoil", r"rodoil"),
    ("SIM", r"\bsim\b"),
    ("Charrua", r"charrua"),
    ("Potencial", r"potencial"),
    ("Atem", r"\batem\b"),
    ("TotalEnergies", r"\btotal\b|totalenergies"),
    ("Larco", r"larco"),
    ("Dislub Equador", r"dislub|equador"),
    ("Setee", r"\bsetee\b|\bsete estrelas\b"),
    ("Stang", r"\bstang\b"),
    ("Taurus", r"\btaurus\b"),
    ("Petrobahia", r"petrobahia"),
    ("Fan", r"\bfan\b"),
    ("Idaza", r"idaza"),
    ("Maxsul", r"maxsul"),
    ("Buffon", r"buffon"),
]


def centro(geo):
    """Centro da caixa que envolve a geometria (ponto, linha ou área)."""
    xs, ys = [], []

    def anda(c):
        if isinstance(c[0], (int, float)):
            xs.append(c[0])
            ys.append(c[1])
        else:
            for d in c:
                anda(d)

    anda(geo["coordinates"])
    return (min(ys) + max(ys)) / 2, (min(xs) + max(xs)) / 2


def ler(arq):
    postos, lugares = [], []
    with arq.open(encoding="utf-8") as f:
        for ln in f:
            ln = ln.strip("\x1e\r\n ")
            if not ln:
                continue
            ft = json.loads(ln)
            t = ft.get("properties") or {}
            if not ft.get("geometry"):
                continue
            lat, lon = centro(ft["geometry"])
            if t.get("amenity") == "fuel":
                postos.append((lat, lon, t))
            elif ft["geometry"]["type"] == "Point" and t.get("place") in ("city", "town", "village") and t.get("name"):
                lugares.append((lat, lon, t["name"], t["place"]))
    return postos, lugares


def km(a1, o1, a2, o2):
    r = math.pi / 180
    h = math.sin((a2 - a1) * r / 2) ** 2 + math.cos(a1 * r) * math.cos(a2 * r) * math.sin((o2 - o1) * r / 2) ** 2
    return 12742 * math.asin(math.sqrt(h))


def b36(n):
    s = ""
    while True:
        n, r = divmod(n, 36)
        s = "0123456789abcdefghijklmnopqrstuvwxyz"[r] + s
        if not n:
            return s


def sem_acento(t):
    return unicodedata.normalize("NFD", str(t)).encode("ascii", "ignore").decode().lower()


def bandeira_de(*textos):
    """Índice em BANDEIRAS; a marca vale mais do que o nome, que vale mais do que o operador."""
    for t in textos:
        s = sem_acento(t)
        if not s:
            continue
        for i, (_, exp) in enumerate(BANDEIRAS):
            if re.search(exp, s):
                return i
    return None


def limpa(t):
    return " ".join(str(t).replace(";", ",").replace("\\", "/").split())[:60]


def main():
    if not ENTRADA or not ENTRADA.exists():
        raise SystemExit(__doc__)
    brutos, lugares = ler(ENTRADA)
    avisos_f = RAIZ / "dados" / "postos-avisos.json"
    avisos = json.loads(avisos_f.read_text(encoding="utf-8")) if avisos_f.exists() else {}

    # cidades e vilas, numa grade de 0,25 grau para achar a mais próxima
    cidades, grade = [], {}
    for lat, lon, nome, tipo in lugares:
        cidades.append((lat, lon, limpa(nome), tipo))
        grade.setdefault((int(lat // 0.25), int(lon // 0.25)), []).append(len(cidades) - 1)

    def cidade_de(lat, lon):
        melhor, qual = 25.0, None
        ca, co = int(lat // 0.25), int(lon // 0.25)
        for a in (-1, 0, 1):
            for o in (-1, 0, 1):
                for i in grade.get((ca + a, co + o), ()):
                    c = cidades[i]
                    d = km(lat, lon, c[0], c[1]) * (1.0 if c[3] != "village" else 1.6)  # prefere a sede à vila
                    if d < melhor:
                        melhor, qual = d, c[2]
        return qual

    postos = []
    for lat, lon, t in brutos:
        nome = limpa(t.get("name") or t.get("brand") or t.get("operator") or "")
        marcas = (1 if str(t.get("opening_hours", "")).replace(" ", "") == "24/7" else 0) | (2 if t.get("fuel:diesel") == "yes" else 0) \
            | (4 if t.get("fuel:ethanol") == "yes" else 0) | (8 if t.get("fuel:cng") == "yes" else 0) \
            | (16 if t.get("shop") in ("convenience", "kiosk", "yes") else 0) | (32 if t.get("toilets") == "yes" else 0)
        postos.append([lat, lon, marcas, nome, bandeira_de(t.get("brand", ""), t.get("name", ""), t.get("operator", ""))])
    bruto = len(postos)

    remover = [(round(a, 4), round(o, 4)) for a, o in avisos.get("remover", [])]
    postos = [p for p in postos if (round(p[0], 4), round(p[1], 4)) not in remover]
    for a in avisos.get("adicionar", []):
        postos.append([a["lat"], a["lon"], 1 if a.get("h24") else 0, limpa(a.get("nome", "")), bandeira_de(a.get("bandeira", ""), a.get("nome", ""))])

    # o mesmo posto às vezes está no mapa como ponto e como área: junta os que ficam a menos de 60 m
    postos.sort(key=lambda p: (round(p[0], 2), p[1]))
    celulas, unicos = {}, []
    for p in postos:
        k = (int(p[0] // 0.001), int(p[1] // 0.001))
        dup = None
        for a in (-1, 0, 1):
            for o in (-1, 0, 1):
                for q in celulas.get((k[0] + a, k[1] + o), ()):
                    if km(p[0], p[1], q[0], q[1]) < 0.06:
                        dup = q
        if dup:
            dup[2] |= p[2]
            dup[3] = dup[3] or p[3]
            dup[4] = p[4] if dup[4] is None else dup[4]
            continue
        celulas.setdefault(k, []).append(p)
        unicos.append(p)

    nomes_c, idx_c, linhas = [], {}, []
    for lat, lon, marcas, nome, band in unicos:
        cid = cidade_de(lat, lon)
        ci = ""
        if cid:
            if cid not in idx_c:
                idx_c[cid] = len(nomes_c)
                nomes_c.append(cid)
            ci = b36(idx_c[cid])
        linhas.append(";".join([b36(round((lat + 40) * 1e4)), b36(round((lon + 80) * 1e4)), b36(marcas) if marcas else "", ci, "" if band is None else b36(band), nome]))

    hoje = datetime.date.today().isoformat()
    saida = {"fonte": "OpenStreetMap", "gerado": hoje, "n": len(linhas), "cid": nomes_c, "band": [b[0] for b in BANDEIRAS],
             "notas": avisos.get("notas", {}), "p": "\n".join(linhas)}
    cab = (f"/* Postos de combustível do Brasil ({len(linhas)}), do OpenStreetMap (© colaboradores do OpenStreetMap, ODbL), extrato da Geofabrik lido em {hoje}.\n"
           "   Gerado por gerar_postos.py; o formato de cada linha está descrito lá. Não edite à mão. */\n")
    (RAIZ / "postos-dados.js").write_text(cab + "window.GG_POSTOS=" + json.dumps(saida, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
    com_nome = sum(1 for p in unicos if p[3])
    cont = {}
    for p in unicos:
        cont[p[4]] = cont.get(p[4], 0) + 1
    print("bandeiras:", ", ".join(f"{'sem bandeira' if k is None else BANDEIRAS[k][0]} {v}" for k, v in sorted(cont.items(), key=lambda kv: -kv[1])))
    print(f"bruto {bruto} · sem duplicados {len(unicos)} · com nome {com_nome} · 24 h {sum(1 for p in unicos if p[2] & 1)} · cidades {len(nomes_c)}")


if __name__ == "__main__":
    main()
