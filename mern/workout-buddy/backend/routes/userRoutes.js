const express = require('express');

const { protect } = require('../middleware/authMiddleware');

const {
  loginUser,
  registerUser,
  logoutUser,
} = require('../controllers/userController');

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/logout', protect, logoutUser);

// prettier-ignore
router.route('/:id')

module.exports = router;
