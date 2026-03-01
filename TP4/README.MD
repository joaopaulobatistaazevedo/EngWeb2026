# Manifesto

## Metainformação

- Título: TP
- Data: 1/03/2026
- Autor: João Azevedo
- UC: Engenharia Web

## Autor

- id: a107367
- nome: João Azevedo
- foto:

## Resumo

Desenvolvimento de um servidor aplicacional em Node.js para gestão de registos de Exames Médico-Desportivos (EMD). A aplicação expõe uma interface web com templates Pug e comunica com uma API REST local em json-server. Suporta operações CRUD completas sobre os registos EMD, incluindo listagem, consulta detalhada, inserção, edição, eliminação e visualização de estatísticas.

## Lista de resultados

- Servidor HTTP em Node.js a responder na porta 7777
- `GET /` ou `GET /emd` — listagem de todos os registos EMD em tabela, com ordenação por data
- `GET /emd/:id` — página de detalhes de um registo EMD com toda a informação
- `GET /emd/registo` — formulário para inserção de novo registo EMD
- `GET /emd/editar/:id` — formulário pré-preenchido para edição de um registo existente
- `GET /emd/apagar/:id` — eliminação de um registo e redirecionamento para a lista
- `GET /emd/stats` — página de estatísticas com distribuições por sexo, modalidade, clube, resultado e federado
- `POST /emd` — inserção de novo registo na base de dados e redirecionamento para a lista
- `POST /emd/:id` — atualização de um registo existente e redirecionamento para a lista