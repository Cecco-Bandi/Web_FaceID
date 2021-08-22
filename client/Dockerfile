FROM node:16-alpine3.11

WORKDIR /user/src/app

# Add /app/node_modules/.bin to environment variables
ENV PATH /node_modules/.bin:$PATH

# Copy package files and install web_faceid dependencies
COPY package.json /package.json
COPY package-lock.json /package-lock.json
RUN npm install
RUN npm install react-scripts -g
RUN npm link react-scripts && \
npm link @material-ui/core

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]