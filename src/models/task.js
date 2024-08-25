const pool = require('../config/database');

const Task = {
  getAll: async (userId) => {
    const result = await pool.query('SELECT * FROM tasks WHERE user_id = $1', [userId]);
    return result.rows;
  },
  create: async (userId, title, description) => {
    const result = await pool.query(
      'INSERT INTO tasks (user_id, title, description) VALUES ($1, $2, $3) RETURNING *',
      [userId, title, description]
    );
    return result.rows[0];
  },
  update: async (id, userId, title, description, completed) => {
    const result = await pool.query(
      `UPDATE tasks 
       SET title = $1, description = $2, completed = $3, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $4 AND user_id = $5 
       RETURNING *`,
      [title, description, completed, id, userId]
    );
    return result.rows[0];
  },
  delete: async (id, userId) => {
    const result = await pool.query('DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *', [id, userId]);
    return result.rows[0];
  }
};

module.exports = Task;