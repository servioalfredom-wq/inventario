const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password: "76934",
  database: "inventario",
  port: 5432
});

module.exports = pool;
