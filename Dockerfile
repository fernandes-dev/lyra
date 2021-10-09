#DEVELOP
FROM node:14 as base

WORKDIR /user/lyra/api

COPY package.json ./
COPY prisma ./
COPY .env ./

RUN yarn && yarn prisma generate

COPY . .


#PRODUCTION
FROM base as production

ENV NODE_PATH=./dist

RUN yarn build