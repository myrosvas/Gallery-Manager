const pathHelper = require('path');
const fs = require('fs-extra');

export default (req, res, next) => {
  req.on('data', (data) => {
    const { url } = JSON.parse(data.toString());

    if (url) {
      const fullPath = pathHelper.resolve(__dirname, `../static/${url}`);
      fs.remove(fullPath, err => {
        if (err) {
          console.error(err);
        }

        res.end();
        next();
      })
    }
  });
};
