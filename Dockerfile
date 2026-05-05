FROM node:18-alpine

RUN apk add --no-cache chromium

WORKDIR /app

# Copia package.json ANTES de npm install
COPY package.json package.json

# Instala dependências
RUN npm install --verbose

# Depois copia o resto
COPY server.js .

EXPOSE 3000

CMD ["node", "server.js"]
