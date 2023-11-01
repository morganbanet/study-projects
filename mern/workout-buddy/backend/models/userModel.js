const mongoose = require('mongoose');
const { Schema } = mongoose;

const bcrypt = require('bcryptjs');
const validator = require('validator');

const ErrorResponse = require('../utils/ErrorResponse');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Username cannot be blank'],
      maxlength: [36, 'Username cannot exceed 36 characters'],
      trim: true,
    },
    email: {
      type: String,
      unique: [true, 'Email already in use'],
      required: [true, 'Please provide an email'],
      maxlength: [254, 'Email cannot exceed 254 characters'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email'],
    },
    password: {
      type: String,
      required: [true, 'Password must be a minimum of 6 characters'],
      minlength: 6,
      select: false,
      match: [
        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,}$',
        'Password not strong enough',
      ],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Hash passwords
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Register validation
userSchema.statics.register = async function (username, email, password) {
  if (!username || !email || !password) {
    throw new ErrorResponse('Please fill in all fields', 400);
  }

  if (!validator.isEmail(email)) {
    throw new ErrorResponse('Invalid email');
  }

  if (!validator.isStrongPassword(password)) {
    throw new ErrorResponse('Password not strong enough', 400);
  }

  const userExists = await this.findOne({ email });

  if (userExists) {
    throw new ErrorResponse('User already exists with that email', 400);
  }

  const user = await this.create({ username, email, password });

  return user;
};

// Login validation
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new ErrorResponse('Please enter an email and password', 400);
  }

  const user = await this.findOne({ email }).select('+password');

  if (!user) {
    throw new ErrorResponse('Invalid credentials', 401);
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    throw new ErrorResponse('Invalid credentials', 401);
  }

  return user;
};

module.exports = mongoose.model('User', userSchema);
