const  mysql = require('mysql');
const {database} = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) =>{
    if(err){
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.');
          }
          if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has to many connections');
          }
          if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused');
          }
    }

    connection.release();
    console.log('Base de datos conectada');
    return;
});

module.exports = pool;


