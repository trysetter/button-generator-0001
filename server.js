const express = require('express');
const compression = require('compression');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}

// Create a write stream for logging
const logStream = fs.createWriteStream(path.join(logsDir, 'server.log'), { flags: 'a' });

// Custom logging function
const log = (message) => {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} - ${message}\n`;
    console.log(logMessage.trim());
    logStream.write(logMessage);
};

const app = express();
const PORT = process.env.PORT || 8080;

// Log environment information
log(`Starting server...`);
log(`Node Version: ${process.version}`);
log(`Environment: ${process.env.NODE_ENV || 'development'}`);
log(`Process ID: ${process.pid}`);

// Enable CORS for all origins
app.use(cors());

// Enable compression
app.use(compression());

// Request logging middleware
app.use((req, res, next) => {
    log(`${req.method} ${req.url}`);
    next();
});

// Error handling middleware
app.use((err, req, res, next) => {
    log(`Error: ${err.stack || err.message || err}`);
    res.status(500).send('Internal Server Error');
});

// Cache control middleware
const cacheControl = (maxAge) => (req, res, next) => {
    res.setHeader('Cache-Control', `public, max-age=${maxAge}`);
    next();
};

// Serve widget files with 1 day cache
app.use('/widget/whatsapp/v1', 
    cacheControl(86400),
    express.static(path.join(__dirname, 'public/widget/whatsapp/v1'), {
        setHeaders: (res, path) => {
            res.setHeader('Content-Type', 'application/javascript');
            res.setHeader('Access-Control-Allow-Origin', '*');
        }
    })
);

// Health check endpoint with detailed status
app.get('/health', (req, res) => {
    const status = {
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        pid: process.pid
    };
    log(`Health check: ${JSON.stringify(status)}`);
    res.status(200).json(status);
});

// Debug endpoint to view logs
app.get('/debug/logs', (req, res) => {
    try {
        const logs = fs.readFileSync(path.join(logsDir, 'server.log'), 'utf8');
        res.type('text/plain').send(logs);
    } catch (err) {
        log(`Error reading logs: ${err}`);
        res.status(500).send('Error reading logs');
    }
});

let isShuttingDown = false;
let server;

// Graceful shutdown function
const gracefulShutdown = () => {
    if (isShuttingDown) {
        log('Shutdown already in progress...');
        return;
    }
    
    isShuttingDown = true;
    log('Starting graceful shutdown...');

    // Immediately stop accepting new connections
    server.unref();

    // Force process exit after 1 second
    setTimeout(() => {
        log('Forcing process exit');
        process.exit(0);
    }, 1000);

    try {
        if (server) {
            const activeConnections = server._connections || 0;
            log(`Active connections: ${activeConnections}`);

            server.close((err) => {
                if (err) {
                    log(`Error during server close: ${err}`);
                    process.exit(1);
                } else {
                    log('Server closed gracefully');
                    process.exit(0);
                }
            });
        }
    } catch (err) {
        log(`Error during shutdown: ${err}`);
        process.exit(1);
    }
};

// Handle termination signals
['SIGTERM', 'SIGINT', 'SIGUSR2'].forEach(signal => {
    process.on(signal, () => {
        log(`${signal} signal received...`);
        gracefulShutdown();
    });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    log(`Uncaught Exception: ${err.stack || err}`);
    gracefulShutdown();
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    log(`Unhandled Rejection at: ${promise}\nReason: ${reason}`);
    gracefulShutdown();
});

// Start the server
server = app.listen(PORT, () => {
    log(`Server running on port ${PORT}`);
}); 