var fs = require('fs');
var path = require('path');
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
        var imgs = $('#resContents div.attachedImage img, #resContents #writeContents img.content_image');
        var images = [];
 
        imgs.each(function(idx, img) {
            var img_src = img.attribs.src;
            var img_name = path.basename(img_src);
            var img_path = __dirname + '/images/' + img_name;
            
            request(img_src).pipe(fs.createWriteStream(img_path));
            images.push(img_src);
        });
 
        res.json({imgs: images});
    });
 
});

app.listen(3000, function () {
    console.log('Server listening on port 3000.');
});
