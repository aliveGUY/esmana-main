FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache bash git

COPY package.json ./
RUN yarn install

COPY . .

EXPOSE 5000

CMD ["yarn", "start:dev"]
