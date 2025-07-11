import mongoose, { Schema } from 'mongoose';

const playlistSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
  },
    videos: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Video',
      required: true
  },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
}
);


export const Playlist = mongoose.model('Playlist', playlistSchema);