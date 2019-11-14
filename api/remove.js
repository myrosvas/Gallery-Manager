const pathHelper = require('path');
const fs = require('fs-extra');

export default function (req, res, next) {
  req.on('data', (data) => {
    const { path } = JSON.parse(data.toString());

    if (path) {
      const fullPath = pathHelper.resolve(__dirname, `../static/${path}`);
      fs.remove(fullPath, err => {
        if (err) return console.error(err)

        res.end();
        next();
      })
    }
  });
};
