# Manifesto

## Metainformação

- Título: TP2
- Data: 17/02/2025
- Autor: João Azevedo
- UC: Engenharia Web

## Autor

- id: a107367
- nome: João Azevedo
- foto:

## Resumo

A aplicação lê os dados de um **json-server** relativo à oficina e apresenta-os através de **tabelas HTML** no browser. Sendo fornecidos od vários serviços:

- `/reparacoes` – lista de todas as reparações realizadas
- `/intervencoes` – lista de tipos de intervenção, sem repetições, com contagem do número de vezes que foram realizadas
- `/viaturas` – lista de viaturas intervencionadas, agrupadas por marca e modelo, com número de reparações

O servidor aplicacional aplica a lógica necessária para filtrar, agrupar e contar os dados, e devolve HTML estruturado, permitindo navegação simples entre os diferentes elementos do sistema.

## Lista de resultados

O programa gera uma API aplicacional que responde com páginas HTML:

- `/` – página inicial com menu principal
- `/reparacoes` – tabela com todas as reparações
- `/intervencoes` – tabela com tipos de intervenção e número de ocorrências
- `/viaturas` – tabela com viaturas intervencionadas e número de reparações


