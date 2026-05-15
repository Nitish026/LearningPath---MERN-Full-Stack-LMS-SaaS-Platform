import crypto from 'crypto';
import { razorpay } from '../config/razorpay.js';
import { Course } from '../models/course.model.js';
import Payment from '../models/payment.model.js';
import User from '../models/user.model.js';

export const createOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: 'Course ID is required',
      });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    const existingUser = await User.findById(userId);

    if (existingUser.enrolledCourses.includes(courseId)) {
      return res.status(400).json({
        success: false,
        message: 'Already enrolled in this course',
      });
    }

    const options = {
      amount: course.coursePrice * 100,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    await Payment.create({
      user: userId,
      course: courseId,
      razorpayOrderId: order.id,
      amount: course.coursePrice,
      status: 'created',
    });

    return res.status(200).json({
      success: true,
      order,
      course,
    });
  } catch (error) {
    console.log('Create order error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to create payment order',
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const userId = req.user._id;

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      courseId,
    } = req.body;

    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex');

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: 'Payment verification failed',
      });
    }

    await Payment.findOneAndUpdate(
      {
        razorpayOrderId: razorpay_order_id,
      },
      {
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        status: 'paid',
      },
    );

    await User.findByIdAndUpdate(userId, {
      $addToSet: {
        enrolledCourses: courseId,
      },
    });

    return res.status(200).json({
      success: true,
      message: 'Payment verified and course unlocked',
    });
  } catch (error) {
    console.log('Verify payment error:', error);

    return res.status(500).json({
      success: false,
      message: 'Payment verification failed',
    });
  }
};

export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate('user', 'name email')
      .populate('course', 'courseTitle')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      payments,
    });
  } catch (error) {
    console.log('Get payments error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch payments',
    });
  }
};
