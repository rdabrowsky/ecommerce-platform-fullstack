import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/order.js';
import connectDB from './config/database.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers.find((user) => user.isAdmin);

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser._id };
    });

    await Product.insertMany(sampleProducts);
    console.log('Data imported successfully!'.green.inverse);
  } catch (err) {
    console.error(`${err}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data destroyed successfully!'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(`${err}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv.at(-1) === '-d') {
  destroyData();
}

if (process.argv.at(-1) === '-i') {
  importData();
}
