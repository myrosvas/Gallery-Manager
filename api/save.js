const path = require('path');
const fs = require('fs-extra');

const { readFile } = require('fs').promises;
const modifyExif = require('modify-exif');
const sharp = require('sharp');
const { ExifTags } = require('../config/exifTags.config');

export default (req, res, next) => {
  req.on('data', (data) => {
    const { selected } = JSON.parse(data.toString());
    const tagsWithConvertedKeys = [];

    if (selected && selected.length) {
      selected.forEach(async ({ name, url, tagsToChange }) => {
        if (tagsToChange.length) {
          tagsToChange.forEach(tag => {
            tag.key = Object.keys(ExifTags).find(key => ExifTags[key] === tag.key);
            tagsWithConvertedKeys.push(tag);
          });
        }

        const changeMetadata = (data) => {
          tagsWithConvertedKeys.forEach(el => {
            for (let key in data) {
              if (key === 'thumbnail') {
                continue;
              }
              for (let innerKey in data[key]) {
                if (innerKey === String(el.key)) {
                  data[key][innerKey] = el.value;
                }
              }
            }
          });

          return data;
        }
        // fs.copySync(
        //   path.resolve(__dirname, `../static/${url}`),
        //   path.resolve(__dirname, `../static/saved/${name}`)
        // );
        const fullPath = path.resolve(__dirname, `../static/${url}`);
        const newBuffer = modifyExif(await readFile(fullPath), data => {
          if (tagsToChange.length) {
            changeMetadata(data);
          }
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
