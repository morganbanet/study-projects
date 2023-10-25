const express = require('express');
const advancedResults = require('../middleware/resultsMiddleware');
const User = require('../models/userModel');

// prettier-ignore
const { 
  loginUser, 
  registerUser 
} = require('../controllers/userController');

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);

// prettier-ignore
router.route('/:id')

module.exports = router;
