import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    classLevel: {
      type: String,
      required: true,
      trim: true,
    },

    goal: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ['new', 'contacted', 'converted'],
      default: 'new',
    },
  },
  { timestamps: true },
);

export const Lead = mongoose.model('Lead', leadSchema);
