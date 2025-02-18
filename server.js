const express = require('express');
const compression = require('compression');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Simple console logging
const log = (message) => {
    console.log(`${new Date().toISOString()} - ${message}`);
};

// Log startup information
log('Starting server...');
log(`Node Version: ${process.version}`);
log(`Environment: ${process.env.NODE_ENV || 'development'}`);
log(`Process ID: ${process.pid}`);

// Enable CORS and compression
app.use(cors());
app.use(compression());

// Request logging
app.use((req, res, next) => {
    log(`${req.method} ${req.url}`);
    next();
});

// Error handling
app.use((err, req, res, next) => {
    log(`Error: ${err.stack || err.message || err}`);
    res.status(500).send('Internal Server Error');
});

// Cache control
const cacheControl = (maxAge) => (req, res, next) => {
    res.setHeader('Cache-Control', `public, max-age=${maxAge}`);
    next();
};

// Serve widget files
app.use('/widget/whatsapp/v1', 
    cacheControl(86400),
    express.static(path.join(__dirname, 'public/widget/whatsapp/v1'), {
        setHeaders: (res, path) => {
            res.setHeader('Content-Type', 'application/javascript');
            res.setHeader('Access-Control-Allow-Origin', '*');
        }
    })
);

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        pid: process.pid
    });
});

let isShuttingDown = false;

// Start server
const server = app.listen(PORT, () => {
    log(`Server running on port ${PORT}`);
    
    // Tell PM2 that we're ready
    if (process.send) {
        process.send('ready');
    }
});

// Graceful shutdown
const shutdown = () => {
    if (isShuttingDown) {
        log('Shutdown already in progress');
        return;
    }
    
    isShuttingDown = true;
    log('Starting graceful shutdown...');

    // Stop accepting new connections
    server.unref();
    
    // Close server
    server.close(() => {
        log('Server closed');
        process.exit(0);
    });

    // Force shutdown after 800ms
    setTimeout(() => {
        log('Forcing shutdown');
        process.exit(0);
    }, 800);
};

// Handle shutdown signals
['SIGTERM', 'SIGINT', 'SIGUSR2'].forEach(signal => {
    process.on(signal, () => {
        log(`${signal} received`);
        shutdown();
    });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    log(`Uncaught Exception: ${err.stack || err}`);
    shutdown();
});

// Handle unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
    log(`Unhandled Rejection at: ${promise}\nReason: ${reason}`);
    shutdown();
}); 