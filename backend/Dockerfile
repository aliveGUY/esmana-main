FROM node:20-slim

# Install dependencies for PhantomJS
RUN apt-get update && apt-get install -y \
  curl \
  fontconfig \
  libfreetype6 \
  libjpeg62-turbo \
  libpng-dev \
  libx11-6 \
  libxext6 \
  bzip2 \
  libxrender1 \
  dumb-init \
  fonts-freefont-ttf \
  bash \
  yarn \
  procps \
  udev \
  ca-certificates \
  && apt-get clean && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy application source code
COPY . .

# Build the application
RUN yarn build

# Use dumb-init to handle signals properly
ENTRYPOINT ["/usr/bin/dumb-init", "--"]

# Start the application
CMD ["node", "dist/main.js"]
