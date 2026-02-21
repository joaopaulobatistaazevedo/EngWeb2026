/* --- server.js: Servidor da escola de música
   ---------------------------------------------- */

const axios = require('axios')
const http = require('http')

http.createServer(async function (req, res) {
    var d = new Date().toISOString().substring(0,16)
    console.log(req.method + " " + req.url + " " + d)

    if (req.method === "GET") {

        // ---------------- /alunos ----------------
        if (req.url == "/alunos") {
            try {
                const response = await axios.get('http://localhost:3000/alunos')
                let dados = response.data

                let linhas = ""
                dados.forEach(r => {
                    linhas += `
                        <tr>
                            <td>${r.id}</td>
                            <td>${r.nome}</td>
                            <td>${r.dataNasc}</td>
                            <td>${r.curso}</td>
                            <td>${r.anoCurso}</td>
                            <td>${r.instrumento}</td>
                        </tr>
                    `
                })

                let html = `
                <html>
                    <head>
                        <meta charset="utf-8"/>
                        <title>Alunos</title>
                    </head>
                    <body>
                        <h2>Lista de Alunos</h2>
                        <table border="1">
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Data de Nascimento</th>
                                <th>Curso</th>
                                <th>Ano do Curso</th>
                                <th>Instrumento</th>
                            </tr>
                            ${linhas}
                        </table>
                        <a href="/">Voltar</a>
                    </body>
                </html>
                `

                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                res.end(html)

            } catch (error) {
                res.writeHead(502, { 'Content-Type': 'text/plain' })
                res.end("Erro ao obter reparações")
            }
        }

        // ---------------- /cursos ----------------
        else if (req.url == "/cursos") {
            try {
                const response = await axios.get('http://localhost:3000/cursos')
                let dados = response.data

                let linhas = ""
                dados.forEach(r => {
                    linhas += `
                        <tr>
                            <td>${r.id}</td>
                            <td>${r.designacao}</td>
                            <td>${r.duracao}</td>
                            <td>${r.instrumento.id}</td>
                            <td>${r.instrumento["#text"]}</td>
                        </tr>
                    `
                })

                let html = `
                <html>
                    <head>
                        <meta charset="utf-8"/>
                        <title>Cursos</title>
                    </head>
                    <body>
                        <h2>Lista de Cursos</h2>
                        <table border="1">
                            <tr>
                                <th>ID</th>
                                <th>Designação</th>
                                <th>Duração</th>
                                <th>ID do Instrumento</th>
                                <th>Instrumento</th>
                            </tr>
                            ${linhas}
                        </table>
                        <a href="/">Voltar</a>
                    </body>
                </html>
                `

                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                res.end(html)

            } catch (error) {
                res.writeHead(502, { 'Content-Type': 'text/plain' })
                res.end("Erro ao obter intervenções")
            }
        }

        // ---------------- /instrumentos ----------------
        else if (req.url == "/instrumentos") {
            try {
                const response = await axios.get('http://localhost:3000/instrumentos')
                let dados = response.data

                 let linhas = ""
                dados.forEach(r => {
                    linhas += `
                        <tr>
                            <td>${r.id}</td>
                            <td>${r["#text"]}</td>
                        </tr>
                    `
                })

                let html = `
                <html>
                    <head>
                        <meta charset="utf-8"/>
                        <title>Instrumentos</title>
                    </head>
                    <body>
                        <h2>Lista de Instrumentos</h2>
                        <table border="1">
                            <tr>
                                <th>ID</th>
                                <th>Instrumento</th>
                            </tr>
                            ${linhas}
                        </table>
                        <a href="/">Voltar</a>
                    </body>
                </html>
                `

                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                res.end(html)

            } catch (error) {
                res.writeHead(502, { 'Content-Type': 'text/plain' })
                res.end("Erro ao obter viaturas")
            }
        }

        // ---------------- página inicial ----------------
        else if (req.url == "/") {
            let html = `
            <html>
                <head>
                    <meta charset="utf-8"/>
                    <title>Escola de Música</title>
                </head>
                <body>
                    <h2>Escola de Música</h2>
                    <ul>
                        <li><a href="/alunos">Alunos</a></li>
                        <li><a href="/cursos">Cursos</a></li>
                        <li><a href="/instrumentos">Instrumentos</a></li>
                    </ul>
                </body>
            </html>
            `

            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
            res.end(html)
        }

        else {
            res.writeHead(404, { 'Content-Type': 'text/plain' })
            res.end("Rota não suportada")
        }
    }

    else {
        res.writeHead(405, { 'Content-Type': 'text/plain' })
        res.end("Método não permitido")
    }

}).listen(25000)

console.log("Servidor à escuta na porta 25000...")
