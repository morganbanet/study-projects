const express = require('express');

// Express config
const app = express();

// Routes
app.get('/', (req, res) => {
  res.json({ mssg: 'Welcome to the app' });
});

// Run server
app.listen(4000, () => {
  console.log(`Listening on port 4000`);
});
