const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const { promisify } = require('util');
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);

export default async (req, res, next) => {
  const drive = req.query && req.query.drive || 'gallery';
  const directoryPath = path.join(__dirname, `../static/${drive}/`);
  const images = [];
  let files = [];

  try {
    files = await readdir(directoryPath);
  } catch (e) {
    console.error(e);
    return res.send(files);
  }

  const count = files.length;

  if (count === 0) return res.send(files);

  const thumbDir = 'thumb';
  const thumbDirPath = path.join(__dirname, `../static/${thumbDir}`);
  let done = 0;

  if (!fs.existsSync(thumbDirPath)) {
    fs.mkdirSync(thumbDirPath);
  }

  files.forEach(async (file) => {
    const fullPath = path.join(directoryPath, file);
    const stats = await stat(fullPath);
    const { size, mtime, ino } = stats;
    const isDir = stats.isDirectory();

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
    const newName = `${ino}.webp`;
    const thumbUrl = `/${thumbDir}/${newName}`;
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
          thumbUrl,
          size,
          mtime
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
        }
      })
  });
}
