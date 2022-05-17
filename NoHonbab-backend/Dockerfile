FROM amd64/node:16

RUN mkdir /app && mkdir /app/logs

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 80

CMD [ "npm", "start" ]