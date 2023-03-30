
const userRoutes = require('./routesSetup');
const Config = require('./../config');
const SequelizeJs = require('hapi-sequelizejs');

const db_config = Config.dbConfig;
module.exports = function(server) {
    return server.register([
        {
            plugin: SequelizeJs,
            options: Config.sequelizeOptions(db_config),
          },
        {
            plugin: userRoutes
        }
    ]);
}