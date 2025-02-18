const express = require('express');
const compression = require('compression');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Enable CORS for all origins
app.use(cors());

// Enable compression
app.use(compression());

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
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

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

let isShuttingDown = false;
let server;

// Graceful shutdown function
const gracefulShutdown = async () => {
    if (isShuttingDown) return;
    isShuttingDown = true;

    console.log('Starting graceful shutdown...');

    try {
        if (server) {
            await new Promise((resolve, reject) => {
                server.close((err) => {
                    if (err) {
                        console.error('Error during server close:', err);
                        reject(err);
                    } else {
                        console.log('Server closed gracefully');
                        resolve();
                    }
                });

                // Close any existing connections
                setTimeout(() => {
                    console.log('Forcing remaining connections to close');
                    resolve();
                }, 5000);
            });
        }
        console.log('Shutdown completed');
        process.exit(0);
    } catch (err) {
        console.error('Error during shutdown:', err);
        process.exit(1);
    }
};

// Handle termination signals
const signals = ['SIGTERM', 'SIGINT', 'SIGUSR2'];
signals.forEach(signal => {
    process.on(signal, () => {
        console.log(`${signal} received...`);
        gracefulShutdown();
    });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    gracefulShutdown();
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    gracefulShutdown();
});

// Start the server
server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 