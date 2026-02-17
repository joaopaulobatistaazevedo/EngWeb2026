/* --- server.js: Servidor da oficina  
   ---------------------------------------------- */

const axios = require('axios')
const http = require('http')

http.createServer(async function (req, res) {
    var d = new Date().toISOString().substring(0,16)
    console.log(req.method + " " + req.url + " " + d)

    if (req.method === "GET") {

        // ---------------- /reparacoes ----------------
        if (req.url == "/reparacoes") {
            try {
                const response = await axios.get('http://localhost:3000/reparacoes')
                let dados = response.data

                let linhas = ""
                dados.forEach(r => {
                    linhas += `
                        <tr>
                            <td>${r.nif}</td>
                            <td>${r.nome}</td>
                            <td>${r.data}</td>
                            <td>${r.viatura.marca}</td>
                            <td>${r.viatura.modelo}</td>
                            <td>${r.viatura.matricula}</td>
                        </tr>
                    `
                })

                let html = `
                <html>
                    <head>
                        <meta charset="utf-8"/>
                        <title>Reparações</title>
                    </head>
                    <body>
                        <h2>Lista de Reparações</h2>
                        <table border="1">
                            <tr>
                                <th>NIF</th>
                                <th>Nome</th>
                                <th>Data</th>
                                <th>Marca</th>
                                <th>Modelo</th>
                                <th>Matrícula</th>
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

        // ---------------- /intervencoes ----------------
        else if (req.url == "/intervencoes") {
            try {
                const response = await axios.get('http://localhost:3000/reparacoes')
                let dados = response.data

                let contagem = {}

                dados.forEach(r => {
                    r.intervencoes.forEach(i => {
                        if (!contagem[i.codigo]) {
                            contagem[i.codigo] = {
                                nome: i.nome,
                                count: 0
                            }
                        }
                        contagem[i.codigo].count++
                    })
                })

                let linhas = ""
                for (let codigo in contagem) {
                    let i = contagem[codigo]
                    linhas += `
                        <tr>
                            <td>${codigo}</td>
                            <td>${i.nome}</td>
                            <td>${i.count}</td>
                        </tr>
                    `
                }

                let html = `
                <html>
                    <head>
                        <meta charset="utf-8"/>
                        <title>Intervenções</title>
                    </head>
                    <body>
                        <h2>Tipos de Intervenção</h2>
                        <table border="1">
                            <tr>
                                <th>Código</th>
                                <th>Nome</th>
                                <th>Nº de vezes</th>
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

        // ---------------- /viaturas ----------------
        else if (req.url == "/viaturas") {
            try {
                const response = await axios.get('http://localhost:3000/reparacoes')
                let dados = response.data

                let contagem = {}

                dados.forEach(r => {
                    let v = r.viatura
                    let chave = v.marca + " " + v.modelo

                    if (!contagem[chave]) {
                        contagem[chave] = 0
                    }
                    contagem[chave]++
                })

                let linhas = ""
                for (let chave in contagem) {
                    let partes = chave.split(" ")
                    let marca = partes[0]
                    let modelo = partes.slice(1).join(" ")

                    linhas += `
                        <tr>
                            <td>${marca}</td>
                            <td>${modelo}</td>
                            <td>${contagem[chave]}</td>
                        </tr>
                    `
                }

                let html = `
                <html>
                    <head>
                        <meta charset="utf-8"/>
                        <title>Viaturas</title>
                    </head>
                    <body>
                        <h2>Viaturas intervencionadas</h2>
                        <table border="1">
                            <tr>
                                <th>Marca</th>
                                <th>Modelo</th>
                                <th>Nº reparações</th>
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
                    <title>Oficina</title>
                </head>
                <body>
                    <h2>Oficina</h2>
                    <ul>
                        <li><a href="/reparacoes">Reparações</a></li>
                        <li><a href="/intervencoes">Intervenções</a></li>
                        <li><a href="/viaturas">Viaturas</a></li>
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
