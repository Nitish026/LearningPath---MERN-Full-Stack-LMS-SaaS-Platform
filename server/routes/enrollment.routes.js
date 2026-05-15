import express from 'express';
import {
  enrollInCourse,
  getMyEnrolledCourses,
  checkEnrollmentStatus,
} from '../controller/enrollment.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const enrollmentRouter = express.Router();

enrollmentRouter.post('/:courseId', protect, enrollInCourse);

enrollmentRouter.get('/my-courses', protect, getMyEnrolledCourses);

enrollmentRouter.get('/check/:courseId', protect, checkEnrollmentStatus);

export default enrollmentRouter;
