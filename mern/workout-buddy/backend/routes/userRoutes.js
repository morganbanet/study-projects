const express = require('express');

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
