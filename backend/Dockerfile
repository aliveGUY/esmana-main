FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache bash git

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 5000

CMD ["yarn", "start:dev"]
