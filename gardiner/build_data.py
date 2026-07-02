#!/usr/bin/env python3
"""Gera gardiner_data.js (PT) e gardiner_data_en.js (EN) enriquecidos.

Fonte oficial dos sinais e da funcao: gardiner/source/gardiner-sign-list.xlsx
(colunas: A=Gardiner No., B=Hieroglifo, C=Description, D=Details).

A coluna Details marca a funcao do sinal com "Phon."/"Phono.", "Ideo." e "Det.".
Um mesmo sinal costuma ter mais de uma funcao (ex.: A17 e Det. E Ideo.), entao
guardamos os tres como um conjunto, nao um rotulo unico.

Formato de cada linha gerada:
  [id, glifo, fonema, nome, func, details]
    func     = string com as funcoes presentes: combinacao de P (fonograma),
               I (logograma/ideograma) e D (determinativo). Vazio = sem cobertura.
    details  = texto Details do Gardiner, verbatim (EN) ou traducao (PT).

Os campos id/glifo/fonema/nome sao PRESERVADOS dos arquivos atuais (nao
regeneramos as traducoes PT dos nomes que ja foram feitas a mao). So
ACRESCENTAMOS func + details. PT details comeca vazio (a traduzir/revisar).

Uso: python3 gardiner/build_data.py
"""
import json, re, subprocess, zipfile, sys
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parent
XLSX = ROOT / "source" / "gardiner-sign-list.xlsx"
NS = {"a": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}


def load_xlsx(path):
    z = zipfile.ZipFile(path)
    ss = []
    root = ET.fromstring(z.read("xl/sharedStrings.xml"))
    T = "{http://schemas.openxmlformats.org/spreadsheetml/2006/main}t"
    for si in root.findall("a:si", NS):
        ss.append("".join(t.text or "" for t in si.iter(T)))
    sheet = ET.fromstring(z.read("xl/worksheets/sheet1.xml"))

    def cv(c):
        v = c.find("a:v", NS)
        if v is None:
            return ""
        return ss[int(v.text)] if c.get("t") == "s" else v.text

    rows = {}
    for r in sheet.findall(".//a:row", NS):
        d = {}
        for c in r.findall("a:c", NS):
            col = "".join(ch for ch in c.get("r") if ch.isalpha())
            d[col] = cv(c)
        a = (d.get("A") or "").strip()
        glyph = (d.get("B") or "").strip()
        if not a or not glyph:  # pula cabecalhos de categoria (sem glifo)
            continue
        rows[a] = {"glyph": glyph,
                   "desc": (d.get("C") or "").strip(),
                   "details": (d.get("D") or "").strip()}
    return rows


def detect_funcs(details):
    low = details.lower()
    f = ""
    if "phon" in low:
        f += "P"
    if "ideo" in low or "logogram" in low:
        f += "I"
    if re.search(r"\bdet\.|determ", low):
        f += "D"
    return f


XREF = re.compile(r"^(?:use as|var\. of|var\.|same as|cf\.|as)\s*([A-Za-z]{1,3}\d+\w*)", re.I)


def resolve_func(sid, xl, seen=None):
    """Funcao do sinal; se for variante (Use as X), herda a funcao do alvo."""
    seen = seen or set()
    details = xl[sid]["details"]
    f = detect_funcs(details)
    if f:
        return f
    m = XREF.match(details)
    if m:
        tgt = m.group(1)
        if tgt in xl and tgt not in seen:
            seen.add(sid)
            return resolve_func(tgt, xl, seen)
    return ""


def norm_phon(v):
    """Normaliza um valor de transliteracao para o padrao da casa."""
    return (v.replace("3", "ꜣ").replace("ʿ", "ꜥ")
             .replace("i", "ỉ").replace("j", "ỉ").replace("q", "ḳ")).strip()


# Um valor valido de transliteracao nao tem vogais ascii (a e o u) nem espaco:
# essas marcas denunciam glosa em ingles vazada ("mountain") ou texto livre
# ("in m3"). Nesses casos preferimos deixar vazio a gravar lixo.
def _looks_like_translit(v):
    return bool(v) and " " not in v and not re.search(r"[aeou]", v)


def derive_phon(sid, xl, phon_orig, seen=None):
    """Deriva o fonema do sinal a partir da coluna Details do Excel.

    So e chamado quando o fonema preservado do JS esta VAZIO (nunca sobrescreve
    valor ja curado). Extrai o valor de "Phono./Phon. X" ou, para variantes
    ("Use as Y" / "Var. of Y"), herda o fonema do alvo. Retorna "" quando o
    texto e ambiguo demais para extrair com seguranca."""
    seen = seen or set()
    details = xl[sid]["details"] if sid in xl else ""
    m = re.match(r"Phono?\.?\s+(.+)", details)
    if m:
        cand = re.split(r"[.“”\"',]|\s+[Ii]n\s", m.group(1))[0].strip()
        cand = norm_phon(cand)
        return cand if _looks_like_translit(cand) else ""
    x = XREF.match(details)
    if x:
        tgt = x.group(1)
        if phon_orig.get(tgt):
            return phon_orig[tgt]
        if tgt in xl and tgt not in seen:
            seen.add(sid)
            return derive_phon(tgt, xl, phon_orig, seen)
    return ""


