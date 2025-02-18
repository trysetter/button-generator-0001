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
});

// Handle shutdown
const shutdown = () => {
    if (isShuttingDown) return;
    isShuttingDown = true;
    
    server.close(() => {
        log('Server closed');
        process.exit(0);
    });

    // Force close after 2 seconds
    setTimeout(() => {
        log('Forcing process exit');
        process.exit(0);
    }, 2000);
};

// Handle shutdown signals
process.on('SIGTERM', () => {
    log('SIGTERM received');
    shutdown();
});

process.on('SIGINT', () => {
    log('SIGINT received');
    shutdown();
}); 