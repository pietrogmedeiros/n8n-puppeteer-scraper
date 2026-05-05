FROM mcr.microsoft.com/playwright/python:v1.40.0-focal

RUN npm install -g puppeteer express

WORKDIR /app

COPY server.js .

EXPOSE 3000

CMD ["node", "server.js"]
