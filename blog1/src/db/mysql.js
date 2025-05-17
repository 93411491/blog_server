const mysql = require("mysql2");
const { MYSQL_CONF } = require("../conf/db");

const con = mysql.createConnection(MYSQL_CONF);

function exec(sql) {
  return new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}

module.exports = {
  exec,
};