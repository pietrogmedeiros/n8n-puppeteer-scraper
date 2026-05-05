FROM node:18-alpine

RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-dejavu

WORKDIR /app

RUN npm install puppeteer express body-parser

COPY server.js .

EXPOSE 3000

CMD ["node", "server.js"]