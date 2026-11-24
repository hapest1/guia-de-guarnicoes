#!/usr/bin/env python3
"""Gera postos-dados.js, a base de postos da ferramenta /postos-na-rota.

Fonte: OpenStreetMap (amenity=fuel), baixado pela Overpass API em blocos de 5 graus.
O contorno do Brasil vem da malha do IBGE; ficam os postos dentro do país e os que
estão a até ~10 km da fronteira (cidades-gêmeas).

Cada posto vira uma linha "lat;lon;marcas;cidade;bandeira;nome":
  lat, lon  (graus + 40 / + 80) x 10.000, em base 36
  marcas    bits em base 36: 1 = 24 h, 2 = diesel, 4 = etanol, 8 = GNV, 16 = conveniência, 32 = banheiro
  cidade    índice (base 36) em "cid", a cidade ou vila mais próxima (até 25 km)
  bandeira  índice (base 36) em "band", tirada da marca ou do nome do posto; vazio = sem bandeira conhecida

Correções vindas dos avisos dos usuários ficam em dados/postos-avisos.json:
  "remover":   [[lat, lon], ...]                     posto fechado ou que não existe
  "adicionar": [{"lat":..,"lon":..,"nome":"..","bandeira":"Shell","h24":true}, ...]
  "notas":     {"lat,lon": "texto do aviso"}         lat,lon com 4 casas, como aparece no e-mail do aviso

Uso:  python3 gerar_postos.py [pasta-de-cache]
"""
import datetime
import json
import math
import pathlib
import re
import subprocess
import sys
import time
import unicodedata

RAIZ = pathlib.Path(__file__).resolve().parent
CACHE = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else RAIZ / ".cache-postos")
SERVIDORES = ["https://overpass-api.de/api/interpreter", "https://overpass.private.coffee/api/interpreter",
              "https://maps.mail.ru/osm/tools/overpass/api/interpreter", "https://overpass.kumi.systems/api/interpreter"]
MALHA = "https://servicodados.ibge.gov.br/api/v3/malhas/paises/BR?formato=application/vnd.geo%2Bjson&qualidade=intermediaria"
CAMPOS_P = '::type,::id,::lat,::lon,name,brand,operator,opening_hours,"fuel:diesel","fuel:ethanol","fuel:cng",shop,toilets'
CAMPOS_C = "::lat,::lon,name,place"
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
BLOCOS = [(s, w) for s in range(-35, 6, 5) for w in range(-75, -34, 5)]


def curl(args, destino, tentativas=4):
    tmp = pathlib.Path(str(destino) + ".tmp")
    for t in range(tentativas):
        for srv in (args.get("servidores") or [args["url"]]):
            cmd = ["curl", "-sS", "-m", "150", "-A", "guiadeguarnicoes.com (gerar_postos.py)", "-o", str(tmp), "-w", "%{http_code}"]
            if "dados" in args:
                cmd += ["--data-urlencode", "data=" + args["dados"]]
            r = subprocess.run(cmd + [srv], capture_output=True, text=True)
            corpo = tmp.read_bytes() if tmp.exists() else b""
            if r.stdout.strip() == "200" and not corpo.lstrip()[:1] == b"<":
                tmp.rename(destino)
                return
            print(f"  recusado: {srv.split('/')[2]} http={r.stdout.strip()} {r.stderr.strip()[:120]} {corpo[:300]!r}", flush=True)
        time.sleep(15 * (t + 1))
    raise SystemExit(f"falhou: {destino}")


def baixar():
    CACHE.mkdir(parents=True, exist_ok=True)
    for s, w in BLOCOS:
        caixa = f"({s},{w},{s + 5},{w + 5})"
        for tipo, q in (
            ("p", f'[out:csv({CAMPOS_P};false;"\\t")][timeout:120];nwr[amenity=fuel]{caixa};out center;'),
            ("c", f'[out:csv({CAMPOS_C};false;"\\t")][timeout:120];node[place~"^(city|town|village)$"]{caixa};out;'),
        ):
            f = CACHE / f"{tipo}_{s}_{w}.tsv"
            if not f.exists():
                curl({"servidores": SERVIDORES, "dados": q}, f)
                print(f.name, sum(1 for _ in f.open(encoding="utf-8")), flush=True)
                time.sleep(1)
    m = CACHE / "brasil.geojson"
    if not m.exists():
        curl({"url": MALHA}, m)


