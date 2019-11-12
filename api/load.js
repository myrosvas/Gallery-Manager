const path = require('path');
const fs = require('fs');

export default function (req, res, next) {
  const directoryPath = path.join(__dirname, '../static/gallery');
  const images = [];

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    files.forEach(function (file) {
      images.push('/gallery/' + file);
    });
    res.json(images);
    next();
  });
}
