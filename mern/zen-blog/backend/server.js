require('dotenv').config();
const path = require('path');
const express = require('express');
const connectDB = require('./config/db');
const morgan = require('morgan');

const hpp = require('hpp');
const helmet = require('helmet');
const sanitizer = require('express-html-sanitizer');
const { rateLimit } = require('express-rate-limit');

const { routeNotFound, errorHandler } = require('./middleware/errorMiddleware');
const blogRoutes = require('./routes/blogRoutes');

// Server config
connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Morgan config
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Security packages
app.use(helmet());
const sanitizeReqBody = sanitizer();
app.use(sanitizeReqBody);
app.use(hpp());

// Rate limit
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  limit: 100, // Requests per window
});
app.use(limiter);

// Mounted routes
app.use('/api/blogs', blogRoutes);

// Deployment/build config
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

// Error middleware
app.use(routeNotFound);
app.use(errorHandler);

// Run server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV}`);
});
