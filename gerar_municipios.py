#!/usr/bin/env python3
"""Gera municipios-dados.js: os 5.570 municípios do Brasil para a busca de cidades do Planejamento de Rota.

Fonte: API de Localidades e de Malhas do IBGE (nomes, UF e centroide do território de cada município).
Cada município vira uma linha "nome;UF;lat;lon;grande":
  lat, lon  centroide do município, com 3 casas
  grande    1 quando o território passa de 2.500 km²: nesses o centroide pode ficar longe da sede,
            e a página procura a sede no mapa (Nominatim) antes de traçar a rota
Uso: python3 gerar_municipios.py   (precisa de internet; os municípios mudam muito pouco)
"""
import json
import pathlib
import urllib.request

RAIZ = pathlib.Path(__file__).resolve().parent
API = "https://servicodados.ibge.gov.br/api"
UFS = [11, 12, 13, 14, 15, 16, 17, 21, 22, 23, 24, 25, 26, 27, 28, 29, 31, 32, 33, 35, 41, 42, 43, 50, 51, 52, 53]


def baixa(url):
    with urllib.request.urlopen(url, timeout=120) as r:
        return json.loads(r.read().decode("utf-8"))


def main():
    nomes = {str(m["municipio-id"]): (m["municipio-nome"], m["UF-sigla"])
             for m in baixa(f"{API}/v1/localidades/municipios?view=nivelado")}
    linhas = []
    for uf in UFS:
        for m in baixa(f"{API}/v3/malhas/estados/{uf}/metadados?intrarregiao=municipio"):
            if m["id"] not in nomes:
                continue
            nome, sigla = nomes[m["id"]]
            c = m["centroide"]
            area = float(m.get("area", {}).get("dimensao") or 0)
            linhas.append(f'{nome.replace(";", ",")};{sigla};{c["latitude"]:.3f};{c["longitude"]:.3f};{1 if area > 2500 else 0}')
    linhas.sort(key=lambda s: (s.split(";")[1], s))
    js = ("/* Municípios do Brasil (IBGE, API de Localidades e Malhas): nome;UF;lat;lon;grande.\n"
          "   Gerado por gerar_municipios.py. Não edite à mão. */\n"
          "window.GG_MUNICIPIOS=" + json.dumps("\n".join(linhas), ensure_ascii=False) + ";\n")
    (RAIZ / "municipios-dados.js").write_text(js, encoding="utf-8")
    print(f"{len(linhas)} municípios gravados em municipios-dados.js")


if __name__ == "__main__":
    main()
