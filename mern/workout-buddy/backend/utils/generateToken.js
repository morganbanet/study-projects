const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  const userId = user._id;

  // jwt.sign({ payload }, SECRET, options)
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  // Options for cookie
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'production' ? false : true,
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  };

  // Exclude hashed password & isAdmin
  const userObj = {
    username: user.username,
    email: user.email,
    _id: user.id,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    __v: user.__v,
  };

  return { userObj, token, options };
};

module.exports = generateToken;
