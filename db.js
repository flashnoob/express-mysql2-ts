const mysql = require('mysql2/promise')

const pool = mysql.createPool({
  host: "127.0.0.1",
  user: "flash",
  password: "root",
  port: "3306",
  database: "employee",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});



  
module.exports = pool;
