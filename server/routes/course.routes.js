import express from 'express';
import {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  updateCourseThumbnail,
  togglePublishCourse,
  getPublishedCourses,
  getPublicCourseById,
  getCourseForLearning,
} from '../controller/course.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { upload } from '../utils/multer.js';

const courseRouter = express.Router();

// PUBLIC ROUTES
courseRouter.get('/published', getPublishedCourses);
courseRouter.get('/public/:id', getPublicCourseById);

// ADMIN ROUTES
courseRouter.post('/create', protect, createCourse);
courseRouter.get('/', protect, getCourses);
courseRouter.get('/learn/:id', protect, getCourseForLearning);
courseRouter.get('/:id', protect, getCourseById);
courseRouter.put('/:id', protect, updateCourse);
courseRouter.delete('/:id', protect, deleteCourse);

courseRouter.put(
  '/:id/thumbnail',
  protect,
  upload.single('thumbnail'),
  updateCourseThumbnail,
);

courseRouter.patch('/:id/publish', protect, togglePublishCourse);
export default courseRouter;
