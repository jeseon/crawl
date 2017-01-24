var fs = require('fs');
var http = require('http');
var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var app = express();
 
app.get('/', function(req, res) {
    fs.readFile('index.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data)
    })
})
 
app.get('/imgs', function(req, res) {
    var url = req.query.url;
    
    request(url, function(err, req, body) {
        var $ = cheerio.load(body);
        var images = $('#resContents img.content_image');
        var imgs = [];
 
        images.each(function(item, index, array) {
            imgs.push($(this).attr("src"));
        })
 
        res.json({imgs: imgs});
    });
 
});
 
http.createServer(app).listen(3000, function() {
    console.log('Server listening on port 3000.');
});
