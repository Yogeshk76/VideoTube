import mongoose, { isValidObjectId } from "mongoose";
import { Video } from "../models/video.model.js";
// import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const getAllVideos = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    query = "",
    sortBy = "createdAt",
    sortType = "desc",
    userId,
  } = req.query;

  const match = {
    isPublished: true,
    ...(query ? { title: { $regex: query, $options: "i" } } : {}),
    ...(userId ? { owner: mongoose.Types.ObjectId(userId) } : {}),
  };

  const skip = (parseInt(page) - 1) * parseInt(limit);
  const sortOrder = sortType === "asc" ? 1 : -1;

  const totalVideos = await Video.countDocuments(match);

  const videos = await Video.aggregate([
    {
      $match: match,
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
      $project: {
        videoFile: 1,
        thumbnail: 1,
        title: 1,
        description: 1,
        duration: 1,
        views: 1,
        isPublished: 1,
        owner: {
          $arrayElemAt: ["$owner", 0],
        },
      },
    },
    {
      $sort: {
        [sortBy]: sortOrder,
      },
    },
    {
      $skip: skip,
    },
    {
      $limit: parseInt(limit),
    },
  ]);

  if (!videos || videos.length === 0) {
    return ApiResponse.success(res, "No videos found", []);
  }

  return res.status(200).json(
    new ApiResponse(200, "Videos fetched successfully", {
      videos,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(totalVideos / limit),
      totalVideos,
    })
  );
});

const publishAVideo = asyncHandler(async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!req.user) {
      throw new ApiError(401, "User needs to be logged in to publish a video");
    }

    if (!title || !description) {
      throw new ApiError(
        400,
        "Title and description are required to publish a video"
      );
    }

    let videoLocalPath;

    if (
      req.files &&
      Array.isArray(req.files.videoFile) &&
      req.files.videoFile.length > 0
    ) {
      videoLocalPath = req.files.videoFile[0].path;
    }

    if (!videoLocalPath) {
      throw new ApiError(400, "Video file is required to publish a video");
    }

    const videoUpload = await uploadOnCloudinary(
      videoLocalPath,
      `videoFile/${req.user._id}`
    );

    let thumbnailLocalPath;

    if (
      req.files &&
      Array.isArray(req.files.thumbnail) &&
      req.files.thumbnail.length > 0
    ) {
      thumbnailLocalPath = req.files.thumbnail[0].path;
    }

    if (!thumbnailLocalPath) {
      throw new ApiError(400, "Thumbnail is required to publish a video");
    }

    const thumbnailUpload = await uploadOnCloudinary(
      thumbnailLocalPath,
      `thumbnail/${req.user._id}`
    );

    const video = await Video.create({
      title,
      description,
      duration: videoUpload.duration,
      videoFile: videoUpload.secure_url,
      thumbnail: thumbnailUpload.secure_url,
      videoPublicId: videoUpload.public_id,
      thumbnailPublicId: thumbnailUpload.public_id,
      owner: req.user._id,
    });

    return res
      .status(201)
      .json(new ApiResponse(201, "Video published successfully", video));
  } catch (error) {
    throw new ApiError(
      500,
      error?.message || "Something went wrong while publishing video"
    );
  }
});

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid video ID");
  }

  const video = await Video.findById(videoId).populate("owner", "name email");

  if (!video) {
    throw new ApiError(404, "Video not found");
  }

  if (!video.isPublished) {
    throw new ApiError(403, "This video is not published");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Video fetched successfully", video));
});

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { title, description } = req.body;

  if (!req.user) {
    throw new ApiError(401, "User must be logged in");
  }

  if (!(title || description)) {
    throw new ApiError(400, "Title or description is required to update video");
  }

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid video ID");
  }

  const video = await Video.findById(videoId);

  if (!video) {
    throw new ApiError(404, "Video not found");
  }

  if (!video.owner.equals(req.user._id)) {
  throw new ApiError(403, "Not authorized to modify this video");
}

  try {
    const thumbnailLocalPath = req.files?.thumbnail?.[0]?.path;

    if (thumbnailLocalPath) {
      const thumbnailUpload = await uploadOnCloudinary(
        thumbnailLocalPath,
        `thumbnail/${req.user._id}`
      );

      if (video.thumbnailPublicId) {
        await cloudinary.uploader.destroy(video.thumbnailPublicId);
      }

      video.thumbnail = thumbnailUpload.secure_url;
      video.thumbnailPublicId = thumbnailUpload.public_id;
    }
  } catch (error) {
    throw new ApiError(500, "Thumbnail upload failed");
  }

  video.title = title || video.title;
  video.description = description || video.description;

  await video.save();

  return res
    .status(200)
    .json(new ApiResponse(200, video, "Video updated successfully"));
});

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!req.user) {
  throw new ApiError(401, "User must be logged in");
}

  const video = await Video.findById(videoId);

  if (!video) {
    throw new ApiError(404, "Video not found");
  }

  if (!video.owner.equals(req.user._id)) {
  throw new ApiError(403, "Not authorized to modify this video");
}

  await Video.findByIdAndDelete(videoId);

  try {
    if (video.videoPublicId) {
      await cloudinary.uploader.destroy(video.videoPublicId, {
        resource_type: "video",
      });
    }

    if (video.thumbnailPublicId) {
      await cloudinary.uploader.destroy(video.thumbnailPublicId, {
        resource_type: "image",
      });
    }
  } catch (err) {
    throw new ApiError(500, err);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Video deleted successfully"));
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!req.user) {
  throw new ApiError(401, "User must be logged in");
}

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID");
    }

    const video = await Video.findById(videoId);

    if (!video.owner.equals(req.user._id)) {
  throw new ApiError(403, "Not authorized to modify this video");
}

    video.isPublished = !video.isPublished;
    await video.save();

    return res
        .status(200)
        .json(new ApiResponse(200, video, "Video publish status toggled successfully"));
});

export {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
};
