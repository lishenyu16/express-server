const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

//DATABASE_URL=postgres://{db_username}:{db_password}@{host}:{port}/{db_name}
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
pool.on('connect', () => {
  console.log('Connected to DB!');
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};