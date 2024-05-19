import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import productRoutes from './routes/productRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

dotenv.config();

const port = process.env.PORT || 5000;
connectDB();
const app = express();

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Product Routes
app.use('/api/products/', productRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
