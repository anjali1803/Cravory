// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const { Pool } = require('pg');

// const app = express(); // ✅ define before use
// const port = 3000;


// // Middleware
// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // PostgreSQL Connection
// const pool = new Pool({
//   user: 'postgres',     // replace with your actual pg username
//   host: 'localhost',
//   database: 'restaurant_db',
//   password: 'anjali18',
//   port: 5432,
// });

// // POST route to receive form data
// app.post('/contact', async (req, res) => {
//   const { name, email, phone, message } = req.body;
//   try {
//     await pool.query(
//       'INSERT INTO contact_messages (name, email, phone, message) VALUES ($1, $2, $3, $4)',
//       [name, email, phone, message]
//     );
//     res.status(200).json({ success: true, message: 'Message saved successfully' });
//   } catch (err) {
//     console.error('DB Insert Error:', err);
//     res.status(500).json({ success: false, error: 'Database error' });
//   }
// });

// // Admin route to view messages
// app.get('/admin/messages', async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM contact_messages ORDER BY id DESC');
//     res.json(result.rows);
//   } catch (err) {
//     console.error('DB Fetch Error:', err);
//     res.status(500).json({ success: false, error: 'Database error' });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });

// app.post('/contact', async (req, res) => {
//   const { name, email, phone, message } = req.body;
//   try {
//     await pool.query(
//       'INSERT INTO contact_messages (name, email, phone, message) VALUES ($1, $2, $3, $4)',
//       [name, email, phone, message]
//     );
//     res.status(200).json({ success: true });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false });
//   }
// });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const port = 3000;

// Serve static frontend from "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// PostgreSQL connection
const pool = new Pool({
  user: 'postgres',      // replace with your username
  host: 'localhost',
  database: 'restaurant_db', // match your db name
  password: 'anjali18',      // your actual password
  port: 5432,
});

// Contact form POST route
app.post('/contact', async (req, res) => {
  const { name, email, phone, message } = req.body;
  try {
    await pool.query(
      'INSERT INTO contact_messages (name, email, phone, message) VALUES ($1, $2, $3, $4)',
      [name, email, phone, message]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

// Admin GET route
app.get('/admin/messages', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM contact_messages ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
  }
});

// Send index.html for root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
