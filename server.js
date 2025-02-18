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

let server;

// Start the server
server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown function
const gracefulShutdown = () => {
    console.log('Starting graceful shutdown...');
    
    if (server) {
        server.close(() => {
            console.log('Server closed gracefully');
            process.exit(0);
        });

        // Force close after 10 seconds
        setTimeout(() => {
            console.log('Forcing server shutdown...');
            process.exit(1);
        }, 10000);
    }
};

// Handle termination signals
process.on('SIGTERM', () => {
    console.log('SIGTERM received...');
    gracefulShutdown();
});

process.on('SIGINT', () => {
    console.log('SIGINT received...');
    gracefulShutdown();
}); 