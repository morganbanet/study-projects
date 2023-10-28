require('dotenv').config({ path: './config/config.env' });

const path = require('path');
const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const workoutRoutes = require('./routes/workoutRoutes');
const userRoutes = require('./routes/userRoutes');

const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Express config
const app = express();
const PORT = process.env.PORT || 5000;

// Body & cookie parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Morgan config
app.use(morgan('dev'));

// Route mounts
app.use('/api/workouts', workoutRoutes);
app.use('/api/users', userRoutes);

// Deployment configuration
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'frontend/dist')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '..', 'frontend', 'dist', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => {
    res.send('API running...');
  });
}

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
