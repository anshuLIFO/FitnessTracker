const { Pool } = require('pg');
require('dotenv').config();

// Create a new pool using credentials from .env or Vercel
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL || process.env.DATABASE_URL,
  user: process.env.POSTGRES_USER || process.env.DB_USER,
  host: process.env.POSTGRES_HOST || process.env.DB_HOST,
  database: process.env.POSTGRES_DATABASE || process.env.DB_NAME,
  password: process.env.POSTGRES_PASSWORD || process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
  ssl: { rejectUnauthorized: false }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};