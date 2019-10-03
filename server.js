var express = require('express');
var path = require('path');
var mysql = require('mysql');
var mysqlSettings = require('./mysql-settings');

var app = express();
var PORT = process.env.PORT || 7777;

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'main.html'));
});

app.listen(PORT);