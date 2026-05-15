import { Course } from '../models/course.model.js';
import { Enrollment } from '../models/enrollment.model.js';
import { uploadMedia, deleteMedia } from '../utils/cloudinary.js';

export const createCourse = async (req, res) => {
  try {
    const { courseTitle, category, courseLevel, coursePrice } = req.body;

    if (
      !courseTitle?.trim() ||
      !category?.trim() ||
      !courseLevel?.trim() ||
      !coursePrice
    ) {
      return res.status(400).json({
        success: false,
        message: 'Course title, category, level, and price are required.',
      });
    }

    const course = await Course.create({
      courseTitle: courseTitle.trim(),
      category: category.trim(),
      courseLevel: courseLevel.trim(),
      coursePrice: parseFloat(coursePrice),
      creator: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: 'Course created successfully.',
      course,
    });
  } catch (error) {
    console.log('Create course error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to create course.',
    });
  }
};

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({ creator: req.user._id });

    return res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    console.log('Get courses error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch courses.',
    });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found.',
      });
    }

    return res.status(200).json({
      success: true,
      course,
    });
  } catch (error) {
    console.log('Get course by id error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch course.',
    });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      courseTitle,
      category,
      courseLevel,
      coursePrice,
      description,
      isPublished,
      mentorMessage,
      learningRoadmap,
      benefits,
      learningMode,
      targetAudience,
      subTitle,
    } = req.body;

    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found.',
      });
    }

    course.courseTitle = courseTitle || course.courseTitle;
    course.subTitle = subTitle || course.subTitle;
    course.category = category || course.category;
    course.courseLevel = courseLevel || course.courseLevel;
    course.coursePrice = coursePrice ?? course.coursePrice;
    course.description = description || course.description;
    course.mentorMessage = mentorMessage || course.mentorMessage;
    course.learningMode = learningMode || course.learningMode;

    if (Array.isArray(learningRoadmap)) {
      course.learningRoadmap = learningRoadmap;
    }

    if (Array.isArray(benefits)) {
      course.benefits = benefits;
    }

    if (Array.isArray(targetAudience)) {
      course.targetAudience = targetAudience;
    }

    if (typeof isPublished === 'boolean') {
      course.isPublished = isPublished;
    }

    await course.save();

    return res.status(200).json({
      success: true,
      message: 'Course updated successfully.',
      course,
    });
  } catch (error) {
    console.log('Update course error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to update course.',
    });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found.',
      });
    }

    await Course.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: 'Course deleted successfully.',
    });
  } catch (error) {
    console.log('Delete course error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to delete course.',
    });
  }
};

export const updateCourseThumbnail = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Thumbnail file is required.',
      });
    }

    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found.',
      });
    }

    if (course.courseThumbnailPublicId) {
      await deleteMedia(course.courseThumbnailPublicId);
    }

    const uploadResponse = await uploadMedia(
      req.file.path,
      'course-thumbnails',
    );

    course.courseThumbnail = uploadResponse.secure_url;
    course.courseThumbnailPublicId = uploadResponse.public_id;

    await course.save();

    return res.status(200).json({
      success: true,
      message: 'Thumbnail updated successfully.',
      course,
    });
  } catch (error) {
    console.log('Thumbnail upload error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to update thumbnail.',
    });
  }
};

export const togglePublishCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { isPublished } = req.body;

    const course = await Course.findByIdAndUpdate(
      id,
      { isPublished },
      { returnDocument: 'after' },
    );

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: isPublished
        ? 'Course published successfully'
        : 'Course moved to draft',
      course,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: 'Failed to update publish status',
    });
  }
};

export const getPublishedCourses = async (req, res) => {
  try {
    const courses = await Course.find({
      isPublished: true,
    });

    return res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    console.log('Get published courses error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch published courses.',
    });
  }
};

export const getPublicCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findOne({
      _id: id,
      isPublished: true,
    }).populate('lectures');

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found.',
      });
    }

    return res.status(200).json({
      success: true,
      course,
    });
  } catch (error) {
    console.log('Get public course error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch course.',
    });
  }
};

export const getCourseForLearning = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const course = await Course.findById(id).populate('lectures');

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found.',
      });
    }

    const isCreator = course.creator.toString() === userId.toString();

    const enrollment = await Enrollment.findOne({
      student: userId,
      course: id,
    });

    const isEnrolled = !!enrollment;

    if (isCreator || isEnrolled) {
      return res.status(200).json({
        success: true,
        course,
        fullAccess: true,
      });
    }

    const previewLectures = course.lectures.filter(
      (lecture) => lecture.isPreviewFree,
    );

    return res.status(200).json({
      success: true,
      course: {
        ...course.toObject(),
        lectures: previewLectures,
      },
      fullAccess: false,
    });
  } catch (error) {
    console.log('Get course for learning error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to load learning content.',
    });
  }
};
