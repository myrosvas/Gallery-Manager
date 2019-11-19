const path = require('path');
const fs = require('fs');

export default function (req, res, next) {
  const drive = req.query && req.query.drive || 'gallery';
  const directoryPath = path.join(__dirname, `../static/${drive}/`);
  const images = [];

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      console.error(err);
      res.send([]);
      return next();
    }
    files.forEach(function (file) {
      const fullPath = path.join(directoryPath, file);
      const isDir = fs.statSync(fullPath).isDirectory();

      if (isDir) return false;

      const url = `/${drive}/${file}`;
      const imgObj = {
        url,
        name: file,
        path: url,
      }

      images.push(imgObj);
    });
    res.json(images);
    next();
  });
}
