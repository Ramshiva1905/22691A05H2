# Simple Logger Usage Guide

## Overview
This is a simple, lightweight logger for your URL Shortener backend application. It provides both console output and file logging capabilities.

## Features
- ✅ Console logging with colored output and emojis
- ✅ File logging to `logs/app.log`
- ✅ JSON structured logs
- ✅ Multiple log levels (info, error, warn, debug, success)
- ✅ Automatic log directory creation
- ✅ HTTP request/response logging middleware

## Usage

### Basic Logging
```javascript
const { logger } = require('./middleware/logger');

// Info logs
logger.info('Server started successfully');
logger.info('User action completed', { userId: 123, action: 'login' });

// Error logs
logger.error('Database connection failed');
logger.error('Validation error', { field: 'email', value: 'invalid-email' });

// Warning logs
logger.warn('Deprecated API endpoint used');
logger.warn('Rate limit approaching', { requests: 95, limit: 100 });

// Success logs
logger.success('URL shortened successfully');
logger.success('User registered', { email: 'user@example.com' });

// Debug logs (only shown in development)
logger.debug('Debug information', { variable: someValue });
```

### HTTP Middleware
The logger automatically captures HTTP requests when you use the middleware:

```javascript
const { loggingMiddleware } = require('./middleware/logger');
app.use(loggingMiddleware);
```

This logs:
- Incoming requests with method, URL, IP, and user agent
- Response status and duration

## Log Format
Logs are saved as JSON objects:

```json
{
  "timestamp": "2025-01-11T10:30:45.123Z",
  "level": "INFO",
  "message": "User login successful",
  "data": {
    "userId": 123,
    "email": "user@example.com"
  }
}
```

## Console Output
Console logs include emoji indicators:
- 📘 INFO
- 🔴 ERROR  
- 🟡 WARN
- ✅ SUCCESS
- 🔍 DEBUG

## Log Files
All logs are saved to `logs/app.log` in the backend directory.

## Environment
- Debug logs only appear in development mode
- Set `NODE_ENV=development` to see debug logs

## Example Implementation
```javascript
// In your route
router.post('/api/endpoint', (req, res) => {
  logger.info('Processing request', { endpoint: '/api/endpoint' });
  
  try {
    // Your logic here
    logger.success('Request processed successfully');
    res.json({ success: true });
  } catch (error) {
    logger.error('Request failed', { error: error.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

That's it! The logger is now simple, clean, and easy to use throughout your application.
