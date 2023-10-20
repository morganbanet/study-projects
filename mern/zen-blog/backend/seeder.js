require('dotenv').config();
const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const Blog = require('./models/BlogModel');

// Connect database
mongoose.connect(process.env.MONGO_URI);
console.log('MongoDB connected');

// Parse JSON data
const blogs = JSON.parse(
  fs.readFileSync(`${__dirname}/data/blogs.json`, 'utf-8')
);

// Import data
const importData = async () => {
  try {
    console.log('Database seeding...'.bgYellow);

    await Blog.deleteMany();
    await Blog.create(blogs);

    console.log('Database seeded'.bgGreen);

    process.exit(1);
  } catch (error) {
    console.log(`${error}`.bgRed);
    process.exit(1);
  }
};

// Flush database
const flushData = async () => {
  try {
    console.log('Flushing database...'.bgYellow);

    await Blog.deleteMany();

    console.log('Database flushed'.bgRed);

    process.exit(1);
  } catch (error) {
    console.log(`${error}`.bgRed);
    process.exit(1);
  }
};

// Check command flags
if (process.argv[2] === '-f') {
  flushData();
} else {
  importData();
}
