require('dotenv').config({ path: './config/config.env' });

const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const workoutRoutes = require('./routes/workoutRoutes');
const userRoutes = require('./routes/userRoutes');

const deployment = require('./config/deployment');

const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Express config
const app = express();
const PORT = process.env.PORT || 5000;

// Body & cookie parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Morgan config
app.use(morgan('dev'));

// Route mounts
app.use('/api/workouts', workoutRoutes);
app.use('/api/users', userRoutes);

// Deployment configuration (via mounted route)
app.use(deployment);

// Error handlers
app.use(notFound);
app.use(errorHandler);

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