# Sinais cujas linhas no Excel estao desalinhadas: as colunas Description e
# Details trazem so codigos de outros sinais (ex.: D21 -> "T30"/"T31"), virando
# um "Igual a X" falso. Damos a eles a explicacao correta a mao, conferida na
# sign list do Allen (fontes/Allen-MiddleEgyptian.pdf, pp. 425-450) e no
# Gardiner/Faulkner. O PT correspondente vive em source/details_pt.tsv.
# A funcao (P/I/D) desses sinais e derivada deste texto, nao do Excel.
DETAILS_OVERRIDE_EN = {
    # B1 nao e desalinhado: override so para tirar o travessao e completar o texto.
    "B1":   "Determinative of woman, names of women. Variant of A1 for the first person singular when the speaker is a woman.",
    "D21":  "Phonogram r. Logogram for r (“mouth”).",
    "F34":  "Logogram for ỉb (“heart, mind”). Determinative in ḥꜣty (“heart”).",
    "F36":  "Phonogram smꜣ. In smꜣ (“unite, join”).",
    "F42":  "Phonogram spr. In spr (“arrive, appeal”); determinative or logogram in spr (“rib”).",
    "F46":  "Determinative or logogram in ḳꜣb (“intestine, midst”). Determinative in pẖr (“go around, turn”).",
    "I6":   "Phonogram km. In km (“black”) and kmt (“the Black Land”, Egypt).",
    "L6":   "Phonogram ḫꜣ. In ḫꜣwt (“offering table”).",
    "M35":  "Determinative of heap.",
    "M36":  "Phonogram ḏr. In ḏr (“limit, end; since”).",
    "M40":  "Phonogram ỉs. In ỉs (“tomb”) and ỉst (“crew, gang”).",
    "N1":   "Logogram for pt (“sky, heaven”). Determinative of sky, above; in ḥry (“upper”).",
    "N5":   "Logogram for rꜥ (“sun, Re”), hrw (“day”) and sw (“day”, in dates). Determinative of sun, day, time.",
    "N23":  "Determinative of land, especially irrigated land. Logogram for gbb (“Geb”).",
    "O30":  "Determinative or logogram in sḫnt (“support, pillar”).",
    "O36":  "Determinative of wall. Logogram for ỉnb (“wall”).",
    "O48":  "Variant of O47. Logogram for nḫn (“Hierakonpolis”).",
    "Q3":   "Phonogram p.",
    "R8":   "Logogram and phonogram nṯr (“god”). A pole wrapped in cloth, an emblem of divinity.",
    "S11":  "Phonogram wsḫ. Determinative or logogram in wsḫ (“broad collar”).",
    "S24":  "Phonogram ṯs. In ṯs (“tie, knot”); logogram for ṯst (“knot, vertebra”).",
    "S37":  "Determinative or logogram in ḫw (“fan”).",
    "S38":  "Phonogram ḥḳꜣ. The heqa-scepter (the crook); in ḥḳꜣ (“ruler, to rule”).",
    "S40":  "Phonogram wꜣs. The was-scepter, a symbol of dominion and well-being; in wꜣs (“dominion”).",
    "T9":   "Phonogram pḏ. Determinative or logogram in pḏt (“bow”).",
    "T19":  "Phonogram ḳs. In ḳs (“bone”); determinative in ḳrs (“bury”).",
    "T21":  "Phonogram wꜥ. In wꜥ (“one”).",
    "T35":  "Phonogram nm. Determinative or logogram in nm (“butcher's knife”).",
    "U16":  "Determinative or logogram in bỉꜣ (“marvel, wonder”). Determinative of sled.",
    "U18":  "Variant of U17. Phonogram grg. In grg (“found, establish”).",
    "U26":  "Determinative or logogram in wbꜣ (“open up, drill”).",
    "U36":  "Phonogram ḥm. In ḥm (“majesty”) and ḥm-nṯr (“god's servant”, priest).",
    "V17":  "Logogram for sꜣ (“protection”). Variant of V16.",
    "V19":  "Determinative in ḫꜣr (“sack”, a measure), tmꜣ (“mat”) and mḏt (“stable”).",
    "V23":  "Variant of V22. Phonogram mḥ. In mḥ (“fill”) and mḥ (“cubit”).",
    "V25":  "Variant of V24. Phonogram wḏ. In wḏ (“command, decree”).",
    "V30":  "Phonogram nb. A basket; in nb (“lord”) and nb (“all, every”).",
    "V32":  "Determinative in gꜣwt (“bundle”) and gꜣw (“lack, absence”). Phonogram msn.",
    "V33":  "Determinative in ꜥrf (“enclose, pack”), sṯỉ (“scent”) and šs (“linen”). Logogram for sšrw (“grain”).",
    "V35":  "Variant of V33. Determinative of linen, packing.",
    "W13":  "Determinative or logogram in dšrt (“red pot, red ware”).",
    "X4":   "Determinative of bread, food; in words with sn (from snw, “food offerings”).",
    "Z6":   "Hieratic substitute for A13 and A14. Determinative of death, enemy.",
    "Z11":  "Phonogram ỉm. In ỉmỉ (“who is in”). Variant of M42.",
    "Aa8":  "Phonogram ḳn. In ḳnỉ (“brave, capable”); determinative in spꜣt (“district, estate”).",
    "Aa11": "Phonogram mꜣꜥ. In mꜣꜥ (“true, correct”).",
    "Aa30": "Determinative or logogram in ẖkr (“adorn; ornament”).",
}


