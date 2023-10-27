const User = require('../models/userModel');
const asyncHandler = require('../middleware/asyncMiddleware');
const generateToken = require('../utils/generateToken');

// @desc        Login user
// @route       POST /api/users/login
// @access      Public
exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.login(email, password);

  const { userObj, token, options } = generateToken(user);

  res
    .status(200)
    .cookie('jwt', token, options)
    .json({ success: true, data: userObj });
});

// @desc        Logout user / clear cookie
// @route       POST /api/users/register
// @access      Private
exports.logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie('jwt');

  res.status(200).json({ success: true, data: {} });
});

// @desc        Register user
// @route       POST /api/users/register
// @access      Public
exports.registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const user = await User.register(username, email, password);

  const { userObj, token, options } = generateToken(user);

  res
    .status(201)
    .cookie('jwt', token, options)
    .json({ success: true, data: userObj });
});
