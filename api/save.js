const path = require('path');
const fs = require('fs-extra');

const { readFile } = require('fs').promises;
const modifyExif = require('modify-exif');
const sharp = require('sharp');
const { ExifTags } = require('../config/exifTags.config');

export default (req, res, next) => {
  req.on('data', (data) => {
    const { selected } = JSON.parse(data.toString());

    if (selected && selected.length) {
      selected.forEach(async ({ name, url, tagsToChange }) => {
        const tagsWithConvertedKeys = [];
        tagsToChange.forEach(tag => {
          tag.key = Object.keys(ExifTags).find(key => ExifTags[key] === tag.key);
          tagsWithConvertedKeys.push(tag);
        });
        // fs.copySync(
        //   path.resolve(__dirname, `../static/${url}`),
        //   path.resolve(__dirname, `../static/saved/${name}`)
        // );

        // save file and change the metadata
        const fullPath = path.resolve(__dirname, `../static/${url}`);
        const newBuffer = modifyExif(await readFile(fullPath), data => {
          data['0th'][305] = 'My Camera 222';
          console.log(data['0th'][305]);
        //   tagsWithConvertedKeys.forEach(el => {
        //     for (let key in data) {
        //       for (let innerKey in data[key]) {
        //         if (innerKey === String(el.key)) {
        //           data[key][innerKey] = el.value;
        //         }
        //       }
        //     }
        //   });
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
