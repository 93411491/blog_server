const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Wzr_19970520',
    database: 'myblog'
});

connection.connect();
console.log('connect');

const sql = 'SELECT * FROM users';

connection.query(sql, (err, result) => {
    if (err) {
        console.log(err);
    }
    console.log(result);
});

connection.end();
console.log('end');

