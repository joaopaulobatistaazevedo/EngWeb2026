# Imagem base
FROM node:22

# Diretório de trabalho
WORKDIR /app

# Copiar ficheiros de dependências
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o resto do código
COPY . .

# Expor a porta definida no teu código
EXPOSE 7789

# Comando para iniciar
CMD ["node", "server.js"]