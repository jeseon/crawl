var fs = require('fs');
var path = require('path');
var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var models = require('./models');
var app = express();

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/images', (req, res) => {
    var url = req.query.url;
    var urlPattern = /http:\/\/[a-zA-Z0-9._=/?]+&wr_id=([0-9]+)/;

    request(url, (err, req, body) => {
        var $ = cheerio.load(body);
        var imgs = $('#resContents div.attachedImage img, #resContents #writeContents img.content_image');
        var images = [];
        var urlParse = url.match(urlPattern);

        models.Post.create({
            site_id: 1,
            no: urlParse[1],
            title: $('div.view_title span').text(),
            url: urlParse[0],
            date: models.sequelize.fn('NOW')
        }).then((result) => {
            console.log(result);
        }).catch((err) => {
            console.log(err);
        });

        imgs.each((idx, img) => {
            var imgSrc = img.attribs.src;
            var imgName = path.basename(imgSrc);
            var imgPath = __dirname + '/data/' + imgName;

            request(imgSrc).pipe(fs.createWriteStream(imgPath));
            images.push(imgSrc);
        });

        res.json({images: images});
    });
});

app.listen(3000, () => {
    console.log('Server listening on port 3000.');
});
