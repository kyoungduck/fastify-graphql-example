FROM node:16.15.1-alpine3.15

WORKDIR /usr/src/app

# RUN npm i -g yarn

COPY package.json .
COPY yarn.lock .
COPY .yarnrc.yml .
COPY .pnp.cjs .
COPY tsconfig.json .
COPY .yarn .yarn
COPY .swcrc .

RUN yarn install

COPY ./src ./src

RUN yarn build

EXPOSE 3000
CMD ["sh", "-c", "yarn start"]
