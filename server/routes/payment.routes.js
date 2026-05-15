import express from 'express';
import {
  createOrder,
  verifyPayment,
  getAllPayments,
} from '../controller/payment.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const paymentRouter = express.Router();

paymentRouter.post('/create-order', protect, createOrder);
paymentRouter.post('/verify', protect, verifyPayment);
paymentRouter.get('/all', protect, getAllPayments);

export default paymentRouter;
