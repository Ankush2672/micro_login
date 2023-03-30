const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('hapitest', 'root', '12345678', {
    host: 'localhost',
    dialect: 'mysql'
});

const Connection = (async()=>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});

module.exports ={
    Connection,
    sequelize
}
