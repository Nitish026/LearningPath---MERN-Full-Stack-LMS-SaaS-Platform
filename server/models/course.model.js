import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    courseTitle: {
      type: String,
      required: true,
      trim: true,
    },
    subTitle: { type: String, trim: true },
    description: { type: String, trim: true },
    category: {
      type: String,
      required: true,
    },
    courseLevel: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      required: true,
    },
    coursePrice: {
      type: Number,
      min: 0,
      default: 0,
    },
    courseThumbnail: {
      type: String,
    },
    courseThumbnailPublicId: {
      type: String,
    },
    enrolledStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    lectures: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lecture',
      },
    ],
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    mentorMessage: {
      type: String,
      trim: true,
      default: '',
    },

    learningRoadmap: [
      {
        title: {
          type: String,
          trim: true,
        },
      },
    ],

    benefits: [
      {
        type: String,
        trim: true,
      },
    ],

    learningRoadmap: [
      {
        title: {
          type: String,
          trim: true,
        },
        description: {
          type: String,
          trim: true,
          default: '',
        },
      },
    ],

    targetAudience: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  { timestamps: true },
);

export const Course = mongoose.model('Course', courseSchema);
