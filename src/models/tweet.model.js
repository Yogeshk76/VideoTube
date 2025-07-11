import mongoose, {Schema} from "mongoose";


const tweetSchema = new Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  content: {
    type: String,
    required: true,
    maxlength: 280
  }
},
{
  timestamps: true
});

export const Tweet = mongoose.model("Tweet", tweetSchema);
