import 'dotenv/config';
import express from 'express';
import connectDB from './config/db.js';

import { routeNotFound, errorHandler } from './middleware/errorMiddleware.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';

// Server config
connectDB();
const app = express();
const port = process.env.PORT || 5000;

// Route mounts
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/products', productRoutes);

// Error middleware
app.use(routeNotFound);
app.use(errorHandler);

// Run server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
