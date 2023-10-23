require('dotenv').config({ path: './config/config.env' });

const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');

const workoutRoutes = require('./routes/workoutRoutes');

// Express config
const app = express();
const PORT = process.env.PORT || 5000;

// Morgan config
app.use(morgan('dev'));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Route mounts
app.use('/api/workouts', workoutRoutes);

// Connect database
mongoose
  .connect(process.env.MONGO_URI)
  .then((conn) => {
    console.log(`Database connected: ${conn.connection.host}`);

    // Run server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
