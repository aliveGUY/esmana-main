# Hybrid Redis + MySQL Architecture

## Overview

The system now uses a hybrid architecture combining Redis Cloud for caching/tokens and MySQL for persistent data storage. This provides the best of both worlds: fast token validation with Redis and reliable data persistence with MySQL.

## Architecture Components

### 1. **Redis Cloud (Primary Use Cases)**
- **Token Storage**: Access and refresh tokens with TTL
- **Session Caching**: Active session data for fast lookup
- **Token Blacklisting**: Immediate token revocation
- **Rate Limiting**: (Future implementation)

### 2. **MySQL Database (Primary Use Cases)**
- **User Data**: Persistent user accounts and profiles
- **Session History**: Long-term session tracking
- **Audit Logs**: (Future implementation)
- **Application Data**: All business logic data

## Data Flow Strategy

### Authentication Flow
```
1. Login Request → MySQL (user validation)
2. Generate Tokens → Redis (store with TTL)
3. Create Session → MySQL (persistent) + Redis (cache)
4. Token Validation → Redis (fast lookup)
5. User Data → Redis (cache) or MySQL (fallback)
```

### Hybrid Repository Pattern
```typescript
// Services use both repositories
class UserService {
  constructor(
    private mysqlUserRepo: MySQLUserRepository,    // Persistent data
    private redisUserCache: UserRepository,       // Caching layer
    private tokenService: TokenService,           // Redis tokens
  ) {}
}
```

## Configuration

### Redis Cloud Configuration
```env
REDIS_USERNAME=default
REDIS_PASSWORD=uxDFwLQFwyKvetm9971nNRx4DnKscDCy
REDIS_HOST=redis-19236.crce198.eu-central-1-3.ec2.redns.redis-cloud.com
REDIS_PORT=19236
REDIS_DB=0
REDIS_KEY_PREFIX=esmana:
```

### MySQL Configuration
```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_NAME=esmana
NODE_ENV=development
```

## Database Schema

### MySQL Tables

#### Users Table
```sql
CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255),
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  google_id VARCHAR(255) UNIQUE,
  profile_picture TEXT,
  provider ENUM('local', 'google') DEFAULT 'local',
  is_email_verified BOOLEAN DEFAULT FALSE,
  roles JSON DEFAULT ('["user"]'),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### Sessions Table
```sql
CREATE TABLE sessions (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  access_token VARCHAR(500) NOT NULL,
  refresh_token VARCHAR(500) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  ip_address VARCHAR(45),
  user_agent VARCHAR(1000),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### Redis Data Structure
```
esmana:token:{tokenString} -> TokenData (with TTL)
esmana:user_tokens:{userId}:{type}:{token} -> token reference
esmana:token_blacklist:{token} -> blacklisted tokens
esmana:user:{userId} -> cached user data
esmana:session:{sessionId} -> cached session data
```

## Repository Structure

```
src/repositories/
├── mysql/                    # MySQL repositories (persistent data)
│   ├── user.repository.ts
│   └── session.repository.ts
├── user.repository.ts        # Redis user cache
└── session.repository.ts     # Redis session cache
```

## Service Integration

### User Service (Hybrid Approach)
```typescript
@Injectable()
export class UserService {
  constructor(
    @Inject('IMySQLUserRepository') private mysqlRepo: MySQLUserRepository,
    @Inject('IUserRepository') private redisRepo: UserRepository,
  ) {}

  async findById(id: string): Promise<User | null> {
    // Try Redis cache first
    let user = await this.redisRepo.findById(id);
    
    if (!user) {
      // Fallback to MySQL
      const entity = await this.mysqlRepo.findById(id);
      if (entity) {
        user = this.mysqlRepo.entityToModel(entity);
        // Cache in Redis for future requests
        await this.redisRepo.create(user);
      }
    }
    
    return user;
  }

  async createUser(userData: CreateUserDto): Promise<User> {
    // Create in MySQL (persistent)
    const entity = await this.mysqlRepo.create(userData);
    const user = this.mysqlRepo.entityToModel(entity);
    
    // Cache in Redis
    await this.redisRepo.create(user);
    
    return user;
  }
}
```

## Benefits of Hybrid Architecture

### 1. **Performance**
- **Fast Authentication**: Redis token validation (~1ms)
- **Cached User Data**: Frequent lookups from Redis
- **Persistent Storage**: MySQL for reliability

### 2. **Scalability**
- **Redis Clustering**: Horizontal scaling for cache
- **MySQL Replication**: Read replicas for heavy queries
- **Independent Scaling**: Scale cache and database separately

### 3. **Reliability**
- **Data Persistence**: MySQL ensures no data loss
- **Cache Invalidation**: Redis TTL handles cleanup
- **Fallback Strategy**: MySQL as backup when Redis is down

### 4. **Security**
- **Instant Token Revocation**: Redis blacklisting
- **Session Management**: Full control over active sessions
- **Audit Trail**: MySQL for security logging

## Development Workflow

### 1. **Database Setup**
```bash
# Start MySQL
mysql -u root -p
CREATE DATABASE esmana;

# Start Redis (already configured with Redis Cloud)
# No local setup needed
```

### 2. **Run Migrations**
```bash
# TypeORM will auto-sync in development
npm run start:dev
```

### 3. **Testing**
```bash
# Test Redis connection
curl http://localhost:3000/auth/health

# Test user registration (MySQL + Redis)
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","firstName":"Test","lastName":"User"}'
```

## Monitoring & Maintenance

### Redis Monitoring
- Monitor Redis Cloud dashboard
- Track token creation/validation rates
- Monitor memory usage and TTL effectiveness

### MySQL Monitoring
- Monitor connection pool usage
- Track query performance
- Set up automated backups

### Cache Strategy
- **Write-Through**: Write to MySQL, then cache in Redis
- **Cache-Aside**: Check Redis first, fallback to MySQL
- **TTL Management**: Automatic expiration for stale data

## Future Enhancements

1. **Read Replicas**: MySQL read replicas for scaling
2. **Redis Clustering**: Multiple Redis instances
3. **Data Synchronization**: Background jobs to sync cache
4. **Analytics**: Redis for real-time metrics
5. **Rate Limiting**: Redis-based rate limiting

This hybrid architecture provides a robust, scalable foundation that leverages the strengths of both Redis and MySQL while maintaining the simplified folder structure you requested.
