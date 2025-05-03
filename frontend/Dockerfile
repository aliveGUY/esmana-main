# Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Install dependencies
RUN apk add --no-cache bash git

# Copy package.json and yarn.lock first to leverage Docker cache
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Build the application
RUN yarn build

# Install serve for production
RUN yarn global add serve

# Expose port 80
EXPOSE 80

# Start the server
CMD ["serve", "-s", "build", "-l", "80"]
