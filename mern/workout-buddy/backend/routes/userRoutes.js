const express = require('express');

const { protect } = require('../middleware/authMiddleware');

const {
  loginUser,
  logoutUser,
  registerUser,
} = require('../controllers/userController');

const router = express.Router();

router.post('/login', loginUser);
router.post('/logout', protect, logoutUser);
router.post('/register', registerUser);

// prettier-ignore
router.route('/:id')

module.exports = router;
