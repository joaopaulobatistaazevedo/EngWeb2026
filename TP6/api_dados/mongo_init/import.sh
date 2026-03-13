#!/bin/bash

# Importa as 3 coleções diretamente dos ficheiros pré-processados
mongoimport --host localhost --db cinema --collection filmes  --type json --file /docker-entrypoint-initdb.d/filmes_clean.json --jsonArray
mongoimport --host localhost --db cinema --collection atores  --type json --file /docker-entrypoint-initdb.d/atores.json  --jsonArray
mongoimport --host localhost --db cinema --collection generos --type json --file /docker-entrypoint-initdb.d/generos.json  --jsonArray

# Cria os índices de texto para o parâmetro ?q= funcionar
mongosh cinema --eval 'db.filmes.createIndex({ title: "text" })'
mongosh cinema --eval 'db.atores.createIndex({ nome: "text" })'
mongosh cinema --eval 'db.generos.createIndex({ designacao: "text" })'