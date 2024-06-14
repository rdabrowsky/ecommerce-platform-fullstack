import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/database.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

dotenv.config();

const port = process.env.PORT || 5000;
connectDB();
const app = express();

// Body parser middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Product Routes
app.use('/api/products/', productRoutes);

// User Routes
app.use('/api/users/', userRoutes);

// Order routes
app.use('/api/orders/', orderRoutes);

// Upload routes
app.use('/api/upload/', uploadRoutes);

// Connect to PayPal
app.use('/api/config/paypal', (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});

const __dirname = path.resolve(); // Set __dirname to current directory

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
