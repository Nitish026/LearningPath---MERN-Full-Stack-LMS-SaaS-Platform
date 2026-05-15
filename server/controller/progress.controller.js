import { Enrollment } from '../models/enrollment.model.js';
import { Course } from '../models/course.model.js';

export const markLectureComplete = async (req, res) => {
  try {
    const { courseId, lectureId } = req.body;
    const studentId = req.user._id;

    const enrollment = await Enrollment.findOne({
      student: studentId,
      course: courseId,
    });

    if (!enrollment) {
      return res.status(403).json({
        success: false,
        message: 'You are not enrolled in this course.',
      });
    }

    if (!enrollment.completedLectures.includes(lectureId)) {
      enrollment.completedLectures.push(lectureId);
    }

    enrollment.lastWatchedLecture = lectureId;

    const course = await Course.findById(courseId);

    const totalLectures = course?.lectures?.length || 0;

    enrollment.progress =
      totalLectures > 0
        ? Math.round(
            (enrollment.completedLectures.length / totalLectures) * 100,
          )
        : 0;

    await enrollment.save();

    return res.status(200).json({
      success: true,
      message: 'Lecture marked complete.',
      progress: enrollment.progress,
      completedLectures: enrollment.completedLectures,
      lastWatchedLecture: enrollment.lastWatchedLecture,
    });
  } catch (error) {
    console.log('Mark lecture complete error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to update progress.',
    });
  }
};

export const getCourseProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const studentId = req.user._id;

    const enrollment = await Enrollment.findOne({
      student: studentId,
      course: courseId,
    });

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Progress not found.',
      });
    }

    return res.status(200).json({
      success: true,
      progress: enrollment.progress,
      completedLectures: enrollment.completedLectures,
      lastWatchedLecture: enrollment.lastWatchedLecture,
    });
  } catch (error) {
    console.log('Get course progress error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch progress.',
    });
  }
};
