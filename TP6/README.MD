# Manifesto

## Metainformação

- Título: TPC6
- Data: 2026/03/13
- Autor: João Azevedo
- UC: Engenharia Web

## Autor

- id: a107367
- nome: João Azevedo
- foto: foto: ![João Azevedo](images/foto.jpeg)

## Resumo

Desenvolvimento de uma aplicação web sobre cinema americano, implementada como uma orquestração de microserviços com Docker Compose. A aplicação é composta por três serviços: uma base de dados MongoDB com três coleções (filmes, atores e géneros), uma API de dados minimalista em Express/Mongoose, e um servidor de interface web em Express/Pug com W3.CSS.

## Lista de resultados

- Dataset processado e dividido em 3 coleções: filmes, atores e géneros
- API de dados com endpoints GET, POST, PUT e DELETE para as 3 coleções
- Suporte a pesquisa full-text (?q=), projeção (?\_select=) e ordenação (?\_sort=, ?\_order=)
- Interface web com listagem de filmes, atores e géneros
- Página de detalhe para cada filme e cada ator
- Orquestração completa com Docker Compose (MongoDB + API + Interface)
