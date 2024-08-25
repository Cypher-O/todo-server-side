const pool = require('../config/database');

const User = {
  create: async (username, email, password) => {
    const result = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email, created_at, updated_at',
      [username, email, password]
    );
    return result.rows[0];
  },
  findByEmail: async (email) => {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  },
  findByUsername: async (username) => {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    return result.rows[0];
  },
  update: async (id, data) => {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const setString = keys.map((key, index) => `${key} = $${index + 2}`).join(', ');
    
    const query = `
      UPDATE users 
      SET ${setString}, updated_at = CURRENT_TIMESTAMP 
      WHERE id = $1 
      RETURNING id, username, email, created_at, updated_at
    `;
    
    const result = await pool.query(query, [id, ...values]);
    return result.rows[0];
  }
};

module.exports = User;