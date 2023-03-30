const path = require('path');
const Sequelize = require('sequelize');
const glob = require('glob');

module.exports = {
    dbConfig : {
        HOST: 'sql12.freemysqlhosting.net',
        USER: 'sql12609892',
        PASSWORD: 'nZHYk7GEYJ',
        DB: 'sql12609892',
        dialect: 'mysql'
    },
    sequelizeOptions: (dbConfig) => {
     //   let a = path.join(__dirname + '/api/zones/model.js');
     let a = glob.sync('/api/**/model.js',{root : __dirname});
        return [
            {
                name: dbConfig.DB,
                models: a, // paths/globs to model files
                sequelize: new Sequelize(
                dbConfig.DB,
                dbConfig.USER,
                dbConfig.PASSWORD,
                {
                    host: dbConfig.HOST,
                    port: dbConfig.Port,
                    dialect: dbConfig.dialect,
                    operatorsAliases: 0,
                    define: {
                    timestamps: false, 
                    },
                },
                ), // sequelize instance
                sync: false, // sync models - default false
                forceSync: false, // force sync (drops tables) - default false
            },   
        ];
    },
    test : {
        db : ()=> {
            let a = path.join(__dirname, '/api/zones/modals/model.js');
            return a}
    }
}