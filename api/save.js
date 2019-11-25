const path = require('path');
const fs = require('fs-extra');

export default (req, res, next) => {
  req.on('data', (data) => {
    const { selected } = JSON.parse(data.toString());

    if (selected && selected.length) {
      selected.forEach(({ name, url }) => {
        fs.copySync(
          path.resolve(__dirname, `../static/${url}`),
          path.resolve(__dirname, `../static/saved/${name}`)
        );
      });
    }
    res.end();
    next()
  });
};
