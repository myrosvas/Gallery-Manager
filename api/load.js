const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

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

    const thumbDir = 'thumb';
    const thumbDirPath = path.join(__dirname, `../static/${thumbDir}`);

    if (!fs.existsSync(thumbDirPath)) {
      fs.mkdirSync(thumbDirPath);
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
      const newName = `${file}.webp`;
      const thumbUrl = `/${thumbDir}/${newName}`;
      // const input = fs.createReadStream(fullPath);
      const fullThumbUrl = path.resolve(__dirname, `../static/${thumbDir}/${newName}`);

      sharp(fullPath)
        .resize(150)
        .webp()
        .toFile(fullThumbUrl)
        .then((dimensions) => {
          const { width, height } = dimensions;
          const imgObj = {
            url,
            width,
            height,
            name: file,
            thumbUrl
          }

          images.push(imgObj);
          ++done;
        })
        .catch((e) => {
          console.log(e);
          ++done;
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
