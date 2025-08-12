// db.js
const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'admin', // <-- ATENÇÃO: Altere para a sua senha, se for diferente.
    database: 'client_order_system',
    connectionLimit: 10
});

module.exports = pool;
