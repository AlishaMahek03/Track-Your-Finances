const http = require('http');
const express = require('express');
const app = require('./app');
const server = http.createServer(app);
const port = process.env.PORT || 3000; 


// Start server
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});