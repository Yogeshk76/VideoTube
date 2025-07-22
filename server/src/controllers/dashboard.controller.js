import mongoose from "mongoose";
import { Video } from "../models/video.model.js";
import { Subscription } from "../models/subscription.model.js";
import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getChannelStats = asyncHandler(async (req, res) => {
  const userId = req.user?.id;

  const [totalViewsAgg, totalSubscribers, totalVideos, totalVideoLikes] = await Promise.all([
    Video.aggregate([
      { $match: { owner: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: null, totalViews: { $sum: "$views" } } },
    ]),

    Subscription.countDocuments({
      channel: new mongoose.Types.ObjectId(userId),
    }),

    Video.countDocuments({
      owner: new mongoose.Types.ObjectId(userId),
    }),

    (async () => {
      const videoIds = await Video.find({ owner: userId }).distinct("_id");
      return Like.countDocuments({ video: { $in: videoIds } });
    })()
  ]);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        totalViews: totalViewsAgg[0]?.totalViews || 0,
        totalSubscribers,
        totalVideos,
        totalVideoLikes,
      },
      "Channel stats fetched successfully"
    )
  );
});


const getChannelVideos = asyncHandler(async (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    throw new ApiError(401, "Unauthorized access");
  }

  const videos = await Video.find({ owner: userId }).sort({ createdAt: -1 });

  return res.status(200).json(
    new ApiResponse(200, videos, "Channel videos fetched successfully")
  );
});


export { getChannelStats, getChannelVideos };
