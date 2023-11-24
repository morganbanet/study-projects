import jwt from 'jsonwebtoken';

const generateTokenResponse = (user, statusCode, res) => {
  const userId = user._id;

  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  // Set JWT as HTTP-Only cookie
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'production' ? false : true,
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  };

  // Exclude password field in response
  const userObj = {
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  res
    .status(statusCode)
    .cookie('jwt', token, options)
    .json({ success: true, data: userObj });
};

export default generateTokenResponse;
