FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY ./app .


CMD ["node", "src/app.js"]