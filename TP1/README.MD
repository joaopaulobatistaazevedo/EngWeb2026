# Manifesto

## Metainformação

- Título: TP1
- Data: 08/02/2025
- Autor: João Azevedo
- UC: Engenharia Web

## Autor

- id: a107367
- nome: João Azevedo
- foto:

## Resumo
Este trabalho consiste na geração automática de um conjunto de páginas HTML a partir de um ficheiro JSON com informação sobre reparações automóveis.
O programa lê os dados das reparações e produz um site com várias páginas interligadas.

São geradas listas de reparações, tipos de intervenção e marcas/modelos, bem como páginas individuais para cada entidade. Todas as páginas estão ligadas entre si através de hiperligações, permitindo uma navegação simples entre os diferentes elementos do sistema.

## Lista de resultados

O programa gera um conjunto de páginas HTML dentro da pasta `output/`:

- `index.html` – página inicial com o menu principal
- `reparações.html` – lista de todas as reparações
- `intervencoes.html` – lista dos tipos de intervenção
- `marcas.html` – lista de marcas e modelos

Páginas individuais:

- `[NIF].html` – página de cada reparação
- `[CODIGO].html` – página de cada intervenção
- `[MARCA]_[MODELO].html` – página de cada marca e modelo
