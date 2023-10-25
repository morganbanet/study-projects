const generateToken = (user) => {
  // @Todo: Generate JSON web token

  // @Todo: Set JWT as HTTP-Only cookie

  // Exclude hashed password
  const userObj = {
    username: user.username,
    email: user.email,
    isAdmin: user.isAdmin,
    _id: user.id,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    __v: user.__v,
  };

  return { userObj };
};

module.exports = generateToken;
