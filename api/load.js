const path = require('path');
const fs = require('fs');
const probe = require('probe-image-size');

export default function (req, res, next) {
  const drive = req.query && req.query.drive || 'gallery';
  const directoryPath = path.join(__dirname, `../static/${drive}/`);
  const images = [];

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      console.error(err);
      res.send([]);
      // return next();
    }

    let done = 0;
    const count = files.length;

    files.forEach(function (file) {
      const fullPath = path.join(directoryPath, file);
      const isDir = fs.statSync(fullPath).isDirectory();

      if (isDir) {
        ++done;
        if (done === count) {
          res.send(images);
          next();
          return false;
        }
        return false;
      }

      const url = `/${drive}/${file}`;
      const input = fs.createReadStream(fullPath);

      probe(input)
        .then(dimensions => {
          const { width = 0, height = 0 } = dimensions;
          const imgObj = {
            url,
            width,
            height,
            name: file,
            path: url,
          }

          images.push(imgObj);
          ++done;
          input.destroy();
        })
        .catch(() => {
          ++done;
          input.destroy();
        })
        .finally(() => {
          if (done === count) {
            res.send(images);
            // next();
          }
        })
    });
  });
}
