const mongoose = require('mongoose');
const colors = require('colors');
const fs = require('fs');

// Load env variables
require('dotenv').config({ path: './config/config.env' });

// Load models
const Bootcamp = require('./models/Bootcamp');
const Course = require('./models/Course');
const User = require('./models/User');
const Review = require('./models/Review');

// Connect to database
mongoose.connect(process.env.MONGO_URI);
console.log('MongoDB connected');

// Read JSON file
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8')
);

const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/courses.json`, 'utf-8')
);

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8')
);

const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/reviews.json`, 'utf-8')
);

// Import into database
const importData = async () => {
  try {
    console.log('Database seeding...'.bgYellow);

    await Bootcamp.create(bootcamps);
    await Course.create(courses);
    await User.create(users);
    await Review.create(reviews);

    console.log('Database seeded'.bgGreen);
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

// Flush database
const flushData = async () => {
  try {
    console.log('Flushing database...'.bgYellow);

    await Bootcamp.deleteMany();
    await Course.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();

    console.log('Database flushed'.bgRed);
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

// Check command flags
if (process.argv[2] === '-f') {
  flushData();
} else {
  importData();
}
