const mysql = require('mysql2');
const env = require('./env.json'); 

const db = mysql.createConnection({
    host: env.host,
    user: env.user,
    password: env.password,
    database: env.database,
    multipleStatements: true
});


db.connect((err) => {
    if (err) throw err;
    console.log("MySQL Connected");
});

module.exports = db;
