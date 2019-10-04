// Import the necessary Node.js packages
var express = require('express');
var path = require('path');

// Set up a router for the routing to be used in another file
var router = express.Router();

// Add page HTML routes
router.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'../public/home.html'))
});

router.get('/survey',function(req,res){
    res.sendFile(path.join(__dirname,'../public/survey.html'))
});

module.exports = router;