require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

async function rawQuery(query, params) {
  const client = await pool.connect();
  try {
      const result = await client.query(query, params);
      return result.rows;
  } catch (error) {
      console.error('Error executing raw query:', error);
      throw error;
  } finally {
      client.release();
  }
}

module.exports = pool;
