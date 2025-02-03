const {Sequelize} = require('sequelize'); 

exports.sequelize = new Sequelize('library', 'root', '12345', {
    host: '127.0.0.1',
    dialect: 'mysql' 
  });
