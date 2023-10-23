require('dotenv').config();
const express = require('express');

// Express config
const PORT = process.env.PORT || 5000;
const app = express();

// Routes
app.get('/', (req, res) => {
  res.json({ mssg: 'Welcome to the app' });
});

// Run server
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}...`);
});
