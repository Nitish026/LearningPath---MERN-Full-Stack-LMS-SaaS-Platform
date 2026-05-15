import express from 'express';
import {
  markLectureComplete,
  getCourseProgress,
} from '../controller/progress.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const progressRouter = express.Router();

progressRouter.post('/complete', protect, markLectureComplete);

progressRouter.get('/:courseId', protect, getCourseProgress);

export default progressRouter;
