import express from 'express';
import {
  createLecture,
  getLectures,
  getLectureById,
  updateLecture,
  uploadLectureVideo,
  deleteLecture,
} from '../controller/lecture.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { upload } from '../utils/multer.js';

const lectureRouter = express.Router();

lectureRouter.get('/details/:lectureId', protect, getLectureById);
lectureRouter.put(
  '/:lectureId/video',
  protect,
  upload.single('video'),
  uploadLectureVideo,
);
lectureRouter.put('/:lectureId', protect, updateLecture);
lectureRouter.delete('/:lectureId', protect, deleteLecture);
lectureRouter.post('/:courseId', protect, createLecture);
lectureRouter.get('/:courseId', protect, getLectures);

export default lectureRouter;
