import mongoose, { Schema } from 'mongoose';

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
      maxlength: 280,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    video: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Video',
      required: true
    }
  },
  {
    timestamps: true
  }
);


export const Comment = mongoose.model('Comment', commentSchema);