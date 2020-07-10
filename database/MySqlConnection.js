const mysql = require('mysql')

const connectionPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'onepiece'
})
module.exports = connectionPool