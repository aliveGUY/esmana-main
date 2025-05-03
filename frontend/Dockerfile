FROM node:20-alpine

WORKDIR /app

# Install dependencies
RUN apk add --no-cache bash git

# Copy package.json and yarn.lock first to leverage Docker cache
COPY package.json yarn.lock ./

# Install dependencies (without --frozen-lockfile to allow updates)
RUN yarn install

# Copy the rest of the application
COPY . .

# Expose port 3000 for development server
EXPOSE 3000

# Start development server
CMD ["yarn", "start"]
