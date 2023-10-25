const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');
const asyncHandler = require('../middleware/asyncMiddleware');

// @desc        Login user
// @route       GET /api/users/login
// @access      Public
exports.loginUser = asyncHandler(async (req, res) => {
  res.status(200).json({ success: true, data: user });
});

// @desc        Register user
// @route       GET /api/users/register
// @access      Public
exports.registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error(`User already exists`);
  }

  const user = await User.create({ username, email, password });

  const { userObj } = generateToken(user);

  res.status(201).json({ success: true, data: userObj });
});
