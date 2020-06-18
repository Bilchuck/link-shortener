FROM node:11-alpine AS node_base

WORKDIR /usr/app
COPY package.json yarn.lock ./
RUN rm -rf ./node_modules
RUN cat ./package.json | grep typescript
RUN yarn install --frozen-lockfile && yarn cache clean
COPY . .

CMD yarn start
