const http = require('http');
const fs = require('fs');
const path = require('path');

// Graceful shutdown handling
process.on('SIGTERM', () => {
    console.log('Received SIGTERM. Performing graceful shutdown...');
    server.close(() => {
        console.log('Server closed. Exiting process.');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('Received SIGINT. Performing graceful shutdown...');
    server.close(() => {
        console.log('Server closed. Exiting process.');
        process.exit(0);
    });
});

const server = http.createServer((req, res) => {
    // Log incoming requests (excluding potential health checks)
    if (!req.url.includes('/health')) {
        console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    }

    // Add CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    // Health check endpoint
    if (req.url === '/health') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'healthy' }));
        return;
    }

    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './test.html';
    }

    const extname = path.extname(filePath);
    let contentType = 'text/html';
    
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.svg':
            contentType = 'image/svg+xml';
            break;
    }

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if(error.code === 'ENOENT') {
                console.error(`File not found: ${filePath}`);
                res.writeHead(404);
                res.end('File not found');
            } else {
                console.error(`Server error: ${error.code} for ${filePath}`);
                res.writeHead(500);
                res.end('Server Error: ' + error.code);
            }
        } else {
            // Add caching headers for JavaScript files
            if (extname === '.js') {
                res.setHeader('Cache-Control', 'public, max-age=86400'); // 24 hours
            }
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`${new Date().toISOString()} - Server started on port ${PORT}`);
    console.log(`Widget available at: https://mindvalleybutton-production.up.railway.app/widget/whatsapp/v1/embed.js`);
}); 