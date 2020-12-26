FROM node:12

WORKDIR /usr/app/server

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8080

# CMD ["node", "index.js"].