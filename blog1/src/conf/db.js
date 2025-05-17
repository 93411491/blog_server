const env = process.env.NODE_ENV;

if (env === "dev") {
  MYSQL_CONF = {
    host: "localhost",
    user: "root",
    password: "Wzr_19970520",
    port: 3306,
    database: "myblog",
  };
} else {
  MYSQL_CONF = {
    host: "localhost",
    user: "root",
    password: "Wzr_19970520",
    port: 3306,
    database: "myblog",
  };
}

module.exports = {
  MYSQL_CONF,
};
