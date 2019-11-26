const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const { promisify } = require('util');
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

export default async (req, res, next) => {
  const drive = req.query && req.query.drive || 'gallery';
  const directoryPath = path.join(__dirname, `../static/${drive}/`);
  const images = [];
  const thumbDir = 'thumb';
  const thumbDirPath = path.join(__dirname, `../static/${thumbDir}`);
  let files = [];
  let done = 0;

  if (!fs.existsSync(thumbDirPath)) {
    fs.mkdirSync(thumbDirPath);
  }

  try {
    files = await readdir(directoryPath);
  } catch (e) { }

  const count = files.length;
  if (count === 0) return res.send(files);

  files.forEach(async (name) => {
    const fullPath = path.join(directoryPath, name);
    const stats = await stat(fullPath);
    const isDir = stats.isDirectory();

    if (isDir) {
      return ++done && done === count && res.send(images);
    }

    const { size, mtime, ino } = stats;
    const url = `/${drive}/${name}`;
    const thumbName = `${ino}.webp`;
    const thumbUrl = `/${thumbDir}/${thumbName}`;
    const fullThumbUrl = path.resolve(__dirname, `../static/${thumbDir}/${thumbName}`);
    let dimensions;

    try {
      dimensions = await sharp(fullPath)
        .resize(150)
        .webp()
        .toFile(fullThumbUrl);
    } catch (e) {
      return ++done && done === count && res.send(images);
    }

    if (dimensions) {
      const { width, height } = dimensions;
      const imgObj = {
        url,
        width,
        height,
        name,
        thumbUrl,
        size,
        mtime
      }

      images.push(imgObj);
      return ++done && done === count && res.send(images);
    }
  });
}
