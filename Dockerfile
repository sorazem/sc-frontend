FROM node:lts-alpine

RUN npm install -g http-server-spa

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY .env.production .env

RUN npm run build

EXPOSE 8080
CMD [ "http-server-spa", "dist" ]
