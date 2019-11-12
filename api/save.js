const path = require('path');
const fs = require('fs-extra');

export default function (req, res, next) {
  req.on('data', (data) => {
    const { selected } = JSON.parse(data.toString());

    if (selected && selected.length) {
      selected.forEach(function (image) {
        fs.copySync(
          path.resolve(__dirname, `../static/${image}`),
          path.resolve(__dirname, `../static/saved/${image.substring(9)}`)
        );
      });
    }
    res.end();
    next()
  });
};