def aneis_brasil():
    g = json.loads((CACHE / "brasil.geojson").read_text(encoding="utf-8"))
    aneis = []
    for feat in g["features"]:
        geo = feat["geometry"]
        polis = geo["coordinates"] if geo["type"] == "MultiPolygon" else [geo["coordinates"]]
        for poli in polis:
            anel = poli[0]
            xs = [p[0] for p in anel]
            ys = [p[1] for p in anel]
            aneis.append((min(xs), max(xs), min(ys), max(ys), anel))
    return aneis


def dentro(aneis, lon, lat):
    for x0, x1, y0, y1, anel in aneis:
        if lon < x0 or lon > x1 or lat < y0 or lat > y1:
            continue
        c = False
        j = len(anel) - 1
        for i in range(len(anel)):
            xi, yi = anel[i][0], anel[i][1]
            xj, yj = anel[j][0], anel[j][1]
            if (yi > lat) != (yj > lat) and lon < (xj - xi) * (lat - yi) / (yj - yi) + xi:
                c = not c
            j = i
        if c:
            return True
    return False


def perto_do_brasil(aneis, lon, lat):
    if dentro(aneis, lon, lat):
        return True
    d = 0.09
    return any(dentro(aneis, lon + a * d, lat + b * d) for a in (-1, 0, 1) for b in (-1, 0, 1) if a or b)


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
    baixar()
    aneis = aneis_brasil()
    avisos_f = RAIZ / "dados" / "postos-avisos.json"
    avisos = json.loads(avisos_f.read_text(encoding="utf-8")) if avisos_f.exists() else {}

    # cidades e vilas, numa grade de 0,25 grau para achar a mais próxima
    cidades, grade = [], {}
    for f in sorted(CACHE.glob("c_*.tsv")):
        for ln in f.read_text(encoding="utf-8").splitlines():
            c = ln.split("\t")
            if len(c) < 4 or not c[2].strip():
                continue
            lat, lon = float(c[0]), float(c[1])
            cidades.append((lat, lon, limpa(c[2]), c[3]))
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

    vistos, postos = set(), []
    for f in sorted(CACHE.glob("p_*.tsv")):
        for ln in f.read_text(encoding="utf-8").splitlines():
            c = (ln.split("\t") + [""] * 13)[:13]
            if (c[0], c[1]) in vistos or not c[2]:
                continue
            vistos.add((c[0], c[1]))
            lat, lon = float(c[2]), float(c[3])
            nome = limpa(c[4] or c[5] or c[6])
            marcas = (1 if c[7].replace(" ", "") == "24/7" else 0) | (2 if c[8] == "yes" else 0) | (4 if c[9] == "yes" else 0) \
                | (8 if c[10] == "yes" else 0) | (16 if c[11] in ("convenience", "kiosk", "yes") else 0) | (32 if c[12] == "yes" else 0)
            postos.append([lat, lon, marcas, nome, bandeira_de(c[5], c[4], c[6])])
    bruto = len(postos)

    remover = [(round(a, 4), round(o, 4)) for a, o in avisos.get("remover", [])]
    postos = [p for p in postos if (round(p[0], 4), round(p[1], 4)) not in remover]
    for a in avisos.get("adicionar", []):
        postos.append([a["lat"], a["lon"], 1 if a.get("h24") else 0, limpa(a.get("nome", "")), bandeira_de(a.get("bandeira", ""), a.get("nome", ""))])

    postos = [p for p in postos if perto_do_brasil(aneis, p[1], p[0])]

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
    cab = (f"/* Postos de combustível do Brasil ({len(linhas)}), do OpenStreetMap (© colaboradores do OpenStreetMap, ODbL), baixados em {hoje}.\n"
           "   Gerado por gerar_postos.py; o formato de cada linha está descrito lá. Não edite à mão. */\n")
    (RAIZ / "postos-dados.js").write_text(cab + "window.GG_POSTOS=" + json.dumps(saida, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
    com_nome = sum(1 for p in unicos if p[3])
    cont = {}
    for p in unicos:
        cont[p[4]] = cont.get(p[4], 0) + 1
    print("bandeiras:", ", ".join(f"{'sem bandeira' if k is None else BANDEIRAS[k][0]} {v}" for k, v in sorted(cont.items(), key=lambda kv: -kv[1])))
    print(f"bruto {bruto} · no Brasil e sem duplicados {len(unicos)} · com nome {com_nome} · 24 h {sum(1 for p in unicos if p[2] & 1)} · cidades {len(nomes_c)}")


if __name__ == "__main__":
    main()
