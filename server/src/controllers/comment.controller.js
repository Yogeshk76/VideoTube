import mongoose, { isValidObjectId } from "mongoose";
import { Comment } from "../models/comment.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getVideoComments = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  if (!req.user) {
    throw new ApiError(
      401,
      "User needs to be logged in to access this resource"
    );
  }

  if (!isValidObjectId(videoId)) {
    throw new ApiError("Invalid video ID", 400);
  }

  const videoObjectId = new mongoose.Types.ObjectId(videoId);

  const comments = await Comment.aggregate([
    {
      $match: {
        video: videoObjectId,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
      },
    },
    {
      $unwind: "$owner",
    },
    {
      $project: {
        _id: 1,
        content: 1,
        createdAt: 1,
        updatedAt: 1,
        "owner._id": 1,
        "owner.name": 1,
        "owner.email": 1,
        "owner.avatar": 1,
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $skip: (parseInt(page) - 1) * parseInt(limit),
    },
    {
      $limit: parseInt(limit),
    },
  ]);

  if (!comments || comments.length === 0) {
    throw new ApiError(404, "No comments found for this video");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Comments retrieved successfully", comments));
});

const addComment = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { content } = req.body;

  if (!req.user) {
    throw new ApiError(401, "User needs to be logged in to add a comment");
  }

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid video ID");
  }

  if (!content || content.trim() === "") {
    throw new ApiError(400, "Comment content cannot be empty");
  }

  const videoObjectId = videoId;
  const newComment = new Comment({
    content,
    video: videoObjectId,
    owner: req.user._id,
  });

  const savedComment = await newComment.save();

  if (!savedComment) {
    throw new ApiError(500, "Failed to add comment");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, "Comment added successfully", savedComment));
});

const updateComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;

  if (!req.user) {
    throw new ApiError(401, "User needs to be logged in to update a comment");
  }

  if (!isValidObjectId(commentId)) {
    throw new ApiError(400, "Invalid comment ID");
  }

  if (!content || content.trim() === "") {
    throw new ApiError(400, "Comment content cannot be empty");
  }

  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      throw new ApiError(404, "Comment not found");
    }

    if (!comment.owner.equals(req.user._id)) {
      throw new ApiError(403, "Not authorized to update this comment");
    }

    comment.content = content;
    await comment.save();

    return res
      .status(200)
      .json(new ApiResponse(200, "Comment updated successfully", comment));
  } catch (error) {
    throw new ApiError(500, "Failed to update comment");
  }
});

const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;

  if (!req.user) {
    throw new ApiError(401, "User needs to be logged in to delete a comment");
  }

  if (!isValidObjectId(commentId)) {
    throw new ApiError(400, "Invalid comment ID");
  }

  const comment = await Comment.findById(commentId);

  if (!comment) {
    throw new ApiError(404, "Comment not found");
  }

  if (!comment.owner.equals(req.user._id)) {
    throw new ApiError(403, "Not authorized to delete this comment");
  }

  await Comment.findByIdAndDelete(commentId);

  return res
    .status(200)
    .json(new ApiResponse(200, "Comment deleted successfully"));
});

export { getVideoComments, addComment, updateComment, deleteComment };
