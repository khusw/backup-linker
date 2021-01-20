FROM node:12.16.2
RUN npm i -g @prisma/cli

RUN mkdir /app
WORKDIR /app

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

ENTRYPOINT [ "dockerize", "-wait", "tcp://root:password@localhost:3306/prisma:3306", "-timeout", "60s" ]

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install && npx prisma generate
CMD ["npm","start"]

COPY . .
