#!/usr/bin/env python3
"""Gera ht-rota-dados.js: os Hotéis de Trânsito por cidade, com coordenadas, para o Postos na Rota
mostrar os HT do caminho e das paradas.

Base: dados/hoteis-transito.json (o mesmo cadastro da página /hoteis-de-transito, vindo da DAP).
Coordenadas: as das guarnições (calculadora-dados.js); para cidade fora do Guia, o centroide do
município (municipios-dados.js). Como na página dos HT, contato e reserva levam ao sistema da DAP
já filtrado na cidade: o Guia não copia telefone nem e-mail.
Uso: python3 gerar_ht_rota.py   (rode de novo quando dados/hoteis-transito.json mudar)
"""
import json
import pathlib
import re
import unicodedata

from hoteis_transito import DADOS, ITENS, dap_cidade

RAIZ = pathlib.Path(__file__).resolve().parent
# lugares que não são sede de município
EXTRA = {("Coimbra", "MS"): (-19.9172, -57.7894)}  # Forte Coimbra, distrito de Corumbá


def norm(s):
    return unicodedata.normalize("NFD", s).encode("ascii", "ignore").decode().lower().strip()


def main():
    calc = (RAIZ / "calculadora-dados.js").read_text(encoding="utf-8")
    coords = {m.group(1): (float(m.group(2)), float(m.group(3)))
              for m in re.finditer(r'\["([a-z0-9-]+)","[^"]*","[A-Z]{2}","[A-Z]+",(-?[\d.]+),(-?[\d.]+)', calc)}
    mun = json.loads(re.search(r"window\.GG_MUNICIPIOS=(\".*\");", (RAIZ / "municipios-dados.js").read_text(encoding="utf-8")).group(1))
    centro = {}
    for ln in mun.split("\n"):
        nome, uf, lat, lon, _ = ln.split(";")
        centro[(norm(nome), uf)] = (float(lat), float(lon))

    cidades = {}
    for it in ITENS:
        k = (it["cidade"], it["uf"])
        if k not in cidades:
            c = coords.get(it.get("slug") or "") or EXTRA.get(k) or centro.get((norm(it["cidade"]), it["uf"]))
            if not c:
                print("sem coordenada:", k)
                continue
            cidades[k] = {"c": it["cidade"], "uf": it["uf"], "s": it.get("slug") or "", "lat": round(c[0], 4), "lng": round(c[1], 4),
                          "dap": dap_cidade(it["cidade"], it["uf"]), "h": []}
        cidades[k]["h"].append({"n": it["nome"], "om": it.get("om") or "", "p": it.get("publico") or "", "cat": it.get("cat") or "",
                                "q": it.get("quartos") or 0, "pet": it.get("pet") or 0, "pcd": it.get("adaptados") or 0,
                                "l": it.get("local") or ""})
    lista = sorted(cidades.values(), key=lambda x: (x["uf"], x["c"]))
    js = (f"/* Hotéis de Trânsito por cidade, para o Postos na Rota. Fonte: {DADOS['fonte']}, consulta de "
          f"{DADOS['consulta']}. Gerado por gerar_ht_rota.py. Não edite à mão. */\n"
          "window.GG_HT=" + json.dumps({"consulta": DADOS["consulta"], "cidades": lista}, ensure_ascii=False, separators=(",", ":")) + ";\n")
    (RAIZ / "ht-rota-dados.js").write_text(js, encoding="utf-8")
    print(f"{len(lista)} cidades, {sum(len(x['h']) for x in lista)} hotéis em ht-rota-dados.js")


if __name__ == "__main__":
    main()
