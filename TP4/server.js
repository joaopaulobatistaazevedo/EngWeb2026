var http = require('http')
var axios = require('axios')
const { parse } = require('querystring');

var templates = require('./templates.js')
var static = require('./static.js')


function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => { body += chunk.toString(); });
        request.on('end', () => { callback(parse(body)); });
    }
    else {
        callback(null);
    }
}


var server = http.createServer((req, res) => {
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": 
                if(req.url == '/' || req.url == '/emd'){
                    axios.get("http://localhost:3000/emd?_sort=dataEMD")
                    .then(resp => { 
                        var treinos = resp.data
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8' })
                        res.end(templates.emdListPage(treinos, d))
                    })
                }
                else if(req.url == '/emd/registo'){
                    // GET /emd/registo - formulário para novo EMD
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8' })
                    res.end(templates.emdRegistoPage(d))
                }
                else if(req.url == '/emd/stats'){
                    // GET /emd/stats - página de estatísticas
                    axios.get("http://localhost:3000/emd")
                    .then(resp => {
                        var emds = resp.data
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8' })
                        res.end(templates.emdStatsPage(emds, d))
                    })
                }
                else if(/\/emd\/editar\/[0-9a-zA-Z_]+$/.test(req.url)){
                    // GET /emd/editar/:id - formulário de edição
                    var idEmd = req.url.split('/')[3]
                    axios.get('http://localhost:3000/emd/' + idEmd)
                    .then(resp => {
                        var emd = resp.data
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8' })
                        res.end(templates.emdEditarPage(emd, d))
                    })
                }
                else if(/\/emd\/apagar\/[0-9a-zA-Z_]+$/.test(req.url)){
                    // GET /emd/apagar/:id - apagar registo e redirecionar
                    var idEmd = req.url.split('/')[3]
                    axios.delete('http://localhost:3000/emd/' + idEmd)
                    .then(resp => {
                        res.writeHead(302, {'Location': '/emd'})
                        res.end()
                    })
                }
                else if(/\/emd\/[0-9a-zA-Z_]+$/.test(req.url)){
                    // GET /emd/:id - detalhes de um EMD
                    var idEmd = req.url.split('/')[2]
                    axios.get('http://localhost:3000/emd/' + idEmd)
                    .then(resp => { 
                        var emd = resp.data
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8' })
                        res.end(templates.emdDetailsPage(emd, d))
                    })
                }
                else{
                    res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                    res.end("<h1>404 - Página não encontrada</h1>")
                }
                break

            case "POST":
    if(req.url == '/emd'){
        collectRequestBodyData(req, result => {
            if(result){
                var novoEmd = {
                    dataEMD: result.dataEMD,
                    nome: { primeiro: result.primeiro, último: result.último },
                    idade: parseInt(result.idade),
                    género: result.género,
                    morada: result.morada,
                    modalidade: result.modalidade,
                    clube: result.clube,
                    email: result.email,
                    federado: result.federado === 'true',
                    resultado: result.resultado === 'true'
                }
                axios.post('http://localhost:3000/emd', novoEmd)
                .then(resp => {
                    res.writeHead(302, {'Location': '/emd'})
                    res.end()
                })
                .catch(erro => {
                    res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                    res.end('<p>Erro ao inserir: ' + erro + '</p><a href="/emd">Voltar</a>')
                })
            }
            else {
                res.writeHead(502, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p>Não foi possível obter os dados do body</p>')
            }
        })
    }
    else if(/\/emd\/[0-9a-zA-Z_]+$/.test(req.url)){
        var idEmd = req.url.split('/')[2]
        collectRequestBodyData(req, result => {
            if(result){
                var emdEditado = {
                    dataEMD: result.dataEMD,
                    nome: { primeiro: result.primeiro, último: result.último },
                    idade: parseInt(result.idade),
                    género: result.género,
                    morada: result.morada,
                    modalidade: result.modalidade,
                    clube: result.clube,
                    email: result.email,
                    federado: result.federado === 'true',
                    resultado: result.resultado === 'true'
                }
                axios.put('http://localhost:3000/emd/' + idEmd, emdEditado)
                .then(resp => {
                    res.writeHead(302, {'Location': '/emd'})
                    res.end()
                })
                .catch(erro => {
                    res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                    res.end('<p>Erro ao atualizar: ' + erro + '</p><a href="/emd">Voltar</a>')
                })
            }
            else {
                res.writeHead(502, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p>Não foi possível obter os dados do body</p>')
            }
        })
    }
    break

            default: 
                res.writeHead(405, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("<h1>405 - Método não suportado</h1>")
        }
    }
})

server.listen(7777, ()=>{
    console.log("Servidor à escuta na porta 7777...")
})