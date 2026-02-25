
var http = require('http')
var axios = require('axios')
const { parse } = require('querystring');

var templates = require('./templates.js')           // Necessario criar e colocar na mesma pasta
var static = require('./static.js')     

// Server creation

var server = http.createServer((req, res) => {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
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
                        res.end(templates.emdListPage(treinos,d))
                    })
                }
                else if(/\/emd\/[0-9a-zA-Z_]+$/.test(req.url)){
                    var idEmd = req.url.split('/')[2]
                    axios.get('http://localhost:3000/emd/' + idEmd)
                    .then(resp => { 
                        var emd = resp.data
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8' })
                        res.end(templates.emdDetailsPage(emd,d))
                    })
                }
                default: 
                // Outros metodos nao sao suportados
        }
    }
})

server.listen(7777, ()=>{
    console.log("Servidor à  escuta na porta 7777...")
})