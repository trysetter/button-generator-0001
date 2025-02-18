const express = require('express');
const compression = require('compression');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all origins
app.use(cors());

// Enable compression
app.use(compression());

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

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 