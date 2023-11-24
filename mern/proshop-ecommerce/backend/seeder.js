import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

async function importData() {
  try {
    // flush the database
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // insert the sample users using the User Model
    const createdUsers = await User.insertMany(users);

    // get the admin user id which is at index 0
    const adminUser = createdUsers[0]._id;

    // map through the products sample data and add a user property to
    // each product
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    // insert the sample products using the Product Model
    await Product.insertMany(sampleProducts);

    // Log the event
    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
}

async function destroyData() {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
}

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
