const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080; // Cloud Run uses PORT env variable

// Serve static files (in case we add CSS/images later)
app.use(express.static('public'));

// Main route - serve the INVEST evaluator
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Health check endpoint (good practice for Cloud Run)
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'healthy',
        timestamp: new Date().toISOString(),
        service: 'INVEST Requirements Evaluator'
    });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 INVEST Evaluator running on port ${PORT}`);
    console.log(`📊 Health check available at /health`);
});

module.exports = app;