const fs = require('fs');
const path = require('path');

class SimpleLogger {
  constructor() {
    this.logDir = path.join(__dirname, '../../logs');
    this.ensureLogDirectory();
  }

  ensureLogDirectory() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  getTimestamp() {
    return new Date().toISOString();
  }

  formatLog(level, message, data = null) {
    const logObject = {
      timestamp: this.getTimestamp(),
      level: level.toUpperCase(),
      message: message
    };

    if (data) {
      logObject.data = data;
    }

    return JSON.stringify(logObject, null, 2) + '\n';
  }

  writeLog(content) {
    const logFile = path.join(this.logDir, 'app.log');
    try {
      fs.appendFileSync(logFile, content);
    } catch (error) {
      console.error('Failed to write to log file:', error.message);
    }
  }

  info(message, data = null) {
    const logEntry = this.formatLog('info', message, data);
    this.writeLog(logEntry);
    console.log(`📘 INFO: ${message}`, data ? data : '');
  }

  error(message, data = null) {
    const logEntry = this.formatLog('error', message, data);
    this.writeLog(logEntry);
    console.error(`🔴 ERROR: ${message}`, data ? data : '');
  }

  warn(message, data = null) {
    const logEntry = this.formatLog('warn', message, data);
    this.writeLog(logEntry);
    console.warn(`🟡 WARN: ${message}`, data ? data : '');
  }

  debug(message, data = null) {
    if (process.env.NODE_ENV === 'development') {
      const logEntry = this.formatLog('debug', message, data);
      this.writeLog(logEntry);
      console.log(`🔍 DEBUG: ${message}`, data ? data : '');
    }
  }

  success(message, data = null) {
    const logEntry = this.formatLog('success', message, data);
    this.writeLog(logEntry);
    console.log(`✅ SUCCESS: ${message}`, data ? data : '');
  }
}

// Create logger instance
const logger = new SimpleLogger();

// Simple middleware for logging HTTP requests
const loggingMiddleware = (req, res, next) => {
  const startTime = Date.now();
  const { method, url, ip } = req;

  // Log incoming request
  logger.info(`${method} ${url}`, {
    ip: ip || req.connection.remoteAddress,
    userAgent: req.get('User-Agent')
  });

  // Capture response details
  const originalSend = res.send;
  res.send = function(data) {
    const duration = Date.now() - startTime;
    logger.info(`${method} ${url} - ${res.statusCode}`, {
      duration: `${duration}ms`,
      ip: ip || req.connection.remoteAddress
    });
    originalSend.call(this, data);
  };

  next();
};

module.exports = {
  logger,
  loggingMiddleware
};
