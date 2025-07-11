# 🔗 URL Shortener Microservice

A full-stack URL shortener application with a Node.js backend and React frontend. This project provides URL shortening capabilities with analytics, rate limiting, and security features.

## 🚀 Features

### Backend Features
- ✅ **URL Shortening**: Convert long URLs into short, shareable links
- ✅ **Custom Shortcodes**: Allow users to specify custom shortcodes
- ✅ **Expiry Management**: Set validity periods for shortened URLs (default: 30 minutes)
- ✅ **Click Analytics**: Track click statistics and geolocation data
- ✅ **Rate Limiting**: 100 requests per 15 minutes per IP
- ✅ **Security**: Helmet.js for security headers, CORS protection
- ✅ **Input Validation**: Comprehensive URL and input validation
- ✅ **Logging**: Custom logging middleware with file and console output
- ✅ **Auto Cleanup**: Automatic removal of expired URLs
- ✅ **Health Check**: `/health` endpoint for monitoring

### Frontend Features
- ✅ **Modern React UI**: Clean, responsive user interface
- ✅ **URL Shortening Form**: Easy-to-use form for creating short URLs
- ✅ **Statistics Dashboard**: View click analytics and data
- ✅ **Real-time Updates**: Dynamic content updates
- ✅ **Mobile Responsive**: Works on all device sizes

## 🛠️ Tech Stack

### Backend
- **Node.js** with Express.js
- **In-memory storage** (can be extended to databases)
- **Security**: Helmet.js, CORS, Rate Limiting
- **Validation**: Custom validators with validator.js
- **Geolocation**: geoip-lite for location tracking
- **Testing**: Jest and Supertest

### Frontend
- **React 18** with functional components
- **Create React App** setup
- **CSS3** for styling
- **Fetch API** for backend communication

## 📁 Project Structure

```
├── Backend Test Submission/
│   └── backend/
│       ├── src/
│       │   ├── app.js                 # Main application file
│       │   ├── middleware/
│       │   │   └── logger.js          # Custom logging middleware
│       │   ├── models/
│       │   │   └── urlStorage.js      # In-memory URL storage
│       │   ├── routes/
│       │   │   └── urlRoutes.js       # URL shortening routes
│       │   └── utils/
│       │       └── helpers.js         # Utility functions
│       ├── logs/                      # Application logs
│       ├── package.json
│       └── LOGGER_README.md
├── Frontend Test Submission/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.js
│   │   │   ├── StatisticsTable.js
│   │   │   └── URLShortenerForm.js
│   │   ├── pages/
│   │   │   ├── HomePage.js
│   │   │   └── StatisticsPage.js
│   │   ├── services/
│   │   │   └── apiService.js
│   │   └── utils/
│   │       ├── logger.js
│   │       └── validation.js
│   └── package.json
└── Logging Middleware/
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd "Backend Test Submission/backend"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Or start in production mode:**
   ```bash
   npm start
   ```

The backend will run on `http://localhost:8080`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd "Frontend Test Submission"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

The frontend will run on `http://localhost:3000`

## 📚 API Documentation

### Base URL
```
http://localhost:8080
```

### Endpoints

#### 1. Create Short URL
```http
POST /shorturls
Content-Type: application/json

{
  "url": "https://example.com/very-long-url",
  "validity": 60,           // optional, minutes (default: 30)
  "shortcode": "custom123"  // optional custom shortcode
}
```

**Response:**
```json
{
  "shortLink": "http://localhost:8080/abc123",
  "expiry": "2025-01-11T11:30:00.000Z"
}
```

#### 2. Redirect Short URL
```http
GET /{shortcode}
```
Redirects to the original URL or returns 404 if expired/not found.

#### 3. Get Statistics
```http
GET /shorturls/{shortcode}
```

**Response:**
```json
{
  "url": "https://example.com/very-long-url",
  "shortcode": "abc123",
  "totalClicks": 15,
  "uniqueClicks": 8,
  "clicksByCountry": {
    "US": 10,
    "CA": 3,
    "GB": 2
  },
  "recentClicks": [
    {
      "timestamp": "2025-01-11T10:15:30.000Z",
      "country": "US",
      "ip": "192.168.1.1"
    }
  ],
  "createdAt": "2025-01-11T10:00:00.000Z",
  "expiresAt": "2025-01-11T11:00:00.000Z"
}
```

#### 4. Health Check
```http
GET /health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-01-11T10:30:45.123Z",
  "service": "URL Shortener Microservice",
  "version": "1.0.0"
}
```

## 🧪 Testing

### Backend Tests
```bash
cd "Backend Test Submission/backend"
npm test
```

Tests include:
- URL validation
- Shortcode generation
- API endpoint testing
- Error handling
- Rate limiting

## 🔒 Security Features

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS Protection**: Configured for specific origins
- **Input Sanitization**: All inputs are sanitized and validated
- **Security Headers**: Helmet.js for security headers
- **URL Validation**: Comprehensive URL validation
- **XSS Protection**: Input sanitization prevents XSS attacks

## 📊 Logging

The application includes comprehensive logging:

- **Console Logs**: Colored output with emojis for easy reading
- **File Logs**: JSON structured logs saved to `logs/app.log`
- **HTTP Logging**: Automatic request/response logging
- **Error Tracking**: Detailed error logging with stack traces

See `LOGGER_README.md` for detailed logging documentation.

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
NODE_ENV=development
PORT=8080
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
URL_EXPIRY_MINUTES=30
```

## 🚦 Error Handling

The application includes comprehensive error handling:

- **Validation Errors**: Clear error messages for invalid inputs
- **Rate Limiting**: Proper rate limit exceeded responses
- **404 Handling**: Not found errors for expired/invalid URLs
- **500 Errors**: Internal server error handling with logging
- **CORS Errors**: Proper CORS error responses

## 📈 Performance Features

- **In-Memory Storage**: Fast URL lookups and statistics
- **Automatic Cleanup**: Expired URLs are automatically removed
- **Rate Limiting**: Prevents abuse and maintains performance
- **Efficient Logging**: Optimized logging for minimal performance impact

## 🌐 Deployment

### Backend Deployment
1. Set environment variables for production
2. Install dependencies: `npm install --production`
3. Start the server: `npm start`

### Frontend Deployment
1. Build the production version: `npm run build`
2. Serve the `build` folder using a static file server

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Ramshiva**
- GitHub: [@Ramshiva1905](https://github.com/Ramshiva1905)

## 🙏 Acknowledgments

- Express.js team for the excellent web framework
- React team for the frontend library
- All open source contributors whose packages made this project possible

---

## 📞 Support

If you have any questions or issues, please:
1. Check the logs in `logs/app.log`
2. Verify your environment variables
3. Ensure all dependencies are installed
4. Check the health endpoint: `http://localhost:8080/health`

For more help, create an issue in the repository.
