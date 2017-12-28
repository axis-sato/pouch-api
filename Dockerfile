FROM node:8.9.3

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i yarn -g \
  && npm i
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "yarn", "run", "nodemon", "server.js" ]