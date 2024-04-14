const express = require('express');
const cors = require('cors');
const app = express();
const port = 5005;
const mysql = require('mysql2');
const path = require('path');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

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

// Registration Endpoint
app.post('/api/register', (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  
  // Check if email already exists in the database
  connection.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Database error' });
    } else if (results.length > 0) {
      // Email already exists, return error
      res.status(400).json({ error: 'Email is already in use' });
    } else {
      // Email doesn't exist, proceed with registration
      const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
      connection.query(sql, [email, hashedPassword], (err, result) => {
        if (err) {
          res.status(500).json({ error: 'Failed to register user' });
        } else {
          res.json({ message: 'User registered successfully' });
        }
      });
    }
  });
});

//Login endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ?';
  connection.query(sql, [email], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to login' });
    } else if (results.length === 0) {
      res.status(401).json({ error: 'Invalid email or password' });
    } else {
      const user = results[0];
      const passwordMatch = bcrypt.compareSync(password, user.password);

      if (passwordMatch) {
        // Generate JWT token or session
        res.json({ message: 'Login successful' });
      } else {
        res.status(401).json({ error: 'Invalid email or password' });
      }
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
