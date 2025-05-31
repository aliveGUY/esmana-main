# Esmana Backend - Redis-based Authentication System

A robust NestJS backend application with Redis-based token authentication, supporting both local and Google OAuth authentication. Built using .NET-style architecture with Model-Repository-Service-Controller pattern.

## Features

- 🔐 **Redis-based Token Authentication** with secure random tokens
- 🔄 **Redis Session Management** with automatic TTL expiration
- 🌐 **Google OAuth Integration** with account linking
- 🏗️ **.NET-style Architecture** (Domain-Infrastructure-Application-Presentation layers)
- 🛡️ **Token Blacklisting** for secure logout
- 📝 **Comprehensive Validation** with class-validator
- 🔒 **Password Hashing** with bcrypt
- 🎯 **Dependency Injection** with interfaces
- 📊 **Health Check Endpoints**
- ⚡ **Instant Token Revocation** with Redis storage

## Architecture

```
src/
├── domain/                     # Domain layer (entities, enums, interfaces)
├── infrastructure/             # Data access layer (Redis, repositories)
├── application/               # Business logic layer (services, DTOs, strategies)
├── presentation/              # API layer (controllers, guards)
├── common/                    # Shared utilities and decorators
├── config/                    # Configuration files
└── modules/                   # Feature modules
```

## Prerequisites

- Node.js (v18 or higher)
- Redis server
- Google Cloud Console project (for OAuth)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd esmana-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   # Redis Configuration
   REDIS_HOST=localhost
   REDIS_PORT=6379
   REDIS_PASSWORD=
   
   # Token Configuration
   TOKEN_ACCESS_EXPIRES_IN=15m
   TOKEN_REFRESH_EXPIRES_IN=7d
   
   # Google OAuth Configuration
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
   ```

4. **Start Redis server**
   ```bash
   # Using Docker
   docker run -d -p 6379:6379 redis:alpine
   
   # Or install locally and start
   redis-server
   ```

5. **Set up Google OAuth** (optional)
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URI: `http://localhost:3000/auth/google/callback`
   - Copy Client ID and Client Secret to your `.env` file

## Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod

# Debug mode
npm run start:debug
```

The server will start on `http://localhost:3000`

## API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register new user | No |
| POST | `/auth/login` | Login with email/password | No |
| GET | `/auth/google` | Initiate Google OAuth | No |
| GET | `/auth/google/callback` | Google OAuth callback | No |
| POST | `/auth/refresh` | Refresh access token | No |
| POST | `/auth/logout` | Logout current session | Yes |
| POST | `/auth/logout-all` | Logout all sessions | Yes |
| GET | `/auth/profile` | Get user profile | Yes |
| GET | `/auth/health` | Health check | No |

### Example Requests

**Register:**
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

**Access Protected Route:**
```bash
curl -X GET http://localhost:3000/auth/profile \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

**Refresh Token:**
```bash
curl -X POST http://localhost:3000/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "YOUR_REFRESH_TOKEN"
  }'
```

## Redis Data Structure

The application uses Redis to store:

- **Users**: `esmana:user:{userId}` - User data
- **Sessions**: `esmana:session:{sessionId}` - Session information
- **Tokens**: `esmana:token:{tokenString}` - Token data with TTL
- **User Tokens**: `esmana:user_tokens:{userId}:{type}:{token}` - User token indexes
- **Blacklist**: `esmana:token_blacklist:{token}` - Blacklisted tokens
- **Indexes**: Various indexes for efficient lookups

## Security Features

- **Cryptographically Secure Random Tokens** (64 hex characters)
- **Instant Token Revocation** with Redis storage
- **Refresh Token Rotation** for enhanced security
- **Token Blacklisting** on logout
- **Password Hashing** with bcrypt (12 rounds)
- **CORS Protection** (configurable)
- **Rate Limiting** (can be added)
- **Input Validation** with class-validator
- **Stateful Session Management** for better control

## Development

### Project Structure

- **Domain Layer**: Contains business entities, enums, and repository interfaces
- **Infrastructure Layer**: Implements data access with Redis repositories
- **Application Layer**: Contains business logic, services, DTOs, and strategies
- **Presentation Layer**: Contains controllers, guards, and API-related code

### Adding New Features

1. Define domain entities in `src/domain/entities/`
2. Create repository interfaces in `src/domain/interfaces/repositories/`
3. Implement repositories in `src/infrastructure/repositories/`
4. Create service interfaces and implementations in `src/application/services/`
5. Add controllers in `src/presentation/controllers/`
6. Wire everything together in modules

### Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `REDIS_HOST` | Redis host | `localhost` |
| `REDIS_PORT` | Redis port | `6379` |
| `REDIS_PASSWORD` | Redis password | `` |
| `TOKEN_ACCESS_EXPIRES_IN` | Access token expiration | `15m` |
| `TOKEN_REFRESH_EXPIRES_IN` | Refresh token expiration | `7d` |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | Required for Google auth |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | Required for Google auth |

## Troubleshooting

### Redis Connection Issues
- Ensure Redis server is running
- Check Redis host and port configuration
- Verify Redis password if authentication is enabled

### Google OAuth Issues
- Verify Google Client ID and Secret
- Check authorized redirect URIs in Google Console
- Ensure callback URL matches exactly

### Token Issues
- Check token expiration times in configuration
- Ensure tokens are properly formatted in requests
- Verify Redis connectivity for token validation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

This project is licensed under the MIT License.
