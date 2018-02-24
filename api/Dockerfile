FROM node:8.9.3

ENV TZ=Asia/Tokyo

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime \ 
  && echo $TZ > /etc/timezone

WORKDIR /usr/src/app
COPY . .

RUN npm i yarn -g \
  && yarn install
# If you are building your code for production
# RUN yarn install --prod

EXPOSE 8080
CMD [ "yarn", "run", "dev" ]