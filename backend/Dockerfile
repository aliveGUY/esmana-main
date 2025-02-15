# Stage 1: Install dev dependencies
FROM node:20-alpine AS development-dependencies-env
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Stage 2: Install production dependencies
FROM node:20-alpine AS production-dependencies-env
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production

# Stage 3: Build the application
FROM node:20-alpine AS build-env
WORKDIR /app
COPY . .
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
RUN yarn build

# Stage 4: Final production image
FROM node:20-alpine
WORKDIR /app
COPY package.json yarn.lock ./
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
COPY --from=build-env /app/dist /app/dist
EXPOSE 5000
CMD ["yarn", "start:prod"]
