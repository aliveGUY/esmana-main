# Frontend Application

This is the frontend application for the Esmana project, built with React and custom webpack configuration.

## Development

### Local Development

To start the development server locally:

```bash
# Install dependencies
yarn install

# Start development server
yarn start
```

The application will be available at http://localhost:3000.

### Docker Development

To start the development server using Docker:

```bash
# Start the development environment
docker-compose up
```

The application will be available at http://localhost:3000.

## Production

### Building for Production

To build the application for production:

```bash
# Install dependencies
yarn install

# Build for production
yarn build
```

The production-ready files will be in the `build` directory.

### Analyzing the Bundle

To analyze the production bundle:

```bash
# Run the analyzer
yarn analyze
```

This will open a browser window with the webpack bundle analyzer.

### Serving Production Build Locally

To serve the production build locally:

```bash
# Build for production
yarn build

# Serve the production build
yarn serve:prod
```

The application will be available at http://localhost:3000.


## Webpack Configuration

The application uses a custom webpack configuration:

- `webpack.common.js`: Common configuration shared between development and production
- `webpack.dev.js`: Development-specific configuration
- `webpack.prod.js`: Production-specific configuration

### Key Features

- **SVG Handling**: SVGs can be imported directly as React components
- **Code Splitting**: Automatically splits code into smaller chunks
- **Tree Shaking**: Removes unused code
- **Compression**: Compresses assets for faster loading
- **Hot Module Replacement**: Fast updates during development
- **Source Maps**: Easier debugging
- **Production Optimizations**: Minification, dead code elimination, etc.

## Docker Configuration

Docker is used exclusively for development:

- `Dockerfile.dev`: Used for local development with hot reloading

Note: For production, the frontend is deployed as a static build and not run in Docker. The webpack production configuration (`webpack.prod.js`) is still used to generate optimized static files for deployment.
