const { Pool } = require("pg");

const { ELEPHANT_SQL_CONNECTION_URL } = process.env;

const pool = new Pool({
  connectionString: ELEPHANT_SQL_CONNECTION_URL,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
