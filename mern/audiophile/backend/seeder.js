import 'dotenv/config';
import colors from 'colors';
import mongoose from 'mongoose';
import connectDB from './config/db.js';

import categories from './_data/categories.json' assert { type: 'json' };
import products from './_data/products.json' assert { type: 'json' };
import users from './_data/users.json' assert { type: 'json' };

import Category from './models/categoryModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import User from './models/userModel.js';

mongoose.connect(process.env.MONGO_URI);
console.log('MongoDB connected');

async function importData() {
  try {
    console.log('Importing data...'.bgYellow);

    await Category.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.create(users);
    const adminUser = createdUsers[0]._id;

    const productsToCreate = products.map((product) => {
      return { ...product, userRef: adminUser };
    });

    await Category.create(categories);
    await Product.create(productsToCreate);

    console.log('Import successful'.bgGreen);
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

async function flushData() {
  try {
    console.log('Flushing data...'.bgYellow);

    await Category.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    await User.deleteMany();

    console.log('Databased flushed'.bgRed);
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

if (process.argv[2] === '-f') {
  flushData();
} else {
  importData();
}
