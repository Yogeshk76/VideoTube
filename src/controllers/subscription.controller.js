import mongoose, {isValidObjectId} from "mongoose"
// import {User} from "../models/user.model.js"
import { Subscription } from "../models/subscription.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const toggleSubscription = asyncHandler(async (req, res) => {
    const {channelId} = req.params
    const subscriberId = req.user?._id

    if (!isValidObjectId(channelId)) {
        throw new ApiError(400, "Invalid channel ID")
    }

    if (!isValidObjectId(subscriberId)) {
        throw new ApiError(400, "Invalid subscriber ID")
    }

    if (channelId.toString() === subscriberId.toString()) {
    throw new ApiError(400, "You cannot subscribe to your own channel");
    }

    const existingSubscription = await Subscription.findOne({
        channel: channelId,
        subscriber: subscriberId
    })
    let isSubscribed;

    if (existingSubscription) {
        await Subscription.findByIdAndDelete(existingSubscription._id);
        isSubscribed = false;
    }
    else {
        await Subscription.create({
            channel: channelId,
            subscriber: subscriberId
        })
        isSubscribed = true;
    }

      return res.status(200).json(
    new ApiResponse(200, {
      isSubscribed,
    }, isSubscribed ? "Subscribed successfully" : "Unsubscribed successfully")
  );
});

const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const {channelId} = req.params

    if (!isValidObjectId(channelId)) {
        throw new ApiError(400, "Invalid channel ID")
    }

    const subscribers = await Subscription.find({ channel: channelId })
        .populate("subscriber", "email username avatar")

    if (subscribers.length === 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, [], "No subscribers found for this channel"));
  }

    return res.status(200).json(
        new ApiResponse(200, subscribers, "Subscribers retrieved successfully")
    )
})

const getSubscribedChannels = asyncHandler(async (req, res) => {
    const {subscriberId} = req.params

    if (!isValidObjectId(subscriberId)) {
        throw new ApiError(400, "Invalid subscriber ID")
    }

    const subscribedChannels = await Subscription.find({ subscriber: subscriberId })
        .populate("channel", "email username avatar")

    if (subscribedChannels.length === 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, [], "No subscribed channels found for this user"));
  }

    return res.status(200).json(
        new ApiResponse(200, subscribedChannels, "Subscribed channels retrieved successfully")
    )
})

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}