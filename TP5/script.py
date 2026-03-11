import json

# Load original dataset
with open('cinema.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

filmes = data['filmes']

# Build actors and genres with IDs
atores_map = {}  # name -> {id, name, filmes:[]}
generos_map = {}  # name -> {id, name, filmes:[]}

ator_id = 1
genero_id = 1

for filme in filmes:
    for nome in filme.get('cast', []):
        if nome not in atores_map:
            atores_map[nome] = {"id": str(ator_id), "nome": nome, "filmes": []}
            ator_id += 1

    for nome in filme.get('genres', []):
        if nome not in generos_map:
            generos_map[nome] = {"id": str(genero_id), "nome": nome, "filmes": []}
            genero_id += 1

# Assign IDs to filmes and build cross references
filmes_out = []
for i, filme in enumerate(filmes, 1):
    f = {
        "id": str(i),
        "title": filme["title"],
        "year": filme["year"],
        "cast": [],   # list of {id, nome}
        "genres": []  # list of {id, nome}
    }

    for nome in filme.get('cast', []):
        ator = atores_map[nome]
        f["cast"].append({"id": ator["id"], "nome": nome})
        ator["filmes"].append({"id": str(i), "title": filme["title"], "year": filme["year"]})

    for nome in filme.get('genres', []):
        genero = generos_map[nome]
        f["genres"].append({"id": genero["id"], "nome": nome})
        genero["filmes"].append({"id": str(i), "title": filme["title"], "year": filme["year"]})

    filmes_out.append(f)

db = {
    "filmes": filmes_out,
    "atores": list(atores_map.values()),
    "generos": list(generos_map.values())
}

with open('db.json', 'w', encoding='utf-8') as f:
    json.dump(db, f, ensure_ascii=False, indent=2)

print(f"✅ db.json gerado com:")
print(f"   {len(filmes_out)} filmes")
print(f"   {len(atores_map)} atores")
print(f"   {len(generos_map)} géneros")