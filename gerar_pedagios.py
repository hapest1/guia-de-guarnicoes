#!/usr/bin/env python3
"""Gera pedagios-dados.js: as praças de pedágio do Brasil para o Postos na Rota.
Fonte: OpenStreetMap, no mesmo extrato da Geofabrik usado pelos postos (veja .github/workflows/postos.yml):
  osmium tags-filter brazil-latest.osm.pbf ... nw/barrier=toll_booth n/highway=toll_gantry ...
  osmium export ... -f geojsonseq -o postos.geojsonseq
  python3 gerar_pedagios.py postos.geojsonseq
Cabines dos dois sentidos da mesma praça ficam a poucos metros uma da outra: tudo que está a menos
de 400 m vira uma praça só. Cada praça vira uma linha "lat;lon;tipo;tarifa;nome":
  lat, lon  com 5 casas
  tipo      p = praça com cabines, f = pórtico de cobrança automática (free flow)
  tarifa    valor para carro de passeio em reais, quando o mapa traz (tags charge, charge:motorcar), senão vazio
  nome      nome da praça, ou o operador, ou a rodovia, quando o mapa traz
"""
import datetime
import json
import math
import pathlib
import re
import sys

RAIZ = pathlib.Path(__file__).resolve().parent


def centro(geo):
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


def km(a1, o1, a2, o2):
    r = math.pi / 180
    h = math.sin((a2 - a1) * r / 2) ** 2 + math.cos(a1 * r) * math.cos(a2 * r) * math.sin((o2 - o1) * r / 2) ** 2
    return 12742 * math.asin(math.sqrt(h))


def tarifa(t):
    """Valor para carro: charge:motorcar, charge:car ou charge ("9.10 BRL", "R$ 9,10")."""
    for k in ("charge:motorcar", "charge:car", "charge"):
        v = str(t.get(k) or "")
        m = re.search(r"(\d+(?:[.,]\d{1,2})?)", v)
        if m:
            val = float(m.group(1).replace(",", "."))
            if 0.5 <= val <= 200:
                return val
    return None


def limpa(s):
    return " ".join(str(s or "").replace(";", ",").split())[:60]


def main():
    arq = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else None
    if not arq or not arq.exists():
        raise SystemExit(__doc__)
    brutos = []
    with arq.open(encoding="utf-8") as f:
        for ln in f:
            ln = ln.strip("\x1e\r\n ")
            if not ln:
                continue
            ft = json.loads(ln)
            t = ft.get("properties") or {}
            if not ft.get("geometry"):
                continue
            if t.get("barrier") == "toll_booth":
                tipo = "p"
            elif t.get("highway") == "toll_gantry":
                tipo = "f"
            else:
                continue
            lat, lon = centro(ft["geometry"])
            nome = limpa(t.get("name") or t.get("operator") or t.get("ref") or "")
            brutos.append([lat, lon, tipo, tarifa(t), nome])

    # junta as cabines da mesma praça (até 400 m)
    brutos.sort(key=lambda p: (round(p[0], 2), p[1]))
    grade, pracas = {}, []
    for p in brutos:
        k = (int(p[0] // 0.005), int(p[1] // 0.005))
        dono = None
        for a in (-1, 0, 1):
            for o in (-1, 0, 1):
                for q in grade.get((k[0] + a, k[1] + o), ()):
                    if km(p[0], p[1], q[0], q[1]) < 0.4:
                        dono = q
        if dono:
            if dono[3] is None and p[3] is not None:
                dono[3] = p[3]
            if not dono[4] and p[4]:
                dono[4] = p[4]
            continue
        q = list(p)
        pracas.append(q)
        grade.setdefault(k, []).append(q)

    linhas = []
    for lat, lon, tipo, val, nome in pracas:
        linhas.append(f"{lat:.5f};{lon:.5f};{tipo};{'' if val is None else f'{val:.2f}'};{nome}")
    hoje = datetime.date.today().isoformat()
    com_tarifa = sum(1 for p in pracas if p[3] is not None)
    js = (f"/* Praças de pedágio do Brasil ({len(pracas)}; {com_tarifa} com tarifa no mapa), do OpenStreetMap "
          f"(© colaboradores do OpenStreetMap, ODbL), extrato lido em {hoje}.\n"
          "   Gerado por gerar_pedagios.py; o formato de cada linha está descrito lá. Não edite à mão. */\n"
          "window.GG_PEDAGIOS=" + json.dumps({"gerado": hoje, "p": "\n".join(linhas)}, ensure_ascii=False) + ";\n")
    (RAIZ / "pedagios-dados.js").write_text(js, encoding="utf-8")
    print(f"{len(brutos)} cabines/pórticos -> {len(pracas)} praças ({com_tarifa} com tarifa) em pedagios-dados.js")


if __name__ == "__main__":
    main()
