var fs = require('fs');
var path = require('path');
var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.set('view engine', 'pug');

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/images', function(req, res) {
    var url = req.query.url;

    request(url, function(err, req, body) {
        var $ = cheerio.load(body);
        var imgs = $('#resContents div.attachedImage img, #resContents #writeContents img.content_image');
        var images = [];

        imgs.each(function(idx, img) {
            var img_src = img.attribs.src;
            var img_name = path.basename(img_src);
            var img_path = __dirname + '/data/' + img_name;

            request(img_src).pipe(fs.createWriteStream(img_path));
            images.push(img_src);
        });

        res.json({images: images});
    });

});

app.listen(3000, function () {
    console.log('Server listening on port 3000.');
});
