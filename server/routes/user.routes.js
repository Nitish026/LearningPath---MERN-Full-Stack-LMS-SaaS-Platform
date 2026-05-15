import express from 'express';
import {
  registerUser,
  loginUser,
  adminLogin,
  logout,
  getUserProfile,
  updateUserProfile,
} from '../controller/user.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { upload } from '../utils/multer.js';
const UserRouter = express.Router();

UserRouter.route('/register').post(registerUser);
UserRouter.route('/login').post(loginUser);
UserRouter.post('/admin-login', adminLogin);
UserRouter.post('/logout', protect, logout);
UserRouter.get('/profile', protect, getUserProfile);
UserRouter.put(
  '/update-profile',
  upload.single('avatar'),
  protect,
  updateUserProfile,
);

export default UserRouter;
