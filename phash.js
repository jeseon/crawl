var imghash = require('imghash');
var hamming = require('hamming-distance');
var hash1 = imghash.hash('./data/koala/1.jpg');
var hash2 = imghash.hash('./data/koala/2.jpg');

Promise
  .all([hash1, hash2])
  .then((results) => {
    const dist = 1 - hamming(results[0], results[1]) / 64.0;

    console.log(hash1);
    console.log(hash2);
    console.log(`Distance between images is: ${dist}`);
  });
