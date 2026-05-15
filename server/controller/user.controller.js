import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/generateToken.js';
import fs from 'fs';
import { uploadMedia, deleteMedia } from '../utils/cloudinary.js';

export const registerUser = async (req, res) => {
  console.log('BODY:', req.body);
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required.',
      });
    }

    // check password match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match',
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists.',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    return generateToken(res, newUser, `Welcome, ${newUser.name}!`);
  } catch (error) {
    console.log('Error registering user.', error);

    return res.status(500).json({
      success: false,
      message: 'Error registering user.',
    });
  }
};

export const loginUser = async (req, res) => {
  console.log('BODY:', req.body);
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required.',
      });
    }
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    console.log('USER:', existingUser);
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }
    console.log('MATCH:', isMatch);

    return generateToken(
      res,
      existingUser,
      `Welcome back, ${existingUser.name}!`,
    );
  } catch (error) {
    console.log('Error in loginUser:', error);
    return res.status(500).json({
      success: false,
      message: 'Error logging in user.',
    });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required.',
      });
    }

    const adminUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!adminUser) {
      return res.status(400).json({
        success: false,
        message: 'Invalid admin credentials.',
      });
    }

    if (adminUser.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admins only.',
      });
    }

    const isMatch = await bcrypt.compare(password, adminUser.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid admin credentials.',
      });
    }

    return generateToken(res, adminUser, `Welcome admin, ${adminUser.name}!`);
  } catch (error) {
    console.log('Admin login error:', error);

    return res.status(500).json({
      success: false,
      message: 'Admin login failed.',
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie('token', '', {
      httpOnly: true,
      expires: new Date(0), // expire immediately
    });

    return res.status(200).json({
      success: true,
      message: 'Logged out successfully.',
    });
  } catch (error) {
    console.log('Error in logout:', error);
    return res.status(500).json({
      success: false,
      message: 'Error logging out.',
    });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'User not authorized',
      });
    }

    const user = await User.findById(req.user._id).select('-password');

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log('Error fetching profile:', error);

    return res.status(500).json({
      success: false,
      message: 'Error fetching profile.',
    });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, email } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Email validation
    if (email && email !== user.email) {
      const existingEmail = await User.findOne({ email: email.toLowerCase() });

      if (existingEmail) {
        return res.status(400).json({
          success: false,
          message: 'Email already in use',
        });
      }

      user.email = email.toLowerCase();
    }

    // Update name
    if (name) user.name = name;

    // HANDLE IMAGE
    if (req.file) {
      // 1. Delete old image
      if (user.profileImageId) {
        await deleteMedia(user.profileImageId);
      }

      // 2. Upload new image
      const result = await uploadMedia(req.file.path);

      user.photoUrl = result.secure_url;
      user.profileImageId = result.public_id;

      // 3. Delete local file
      fs.unlinkSync(req.file.path);
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.log('Error updating profile:', error);
    return res.status(500).json({
      success: false,
      message: 'Error updating profile',
    });
  }
};
