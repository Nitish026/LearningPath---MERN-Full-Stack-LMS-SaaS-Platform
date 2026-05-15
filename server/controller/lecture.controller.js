import fs from 'fs';
import { Lecture } from '../models/lecture.model.js';
import { Course } from '../models/course.model.js';
import { uploadMedia, deleteVideo } from '../utils/cloudinary.js';

export const createLecture = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { lectureTitle, description, isPreviewFree } = req.body;

    if (!lectureTitle?.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Lecture title is required.',
      });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found.',
      });
    }

    const lectureCount = await Lecture.countDocuments({
      course: courseId,
    });

    const lecture = await Lecture.create({
      lectureTitle: lectureTitle.trim(),
      description,
      isPreviewFree,
      order: lectureCount + 1,
      course: courseId,
    });

    course.lectures.push(lecture._id);
    await course.save();

    return res.status(201).json({
      success: true,
      message: 'Lecture created successfully.',
      lecture,
    });
  } catch (error) {
    console.log('Create lecture error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to create lecture.',
    });
  }
};

export const getLectures = async (req, res) => {
  try {
    const { courseId } = req.params;

    const lectures = await Lecture.find({ course: courseId }).sort({
      order: 1,
    });

    return res.status(200).json({
      success: true,
      lectures,
    });
  } catch (error) {
    console.log('Get lectures error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch lectures.',
    });
  }
};

export const getLectureById = async (req, res) => {
  try {
    const { lectureId } = req.params;

    const lecture = await Lecture.findById(lectureId);

    if (!lecture) {
      return res.status(404).json({
        success: false,
        message: 'Lecture not found.',
      });
    }

    return res.status(200).json({
      success: true,
      lecture,
    });
  } catch (error) {
    console.log('Get lecture by id error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch lecture.',
    });
  }
};

export const updateLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const { lectureTitle, description, isPreviewFree } = req.body;

    const updatedLecture = await Lecture.findByIdAndUpdate(
      lectureId,
      {
        ...(lectureTitle?.trim() && {
          lectureTitle: lectureTitle.trim(),
        }),
        description: description?.trim() || '',
        ...(typeof isPreviewFree === 'boolean' && {
          isPreviewFree,
        }),
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedLecture) {
      return res.status(404).json({
        success: false,
        message: 'Lecture not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Lecture updated successfully.',
      lecture: updatedLecture,
    });
  } catch (error) {
    console.error('Update lecture error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to update lecture.',
    });
  }
};

export const uploadLectureVideo = async (req, res) => {
  try {
    const { lectureId } = req.params;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Video file is required.',
      });
    }

    const lecture = await Lecture.findById(lectureId);

    if (!lecture) {
      return res.status(404).json({
        success: false,
        message: 'Lecture not found.',
      });
    }

    if (lecture.publicId) {
      await deleteVideo(lecture.publicId);
    }

    const uploadResponse = await uploadMedia(req.file.path, 'lecture-videos');
    fs.unlinkSync(req.file.path);
    const updatedLecture = await Lecture.findByIdAndUpdate(
      lectureId,
      {
        videoUrl: uploadResponse.secure_url,
        publicId: uploadResponse.public_id,
      },
      {
        new: true,
      },
    );

    return res.status(200).json({
      success: true,
      message: 'Lecture video uploaded successfully.',
      lecture: updatedLecture,
    });
  } catch (error) {
    console.error('Upload lecture video error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to upload lecture video.',
    });
  }
};

export const deleteLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;

    const lecture = await Lecture.findById(lectureId);

    if (!lecture) {
      return res.status(404).json({
        success: false,
        message: 'Lecture not found.',
      });
    }

    // delete video if exists
    if (lecture.publicId) {
      await deleteVideo(lecture.publicId);
    }

    // remove lecture from course
    await Course.findByIdAndUpdate(lecture.course, {
      $pull: {
        lectures: lecture._id,
      },
    });

    const deletedOrder = lecture.order;
    const courseId = lecture.course;

    // delete lecture document
    await Lecture.findByIdAndDelete(lectureId);

    // reorder remaining lectures
    await Lecture.updateMany(
      {
        course: courseId,
        order: { $gt: deletedOrder },
      },
      {
        $inc: { order: -1 },
      },
    );

    return res.status(200).json({
      success: true,
      message: 'Lecture deleted successfully.',
    });
  } catch (error) {
    console.error('Delete lecture error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to delete lecture.',
    });
  }
};
