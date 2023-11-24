import express from 'express';

import {
  loginUser,
  logoutUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';

import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, admin, getUsers).post(registerUser);

router.route('/login').post(loginUser);

router.route('/logout').post(protect, logoutUser);

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router
  .route('/:id')
  .get(protect, admin, getUser)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser);

export default router;
