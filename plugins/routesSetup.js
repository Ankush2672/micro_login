const glob = require('glob');
const path = require('path');

module.exports = {
  name: 'routeplugin',
  version: '1.0.0',
  register: function (server) {
    glob
      .sync('api/**/route.js', {
        root: __dirname,
      })
      .forEach((file) => {
        const route = require(path.join(__dirname, `../${file}`));
        server.route(route);
      });
  }
};
