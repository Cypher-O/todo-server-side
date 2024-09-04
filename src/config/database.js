// const { Pool } = require('pg');
// require('dotenv').config();

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false
//   }
// });

// module.exports = {
//   query: (text, params) => pool.query(text, params),
// };

const { Pool } = require('pg');
const fs = require('fs');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    // In production, use proper SSL configuration
    ca: fs.readFileSync('/etc/letsencrypt/live/cybercraftsmen.tech/chain.pem').toString(),
    key: fs.readFileSync('/etc/letsencrypt/live/cybercraftsmen.tech/privkey.pem').toString(),
    cert: fs.readFileSync('/etc/letsencrypt/live/cybercraftsmen.tech/cert.pem').toString(),
    rejectUnauthorized: true, // Only use this for development/testing
  },
  max: 20,
  connectionTimeoutMillis: 10000, // Increased to 10 seconds
  idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
});

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

const query = async (text, params, retries = 0) => {
  try {
    const result = await pool.query(text, params);
    return result;
  } catch (error) {
    console.error('Database query error:', error);

    if (error.code === 'ECONNRESET' && retries < MAX_RETRIES) {
      console.log(`Retrying query, attempt ${retries + 1} of ${MAX_RETRIES}`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      return query(text, params, retries + 1);
    }

    if (error.code === '57P01') {
      console.error('Database server is shutting down. Attempting to reconnect...');
      await pool.end();
      pool.connect();
    }

    throw error;
  }
};

// Implement a health check function
const healthCheck = async () => {
  try {
    await pool.query('SELECT 1');
    return true;
  } catch (error) {
    console.error('Database health check failed:', error);
    return false;
  }
};

module.exports = { query, healthCheck };
