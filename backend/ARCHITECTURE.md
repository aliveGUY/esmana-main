# Simplified Architecture Documentation

## Overview

The project has been refactored to use a simplified, traditional folder structure that's easy to navigate and understand.

## Folder Structure

```
src/
├── controllers/           # API Controllers (HTTP endpoints)
├── services/             # Business Logic Services
├── repositories/         # Data Access Layer
├── models/              # Models + DTOs
├── guards/              # Authentication Guards
├── strategies/          # Passport Strategies
├── config/              # Configuration Files
├── modules/             # NestJS Modules
├── infrastructure/      # External Services (Redis)
└── common/              # Shared Utilities
```

## Layer Responsibilities

### Controllers (`src/controllers/`)
- Handle HTTP requests and responses
- Input validation and transformation
- Route definitions
- Only contain API-related logic

**Files:**
- `auth.controller.ts` - Authentication endpoints

### Services (`src/services/`)
- Implement business logic
- Coordinate between repositories
- Handle complex operations
- Contain application rules

**Files:**
- `auth.service.ts` - Authentication business logic
- `user.service.ts` - User management logic
- `token.service.ts` - Token generation and validation

### Repositories (`src/repositories/`)
- Data access layer
- Database/Redis operations
- CRUD operations
- Data persistence logic

**Files:**
- `user.repository.ts` - User data operations
- `session.repository.ts` - Session data operations

### Models (`src/models/`)
- Data models and entities
- DTOs for API communication
- Enums and constants
- Type definitions

**Files:**
- `user.model.ts` - User entity
- `session.model.ts` - Session entity
- `token.model.ts` - Token entity and interfaces
- `auth.dto.ts` - Authentication DTOs
- `enums.ts` - All enums (AuthProvider, TokenType)

### Guards (`src/guards/`)
- Authentication and authorization
- Route protection
- Token validation

**Files:**
- `token-auth.guard.ts` - Redis token validation
- `local-auth.guard.ts` - Local login guard
- `google-auth.guard.ts` - Google OAuth guard

### Strategies (`src/strategies/`)
- Passport authentication strategies
- OAuth implementations
- Login validation logic

**Files:**
- `local.strategy.ts` - Email/password authentication
- `google.strategy.ts` - Google OAuth strategy

## Key Features

### Redis-Based Token Authentication
- **No JWTs**: Uses secure random tokens stored in Redis
- **Instant Revocation**: Tokens can be immediately invalidated
- **Session Management**: Full control over user sessions
- **Token Types**: Access and refresh tokens with different TTLs

### Data Flow

1. **Authentication Request** → Controller
2. **Business Logic** → Service
3. **Data Operations** → Repository
4. **Redis Storage** → Infrastructure

### Benefits of This Structure

1. **Simple Navigation**: Easy to find files by functionality
2. **Clear Separation**: Each folder has a single responsibility
3. **Familiar Pattern**: Similar to many other frameworks
4. **Easy Onboarding**: New developers can understand quickly
5. **Maintainable**: Changes are localized to specific layers

## API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/google` - Google OAuth initiation
- `GET /auth/google/callback` - Google OAuth callback
- `POST /auth/refresh` - Token refresh
- `POST /auth/logout` - Single session logout
- `POST /auth/logout-all` - All sessions logout
- `GET /auth/profile` - Get user profile
- `GET /auth/health` - Health check

## Configuration

### Environment Variables
```env
# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0
REDIS_KEY_PREFIX=esmana:

# Token Configuration
TOKEN_ACCESS_EXPIRES_IN=15m
TOKEN_REFRESH_EXPIRES_IN=7d

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
```

## Redis Data Structure

```
esmana:user:{userId} -> User data
esmana:session:{sessionId} -> Session data
esmana:token:{tokenString} -> Token data with TTL
esmana:user_tokens:{userId}:{type}:{token} -> User token indexes
esmana:token_blacklist:{token} -> Blacklisted tokens
```

## Security Features

- **Cryptographically Secure Tokens**: 64-character hex tokens
- **Automatic Expiration**: Redis TTL handles token expiration
- **Token Blacklisting**: Immediate token invalidation
- **Session Tracking**: Full session lifecycle management
- **Password Hashing**: bcrypt with 12 rounds
- **Input Validation**: class-validator decorators

This architecture provides a clean, maintainable, and scalable foundation for the authentication system.
