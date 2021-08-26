FROM node

WORKDIR /app

# Copy package files and install app dependencies
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000

CMD [ "npm", "start" ]