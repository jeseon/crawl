var fs = require('fs');
var path = require('path');
var imghash = require('imghash');
var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var models = require('./models');
var app = express();

models.Post.hasMany(models.Image);

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

        if (imgs) {
            models.Post.create({
                site_id: 1,
                no: urlParse[1],
                url: urlParse[0],
                title: $('div.view_title span').text(),
                date: models.sequelize.fn('NOW')
            }).then((post) => {
                imgs.each((idx, img) => {
                    var imgSrc = img.attribs.src;
                    var imgName = path.basename(imgSrc);
                    var imgPath = __dirname + '/data/' + imgName;
                    var stream = request(imgSrc).pipe(fs.createWriteStream(imgPath));

                    stream.on('finish', () => {
                        imghash.hash(imgPath).then((result) => {
                            models.Image.create({
                                url: imgSrc,
                                name: imgName,
                                hash: result,
                                post_id: post.id
                            });
                        });
                    });

                    images.push(imgSrc);
                });

                res.json({images: images});
            });
        }
    });
});

app.listen(3000, () => {
    console.log('Server listening on port 3000.');
});
