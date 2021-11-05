"use strict";
exports.__esModule = true;
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var fs = require("fs");
var app = express();
var PORT = 3000;
var DIST_PATH = path.resolve(__dirname, '../dist');
var HTML_FILE = path.resolve(DIST_PATH, 'index.html');
var DB_PATH = path.resolve(__dirname, './db');
var CARDS_FILE = path.resolve(DB_PATH, 'cards.json');
app.use(express.static(DIST_PATH));
app.use(bodyParser.json());
var urlencodedParser = express.urlencoded({ extended: false });
app.get('/api/cards', function (req, res) {
    res.sendFile(CARDS_FILE);
});
app.put('/api/cards', urlencodedParser, function (req, res) {
    var stringCards = JSON.stringify(req.body, null, '\n');
    fs.writeFile(CARDS_FILE, stringCards, function (err) {
        if (err)
            throw err;
    });
    res.send(req.statusCode);
});
app.get('*', function (req, res) {
    res.sendFile(HTML_FILE);
});
app.listen(PORT, function () {
    console.log("Server started on PORT: " + PORT);
});
