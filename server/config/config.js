require("dotenv").config();

module.exports = {
  development: {
    username: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || null,
    database: process.env.MYSQL_DATABASE || "Google_Map_Game",
    host: process.env.MYSQL_HOST || "localhost",
    dialect: "mysql",
    define: {
      underscored: true,
    },
    logging: false,
  },
  test: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
  },
  production: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
  },
};