def load_existing(rel):
    """Le um arquivo window.GARDINER_DATA[_EN] via node e devolve a lista."""
    var = "GARDINER_DATA_EN" if rel.endswith("_en.js") else "GARDINER_DATA"
    out = subprocess.check_output(
        ["node", "-e",
         f'global.window={{}};require("./{rel}");process.stdout.write(JSON.stringify(window.{var}));'],
        cwd=str(ROOT)
    )
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
    xl = load_xlsx(XLSX)
    pt = load_existing("gardiner_data.js")
    en = load_existing("gardiner_data_en.js")

    func_by_id = {sid: resolve_func(sid, xl) for sid in xl}
    # Nos sinais corrigidos a mao, a linha do Excel esta desalinhada e nao
    # diz nada util: a funcao vem do proprio texto do override.
    for sid, txt in DETAILS_OVERRIDE_EN.items():
        func_by_id[sid] = detect_funcs(txt)
    # Variantes ("Use as X" / "Var. of X") de um sinal corrigido herdam a
    # funcao dele, que o resolve_func nao encontrou na planilha.
    for sid in xl:
        if not func_by_id.get(sid):
            m = XREF.match(xl[sid]["details"])
            if m and func_by_id.get(m.group(1)):
                func_by_id[sid] = func_by_id[m.group(1)]

    # Fonema: preserva o valor curado do JS; so quando vazio, deriva da coluna
    # Details do Excel (Phono. X / heranca de variante). Nunca sobrescreve.
    phon_orig = {row[0]: row[2] for row in pt}
    final_phon, derived = {}, 0
    for row in pt:
        sid = row[0]
        if row[2]:
            final_phon[sid] = row[2]
        else:
            d = derive_phon(sid, xl, phon_orig)
            final_phon[sid] = d
            if d:
                derived += 1

    new_pt, new_en, gaps = [], [], []
    for row in pt:
        sid = row[0]
        base = [row[0], row[1], final_phon[sid], row[3]]
        func = func_by_id.get(sid, "")
        if sid not in xl:
            gaps.append(sid)
        # PT: details vazio por enquanto (a traduzir e revisar)
        new_pt.append(base + [func, ""])
    en_by_id = {r[0]: r for r in en}
    for row in pt:  # mesma ordem/ids do PT, para casar
        sid = row[0]
        er = en_by_id.get(sid, row)
        base = [er[0], er[1], final_phon[sid], er[3]]
        func = func_by_id.get(sid, "")
        details_en = DETAILS_OVERRIDE_EN.get(sid) or (xl[sid]["details"] if sid in xl else "")
        new_en.append(base + [func, details_en])

    write_js(ROOT / "gardiner_data.js", "GARDINER_DATA", new_pt)
    write_js(ROOT / "gardiner_data_en.js", "GARDINER_DATA_EN", new_en)

    covered = sum(1 for r in new_pt if r[4])
    with_phon = sum(1 for r in new_pt if r[2])
    print(f"PT/EN: {len(new_pt)} sinais | com funcao: {covered} | com fonema: {with_phon} "
          f"(derivados do Details: {derived}) | sem cobertura: {len(gaps)}")
    print("Sem cobertura (sem Details no Excel):")
    print("  " + ", ".join(gaps))
    # worklist de traducao
    wl = ROOT / "source" / "details_to_translate.tsv"
    with wl.open("w", encoding="utf-8") as f:
        f.write("id\tfunc\tdetails_en\n")
        for r in new_en:
            if r[5]:
                f.write(f"{r[0]}\t{r[4]}\t{r[5]}\n")
    print(f"Worklist de traducao: {wl.name} ({sum(1 for r in new_en if r[5])} linhas)")


if __name__ == "__main__":
    main()
