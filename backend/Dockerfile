FROM node:20-alpine

# Install dependencies including Chromium and fonts
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    bash \
    yarn \
    procps \
    udev \
    dumb-init \
    --repository=http://dl-cdn.alpinelinux.org/alpine/edge/community

# Set Puppeteer environment to use system-installed Chromium
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser \
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    NODE_ENV=production

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy application source code
COPY . .

# Expose port if applicable (e.g., for a web server)
# EXPOSE 3000

# Use dumb-init to handle signals properly (avoids zombie processes)
ENTRYPOINT ["/usr/bin/dumb-init", "--"]

# Start the application
CMD ["node", "index.js"]
