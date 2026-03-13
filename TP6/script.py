import json

INPUT_FILE = "cinema.json"

with open(INPUT_FILE, encoding="utf-8") as f:
    data = json.load(f)

# O dataset pode ser { "filmes": [...] } ou diretamente [...]
filmes_raw = data["filmes"] if isinstance(data, dict) else data

# ── 1. FILMES ────────────────────────────────────────────────────────────────
# Guarda o id do filme como string do índice para referências cruzadas
filmes = []
for i, filme in enumerate(filmes_raw):
    filmes.append({
        "id": i + 1,
        "title": filme.get("title", ""),
        "year": filme.get("year", None),
        "cast": filme.get("cast", []),
        "genres": filme.get("genres", [])
    })

# ── 2. ATORES ────────────────────────────────────────────────────────────────
atores_map = {}  # nome -> lista de ids de filmes
for filme in filmes:
    for nome in filme["cast"]:
        if nome not in atores_map:
            atores_map[nome] = []
        atores_map[nome].append(filme["id"])

atores = [
    {"nome": nome, "filmes": ids}
    for nome, ids in sorted(atores_map.items())
]

# ── 3. GÉNEROS ───────────────────────────────────────────────────────────────
generos_map = {}  # designacao -> lista de ids de filmes
for filme in filmes:
    for gen in filme["genres"]:
        if gen not in generos_map:
            generos_map[gen] = []
        generos_map[gen].append(filme["id"])

generos = [
    {"designacao": des, "filmes": ids}
    for des, ids in sorted(generos_map.items())
]

# ── GUARDAR ──────────────────────────────────────────────────────────────────
with open("filmes_clean.json", "w", encoding="utf-8") as f:
    json.dump(filmes, f, ensure_ascii=False, indent=2)

with open("atores.json", "w", encoding="utf-8") as f:
    json.dump(atores, f, ensure_ascii=False, indent=2)

with open("generos.json", "w", encoding="utf-8") as f:
    json.dump(generos, f, ensure_ascii=False, indent=2)

print(f"Filmes:  {len(filmes)}")
print(f"Atores:  {len(atores)}")
print(f"Géneros: {len(generos)}")
print("Ficheiros gerados: filmes_clean.json, atores.json, generos.json")