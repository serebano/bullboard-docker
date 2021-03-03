FROM node:15-alpine as installer
RUN apk update && apk upgrade
RUN apk add python make g++ nano curl

WORKDIR /app
COPY package.json ./
RUN yarn

FROM installer as build

COPY . .

ENV PORT=7010

EXPOSE $PORT

CMD [ "node", "index.js" ]