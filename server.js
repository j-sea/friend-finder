// Import necessary Node.js packages
var express = require('express');

// Create our express server
var app = express();

// Set up a port variable that Heroku will be able to use
var PORT = process.env.PORT || 7777;

// Set up our express server to parse post data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// These are the HTML routes for Web visitors
var htmlRoutes = require('./app/routing/htmlRoutes');
app.use(htmlRoutes);

// These are the data routes for API usage
var apiRoutes = require('./app/routing/apiRoutes');
app.use('/api', apiRoutes);

//set up app to listen for request
app.listen(PORT);
