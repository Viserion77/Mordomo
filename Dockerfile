FROM node:16.15.1 as base

WORKDIR /urs/src/app

COPY . .

RUN npm install

FROM base as production

RUN npm run prepare
