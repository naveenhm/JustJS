const express = require('express');
const { Pool } = require('pg'); // Using pg for PostgreSQL connection
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

// Connect to PostgreSQL database (replace connection details)
const pool = new Pool({
  user: 'opsbld_iri_d2',
  host: 'lnx1546.ch3.dev.i.com',
  database: 'db_warehouse_dev_01',
  password: 'Passw0rd',
  port: 5432,
});

// Allow CORS (adjust origins if needed)
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());

// Define queries for CRUD operations
const getItems = async () => {
  const result = await pool.query('SELECT * FROM job_step_tmplt');
  return result.rows;
};

const createItem = async (name) => {
  const result = await pool.query('INSERT INTO items (name) VALUES ($1) RETURNING *', [name]);
  return result.rows[0];
};

// Update and Delete queries would follow similar structure

// API Endpoints
app.get('/api/items', async (req, res) => {
  try {
    const items = await getItems();
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/items', async (req, res) => {
  try {
    const newItem = await createItem(req.body.name);
    res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

// Update and Delete endpoints using appropriate queries
// Update function using parameterized queries
const updateItem = async (itemId, updatedItem) => {
  const { name } = updatedItem; // Assuming you have a "name" property

  const result = await pool.query(
    'UPDATE items SET name = $1 WHERE id = $2 RETURNING *',
    [name, itemId]
  );
  return result.rows[0];
};

// API Endpoint for Edit
app.put('/api/items/:id', async (req, res) => {
  const itemId = req.params.id;
  const updatedItem = req.body;

  try {
    const updatedItemData = await updateItem(itemId, updatedItem);
    if (!updatedItemData) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(updatedItemData); // Send updated item data
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/items/:id', async (req, res) => {
  try {
    const items = await getItems();
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));


//curl -v --request GET "http://localhost:5000/api/items" 