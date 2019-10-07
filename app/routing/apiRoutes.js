// Import our Node.js packages
var express = require('express');

// Get a new instance of an Express Router
var router = express.Router();

// Set up our external routing for GET requests on our friends API
router.get('/friends', require('./api/get-friends'));

// Set up our external routing for POST requests on our friends API
router.post('/friends', require('./api/post-friends'));

// Export our API routes
module.exports = router;