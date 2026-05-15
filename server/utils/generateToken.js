import jwt from 'jsonwebtoken';

export const generateToken = (res, user, message) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables.');
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' },
  );

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  const { password, ...userWithoutPassword } = user._doc || user; // Handle both Mongoose document and plain object
  return res.status(200).json({
    success: true,
    token,
    message,
    user: userWithoutPassword,
  });
};
