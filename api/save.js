const path = require('path');
const fs = require('fs-extra');

const { readFile } = require('fs').promises;
const modifyExif = require('modify-exif');
const sharp = require('sharp');

export default (req, res, next) => {
  req.on('data', (data) => {
    const { selected } = JSON.parse(data.toString());

    if (selected && selected.length) {
      selected.forEach(async ({ name, url }) => {
        // fs.copySync(
        //   path.resolve(__dirname, `../static/${url}`),
        //   path.resolve(__dirname, `../static/saved/${name}`)
        // );

        // save file and change the metadata
        const fullPath = path.resolve(__dirname, `../static/${url}`);
        const newBuffer = modifyExif(await readFile(fullPath), data => {
          data['0th'][305] = 'My Camera 222';
        });

        sharp(newBuffer)
          .withMetadata()
          .toFile(path.resolve(__dirname, `../static/saved/${name}`));
      });
    }
    res.end();
    next()
  });
};
