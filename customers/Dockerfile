FROM node:latest

WORKDIR /home/node/app

COPY package.json ./

RUN yarn install

ADD . /home/node/app

RUN yarn tsc

EXPOSE 3301

CMD [ "yarn", "start"]
 