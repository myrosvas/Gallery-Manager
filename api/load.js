const path = require('path');
const fs = require('fs');

export default function (req, res, next) {
  const drive = req.query && req.query.drive || 'gallery';
  const directoryPath = path.join(__dirname, `../static/${drive}/`);
  const images = [];

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    files.forEach(function (file) {
      images.push(`/${drive}/` + file);
    });
    res.json(images);
    next();
  });
}
