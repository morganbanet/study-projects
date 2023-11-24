const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const morgan = require('morgan');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const hpp = require('hpp');
const sanitizer = require('express-html-sanitizer');
const cors = require('cors');
const { rateLimit } = require('express-rate-limit');
const fileUpload = require('express-fileupload');
const errorHandler = require('./middleware/error');

// Dotenv config
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// Route imports
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');
const auth = require('./routes/auth');
const users = require('./routes/users');
const reviews = require('./routes/reviews');

// Express config
const app = express();
const PORT = process.env.PORT || 5000;

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Morgan config
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Parse cookies
app.use(cookieParser());

// Prevent injects / sanitize requests
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Sanitize HTML
const sanitizeReqBody = sanitizer();
app.use(sanitizeReqBody);

// Prevent HTTP parameter pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// Rate limit config
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  limit: 100, // Requests per window
});

// Use rate limit. Limit only to API calls
app.use(limiter);

// File upload
app.use(fileUpload());

// Route mounts
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/reviews', reviews);

// Error middleware
app.use(errorHandler);

// Run server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(process.exit(1));
});
