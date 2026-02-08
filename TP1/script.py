import json, os, shutil


def open_json(filename):
    with open(filename, encoding= "utf-8")as f:
        data = json.load(f)
    return data

def mk_dir (relative_path):
    if not os.path.exists (relative_path):
        os.mkdir(relative_path)
    else:
        shutil.rmtree (relative_path)
        os.mkdir(relative_path)

def new_file(filename, content):
    with open (filename, "w", encoding="utf-8") as f:
        f.write(content)
        
# -------------- GERAR INDEX -------------- #
       
def gera_index():
    html = '''
<html>
    <head>
        <title>Oficina</title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <h2>Oficina - Menu principal</h2>
        <ul>
            <li><a href="reparações.html">Lista de reparações</a></li>
            <li><a href="intervencoes.html">Tipos de intervenção</a></li>
            <li><a href="marcas.html">Marcas e modelos</a></li>
        </ul>
    </body>
</html>
'''
    new_file("output/index.html", html)
    
# -------------- SCRIPT PRINCIPAL- REPARAÇÕES -------------- #

dataset = open_json("dataset_reparacoes.json")
mk_dir ("output")
lista_reparacoes = ""

gera_index()

for reparacao in dataset["reparacoes"]:
    lista_reparacoes += f'''
    <li><a href = "{reparacao["nif"]}.html"> {reparacao["nome"]}</a></li>
'''
html = f'''
<html>
    <head>
        <title>Lista de Reparações</title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <h3>Lista de Reparações</h3>
        <ul>
            {lista_reparacoes}
        </ul>
    </body>
</html>
'''

new_file ("output/reparações.html", html)

# -------------- SCRIPT PRINCIPAL- INTERVENCOES -------------- #
intervencoes = {}

for reparacao in dataset["reparacoes"]:
    for intervencao in reparacao["intervencoes"]:
        codigo = intervencao["codigo"]
        if codigo not in intervencoes:
            intervencoes[codigo] = intervencao


intervencoes_lst = list(intervencoes.values())
intervencoes_lst.sort(key=lambda c: c["codigo"]) 

lista_intervencoes=""

for intervencao in intervencoes_lst:
    lista_intervencoes += f'''
    <li><a href= "{intervencao["codigo"]}.html"> {intervencao["nome"]}</a></li>
    '''
html = f'''

<html>
    <head>
        <title>Lista de Intervenções</title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <h3>Lista de Intervenções</h3>
        <ul>
            {lista_intervencoes}
        </ul>
    </body>
<html>
'''

new_file("output/intervencoes.html", html)

# -------------- SCRIPT PRINCIPAL- MARCAS -------------- #

marca_modelo_dict = {}

for reparacao in dataset["reparacoes"]:
    viatura = reparacao["viatura"]
    marca = viatura ["marca"]
    modelo = viatura ["modelo"]
    chave = (marca, modelo)

    if chave not in marca_modelo_dict:
        marca_modelo_dict[chave] = 0
    marca_modelo_dict[chave] += 1

marca_modelo_lst = list(marca_modelo_dict.items())
marca_modelo_lst.sort(key=lambda x: (x[0][0], x[0][1]))
lista_marca_modelo = ""

for marca_modelo in marca_modelo_lst:
    marca, modelo = marca_modelo[0]
    numero = marca_modelo[1]
    filename = f"{marca}_{modelo}.html".replace(" ", "_")
    lista_marca_modelo += f'''
    <li><a href= "{filename}"> {marca} {modelo} - {numero}</li>
    '''
    
html = f'''

<html>
    <head>
        <title>Lista de Marcas e Modelos</title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <h3>Lista de Marcas e Modelos</h3>
        <ul>
            {lista_marca_modelo}
        </ul>
    </body>
<html>
'''

new_file("output/marcas.html", html)

# -------------- PAGINA INDIVIDUAL - REPARACOES -------------- #

for reparacao in dataset["reparacoes"]:
    nif = reparacao["nif"]
    nome = reparacao["nome"]
    data = reparacao["data"]
    viatura = reparacao["viatura"]
    marca = viatura["marca"]
    modelo = viatura["modelo"]
    matricula = viatura["matricula"]

    # lista de intervenções da reparação
    lista_interv = ""
    for interv in reparacao["intervencoes"]:
        lista_interv += f'''
        <li><a href='{interv['codigo']}.html'>{interv['nome']}</a></li>
        '''
    
    html = f'''
    <html>
        <head>
            <title>Reparação {nome}</title>
            <meta charset="utf-8"/>
        </head>
        <body>
            <h3>Reparação de {nome}</h3>
            <p>NIF: {nif}</p>
            <p>Data: {data}</p>
            <h4>Viatura</h4>
            <p>{marca} {modelo} - {matricula}</p>
            <h4>Intervenções realizadas</h4>
            <ul>
                {lista_interv}
            </ul>
            <hr/>
            <a href='reparações.html'>Voltar à lista de reparações</a>
        </body>
    </html>
    '''
    new_file(f"output/{nif}.html", html)

# -------------- PAGINA INDIVIDUAL - INTERVENCOES -------------- #

for intervencao in intervencoes_lst:
    codigo = intervencao["codigo"]
    nome = intervencao["nome"]
    descricao = intervencao["descricao"]

    lista_reparacoes_interv = ""
    for reparacao in dataset["reparacoes"]:
        for intervencao in reparacao["intervencoes"]:
            if intervencao["codigo"] == codigo:
                lista_reparacoes_interv += f'''
                <li><a href='{reparacao['nif']}.html'>{reparacao['nome']}</a></li>
                '''
                
    html_interv = f'''
    <html>
        <head>
            <title>Intervenção {nome}</title>
            <meta charset="utf-8"/>
        </head>
        <body>
            <h3>{nome} ({codigo})</h3>
            <p>{descricao}</p>
            <h4>Reparações onde foi realizada:</h4>
            <ul>
                {lista_reparacoes_interv}
            </ul>
            <hr/>
            <a href='intervencoes.html'>Voltar à lista de intervenções</a>
        </body>
    </html>
    '''
    new_file(f"output/{codigo}.html", html_interv)
    
# -------------- PAGINA INDIVIDUAL - MARCAS MODELOS -------------- #

for marca_modelo in marca_modelo_lst:
    marca, modelo = marca_modelo[0]
    numero = marca_modelo[1]
    
    reparacoes_marca_modelo = ""
    for reparacao in dataset["reparacoes"]:
        viatura = reparacao["viatura"]
        if viatura["marca"]== marca and viatura["modelo"] == modelo:
            reparacoes_marca_modelo += f'''
            <li><a href = "{reparacao["nif"]}.html"> {reparacao["nome"]}</a></li>
            '''
            
    html_marca = f'''
    <html>
        <head>
            <title>{marca} {modelo}</title>
            <meta charset="utf-8"/>
        </head>
        <body>
            <h3>{marca} {modelo} - {numero} carro(s)</h3>
            <h4>Reparações deste modelo:</h4>
            <ul>
                {reparacoes_marca_modelo}
            </ul>
            <hr/>
            <a href='marcas.html'>Voltar à lista de marcas e modelos</a>
        </body>
    </html>
    '''
    # podes usar chave com underline para filename: ex. "Aston_Martin_SP_113.html"
    filename = f"{marca}_{modelo}.html".replace(" ", "_")
    new_file(f"output/{filename}", html_marca)