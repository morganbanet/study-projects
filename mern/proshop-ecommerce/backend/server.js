import 'dotenv/config';
import express, { urlencoded } from 'express';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';

import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Server config
connectDB();
const app = express();
const port = process.env.PORT || 5000;

// Body parser middleware
app.use(express.json());
app.use(urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

// Mounted routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// Error handlers
app.use(notFound);
app.use(errorHandler);

// Start Express server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
