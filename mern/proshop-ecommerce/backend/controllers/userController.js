import User from '../models/userModel.js';
import asyncHandler from '../middleware/asyncHandler.js';
import generateTokenResponse from '../utils/generateTokenResponse.js';

// @desc        Login user & generate token
// @route       POST api/users/login
// @access      Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  let user = await User.findOne({ email }).select('+password');

  if (!user) {
    res.status(401);
    throw new Error('Invalid credentials');
  }

  // Compare passwords
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    res.status(401);
    throw new Error('Invalid credentials');
  }

  generateTokenResponse(user, 200, res);
});

// @desc        Logout user & clear cookie
// @route       POST api/users/logout
// @access      Private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ success: true, data: {} });
});

// @desc        Register user
// @route       POST api/users
// @access      Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });

  // Check for existing emails
  if (existingUser) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Create new user
  const user = await User.create({
    name,
    email,
    password,
  });

  // Check if user creation successful
  if (!user) {
    res.status(400);
    throw new Error('Invalid user data');
  }

  generateTokenResponse(user, 200, res);
});

// @desc        Get user profile
// @route       GET api/users/profile
// @access      Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    res.status(404);
    throw new Error('Resource not found');
  }

  res.status(200).json({ success: true, data: user });
});

// @desc        Update user profile
// @route       PUT api/users/profile
// @access      Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('+password');

  if (!user) {
    res.status(404);
    throw new Error('Resource not found');
  }

  user.name = req.body.name;
  user.email = req.body.email;

  // Only include password if updating as will hash
  if (req.body.password) {
    user.password = req.body.password;
  }

  await user.save();

  // Reset web token
  generateTokenResponse(user, 200, res);
});

// @desc        Get all users
// @route       GET api/users
// @access      Private / Admin
const getUsers = asyncHandler(async (req, res) => {
  res.send('get all users');
});

// @desc        Get single user
// @route       GET api/users/:id
// @access      Private / Admin
const getUser = asyncHandler(async (req, res) => {
  res.send('get single user');
});

// @desc        Update user
// @route       PUT api/users/:id
// @access      Private / Admin
const updateUser = asyncHandler(async (req, res) => {
  res.send('update user');
});

// @desc        Delete users
// @route       DELETE api/users/:id
// @access      Private / Admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send('delete user');
});

export {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
