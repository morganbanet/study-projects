require('dotenv').config({ path: './config/config.env' });

const mongoose = require('mongoose');
const colors = require('colors');
const fs = require('fs');

const User = require('../models/userModel');
const Workout = require('../models/workoutModel');

// Connect to database
mongoose.connect(process.env.MONGO_URI);
console.log('Database connected');

const parseJson = (filename) => {
  const file = `${__dirname}/../data/${filename}.json`;
  return JSON.parse(fs.readFileSync(file));
};

// JSON files used for seeding
const sampleUsers = parseJson('users');
const sampleWorkouts = parseJson('workouts');

// Import data
const importData = async () => {
  try {
    console.log('Seeding database...'.bgYellow);

    // Flush current data
    await User.deleteMany();
    await Workout.deleteMany();

    // Insert sampleUsers
    console.log('Inserting users into database...');
    const createdUsers = await User.create(sampleUsers);

    // Map through each workout and assign each a user path using the
    // generated user ids from createdUsers (_id from mongoose)
    console.log('Associating & inserting workouts...');
    for (let x = 0; x < createdUsers.length; x++) {
      const user = createdUsers[x];

      // Stringify the user._id field and remove double quotes
      let userId = JSON.stringify(user._id);
      userId = userId.split(`"`)[1];

      // Map through each workout and assign ids
      sampleWorkouts.map((workout) => (workout.user = userId));

      // Insert sampleWorkouts with user paths
      await Workout.create(sampleWorkouts);
    }

    console.log('Database succesfully seeded!'.bgGreen);
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

// Flush data
const flushData = async () => {
  try {
    console.log('Flushing database...'.bgYellow);

    // Flush data
    await User.deleteMany();
    await Workout.deleteMany();

    console.log('Database successfully flushed!'.bgGreen);
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
