import mongoose, {isValidObjectId} from "mongoose"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {Comment} from "../models/comment.model.js"
import {Tweet} from "../models/tweet.model.js"
import {Video} from "../models/video.model.js"

const toggleVideoLike = asyncHandler(async (req, res) => {
    const {videoId} = req.params
    const userId = req.user?._id 

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID")
    }

    if( !isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid user ID")
    }

    const video = await Video.findById(videoId)
    if (!video) {
        throw new ApiError(404, "Video not found")
    }

    if (video.owner.toString() === userId.toString()) {
        throw new ApiError(400, "You cannot like your own video")
    }

    const existingLike = await Like.findOne({video: videoId, likedBy: userId})

    let isLiked;

    if (existingLike) {
        await Like.findByIdAndDelete(existingLike._id)
        isLiked = false
    }
    else {
        await Like.create({video: videoId, likedBy: userId})
        isLiked = true  
    }

     return res.status(200).json(
    new ApiResponse(
      200,
      { isLiked },
      isLiked ? "Like added" : "Like removed"
    )
  );
});

const toggleCommentLike = asyncHandler(async (req, res) => {
    const {commentId} = req.params
    const userId = req.user?._id

    if (!isValidObjectId(commentId)) {
        throw new ApiError(400, "Invalid comment ID")
    }

    if( !isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid user ID")
    }

    const comment = await Comment.findById(commentId)
    if (!comment) {
        throw new ApiError(404, "Comment not found")
    }

    if (comment.owner.toString() === userId.toString()) {
        throw new ApiError(400, "You cannot like your own comment")
    }

    const existingLike = await Like.findOne({comment: commentId, likedBy: userId})

    let isLiked;

    if (existingLike) {
        await Like.findByIdAndDelete(existingLike._id)
        isLiked = false
    }
    else {
        await Like.create({comment: commentId, likedBy: userId})
        isLiked = true
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            { isLiked },
            isLiked ? "Like added" : "Like removed"
        )
    );
})

const toggleTweetLike = asyncHandler(async (req, res) => {
    const {tweetId} = req.params
    const userId = req.user?._id

    if (!isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid tweet ID")
    }   

    if( !isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid user ID")
    }

    const tweet = await Tweet.findById(tweetId)
    if (!tweet) {
        throw new ApiError(404, "Tweet not found")
    }

    if (tweet.owner.toString() === userId.toString()) {
        throw new ApiError(400, "You cannot like your own tweet")
    }

    const existingLike = await Like.findOne({tweet: tweetId, likedBy: userId})
    let isLiked;

    if (existingLike) {
        await Like.findByIdAndDelete(existingLike._id)
        isLiked = false
    }
    else {
        await Like.create({tweet: tweetId, likedBy: userId})
        isLiked = true
    }

    return res
.status(200).json(
        new ApiResponse(
            200,
            { isLiked },
            isLiked ? "Like added" : "Like removed"
        )
    );
});

const getLikedVideos = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid user ID");
  }

  const likedVideos = await Like.find({
    likedBy: userId,
    video: { $ne: null },
  }).populate("video", "owner thumbnail title description duration");

  if (!likedVideos || likedVideos.length === 0) {
    return res.status(200).json(
      new ApiResponse(200, [], "No liked videos found")
    );
  }

  return res.status(200).json(
    new ApiResponse(200, likedVideos, "Liked videos fetched successfully")
  );
});


export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
}