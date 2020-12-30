FROM node:latest

WORKDIR /application 

COPY package.json package.json 

RUN npm install 

COPY . . 

EXPOSE 8080 

RUN npm install -g nodemon

CMD [ "nodemon", "ts-node ./src/server.ts" ] 