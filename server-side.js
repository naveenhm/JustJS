const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

// Database connection details (replace with your credentials)
const pool = new Pool({
  user: 'your_username',
  password: 'your_password',
  host: 'localhost',
  port: 5432,
  database: 'your_database'
});


const app = express();
app.use(bodyParser.json()); // Parse incoming JSON data

app.post('/update_data', async (req, res) => {
  try {
    const data = req.body;
    const id = data.id;
    const name = data.name; // Assuming 'name' field is updated

    // Connect to the database pool
    const client = await pool.acquire();

    try {
      // Prepare SQL statement with placeholders
      const sql = `UPDATE your_table_name SET name = $1 WHERE id = $2`;
      const values = [name, id];

      // Execute update using prepared statement
      await client.query(sql, values);

      // Check if row was updated
      const result = await client.query('SELECT * FROM your_table_name WHERE id = $1', [id]);
      if (result.rows.length === 1) {
        res.json({ success: true });
      } else {
        res.status(400).json({ error: 'Data update failed' });
      }
    } finally {
      // Release client back to pool even on errors
      await client.release();
    }
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/get_data', async (req, res) => {
  try {
    const data = req.body;
    const id = data.id;
    const name = data.name; // Assuming 'name' field is updated

    // Connect to the database pool
    const client = await pool.acquire();

    try {
      // Prepare SQL statement with placeholders
      //const sql = `UPDATE your_table_name SET name = $1 WHERE id = $2`;
      //const values = [name, id];

      // Execute update using prepared statement
      //await client.query(sql, values);

      // Check if row was updated
      const result = await client.query('SELECT * FROM your_table_name ');
      if (result.rows.length === 1) {
        res.json({ success: true });
      } else {
        res.status(400).json({ error: 'Data update failed' });
      }
    } finally {
      // Release client back to pool even on errors
      await client.release();
    }
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


