# Basic React Image
FROM node as build

WORKDIR /app

# Copy package files and install app dependencies
COPY package.json .

RUN npm install
RUN npm install react-scripts -g

COPY . .

# Build the app
RUN npm run build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.17-alpine

COPY --from=build /app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]