import mongoose from 'mongoose';

const lectureSchema = new mongoose.Schema(
  {
    lectureTitle: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      default: '',
    },

    videoUrl: {
      type: String,
      default: '',
    },

    publicId: {
      type: String,
      default: '',
    },

    isPreviewFree: {
      type: Boolean,
      default: false,
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },

    order: {
      type: Number,
      required: true,
      min: 1,
    },

    duration: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

export const Lecture = mongoose.model('Lecture', lectureSchema);
