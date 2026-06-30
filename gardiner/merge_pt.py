#!/usr/bin/env python3
"""Injeta as traducoes PT do campo `details` em gardiner_data.js.

Le gardiner/source/details_pt.tsv (id<TAB>pt) e escreve o texto na posicao 5
(details) de cada linha de gardiner_data.js, preservando os demais campos.
Roda depois de build_data.py. Idempotente.

Uso: python3 gardiner/merge_pt.py
"""
import json, subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent
TSV = ROOT / "source" / "details_pt.tsv"


def load(rel, var):
    out = subprocess.check_output(
        ["node", "-e",
         f'global.window={{}};require("./{rel}");process.stdout.write(JSON.stringify(window.{var}));'],
        cwd=str(ROOT))
    return json.loads(out)


def js_escape(s):
    return s.replace("\\", "\\\\").replace("'", "\\'").replace("\n", " ").replace("\r", " ").strip()


def write_js(path, var, rows):
    lines = [f"window.{var}=["]
    for r in rows:
        cells = ",".join("'" + js_escape(str(c)) + "'" for c in r)
        lines.append(f"  [{cells}],")
    lines.append("];")
    path.write_text("\n".join(lines) + "\n", encoding="utf-8")


def main():
    pt_map = {}
    for ln in TSV.read_text(encoding="utf-8").splitlines():
        if not ln.strip() or ln.startswith("id\t"):
            continue
        parts = ln.split("\t", 1)
        if len(parts) == 2:
            pt_map[parts[0].strip()] = parts[1].strip()

    rows = load("gardiner_data.js", "GARDINER_DATA")
    n = 0
    for r in rows:
        while len(r) < 6:
            r.append("")
        if r[0] in pt_map:
            r[5] = pt_map[r[0]]
            n += 1
    write_js(ROOT / "gardiner_data.js", "GARDINER_DATA", rows)
    print(f"Traduzidos aplicados: {n} / {len(rows)} sinais")
    missing = [r[0] for r in rows if r[4] and not r[5]]
    print(f"Com funcao mas SEM details PT ainda: {len(missing)}")
    if missing:
        print("  " + ", ".join(missing[:60]) + (" ..." if len(missing) > 60 else ""))


if __name__ == "__main__":
    main()
