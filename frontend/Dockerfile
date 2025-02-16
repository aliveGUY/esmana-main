FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache bash git

COPY . .

RUN yarn install --frozen-lockfile

EXPOSE 3000

CMD ["yarn", "start"]
