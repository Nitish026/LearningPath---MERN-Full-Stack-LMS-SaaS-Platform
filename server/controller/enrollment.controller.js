import { Enrollment } from '../models/enrollment.model.js';
import { Course } from '../models/course.model.js';

export const enrollInCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const studentId = req.user._id;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found.',
      });
    }

    const existingEnrollment = await Enrollment.findOne({
      student: studentId,
      course: courseId,
    });

    if (existingEnrollment) {
      return res.status(400).json({
        success: false,
        message: 'Already enrolled in this course.',
      });
    }

    await Enrollment.create({
      student: studentId,
      course: courseId,
    });

    return res.status(201).json({
      success: true,
      message: 'Enrolled successfully.',
    });
  } catch (error) {
    console.log('Enroll course error:', error);

    return res.status(500).json({
      success: false,
      message: 'Enrollment failed.',
    });
  }
};

export const getMyEnrolledCourses = async (req, res) => {
  try {
    const studentId = req.user._id;

    const enrollments = await Enrollment.find({
      student: studentId,
    }).populate({
      path: 'course',
      populate: {
        path: 'lectures',
      },
    });

    const courses = enrollments
      .map((enrollment) => enrollment.course)
      .filter(Boolean);

    return res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    console.log('Get enrolled courses error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch enrolled courses.',
    });
  }
};

export const checkEnrollmentStatus = async (req, res) => {
  try {
    const { courseId } = req.params;
    const studentId = req.user._id;

    const enrollment = await Enrollment.findOne({
      student: studentId,
      course: courseId,
    });

    return res.status(200).json({
      success: true,
      enrolled: !!enrollment,
    });
  } catch (error) {
    console.log('Check enrollment error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to check enrollment.',
    });
  }
};
