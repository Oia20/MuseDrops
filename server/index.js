const express = require('express');
const cors = require('cors');
const app = express();
const port = 5005;
const mysql = require('mysql2');
const path = require('path');
const dotenv = require('dotenv');

// Specify the path to the .env file
const envPath = path.resolve(__dirname, '../.env');

// Load environment variables from the .env file
dotenv.config({ path: envPath });

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
};

const connection = mysql.createConnection(
  dbConfig
);

connection.connect();

// Enable CORS
app.use(cors());
// Middleware to parse JSON requests
app.use(express.json());

// GET request to fetch items
app.get('/api/items', (req, res) => {
  connection.query('SELECT * FROM posts', function (err, results, fields) {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch data from database' });
    } else {
      res.json(results);
    }
  });
});

// POST request to add new item
app.post('/api/items', (req, res) => {
  const { title, content } = req.body;
  const sql = 'INSERT INTO posts (title, content) VALUES (?, ?)';
  connection.query(sql, [title, content], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to add item to database' });
    } else {
      res.json({ message: 'Item added successfully' });
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
