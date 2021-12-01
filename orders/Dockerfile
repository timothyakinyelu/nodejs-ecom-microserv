FROM node:latest

WORKDIR /home/node/app

COPY package.json ./

RUN yarn install

ADD . /home/node/app

RUN yarn tsc

EXPOSE 3303

CMD [ "yarn", "start"]
 