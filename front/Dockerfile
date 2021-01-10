FROM node:12.16.2

RUN mkdir /app
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .