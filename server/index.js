const express = require('express');
const cors = require('cors');
const app = express();
const port = 5005;

// Enable CORS
app.use(cors());

// Sample data
const items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
  { id: 4, name: "user10"},
  { id: 5, name: "user11"},
  { id: 6, name: "Wow, working" }

];

app.get('/api/items', (req, res) => {
  // Send the array of items as JSON
  res.json(items);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
