require('dotenv').config();
const express = require('express');
const morgan = require('morgan');

// Route imports
const workoutRoutes = require('./routes/workoutRoutes');

// Express config
const PORT = process.env.PORT || 5000;
const app = express();

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Morgan config
app.use(morgan('dev'));

// Route mounts
app.use('/api/workouts', workoutRoutes);

// Run server
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}...`);
});
