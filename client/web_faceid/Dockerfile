FROM node:16-alpine3.11

WORKDIR /user/src/app

COPY ./package.json ./

RUN npm install
RUN npm install react-scripts -g

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]