import mongoose, {isValidObjectId} from "mongoose"
import {Playlist} from "../models/playlist.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const createPlaylist = asyncHandler(async (req, res) => {
    const {name, description} = req.body

    if(!name || !description) {
        throw new ApiError(400, "Name and description are required")
    }

    if(!req.user)
        throw new ApiError(401, "Unauthorized")

    if(!isValidObjectId(req.user._id)) {
        throw new ApiError(400, "Invalid user ID")
    }

    const playlist = await Playlist.create({
        name,
        description,
        owner: req.user._id // Assuming req.user is set by the verifyJWT middleware
    })

    if (!playlist) {
        throw new ApiError(500, "Failed to create playlist")
    }

    return res
    .status(201)
    .json(new ApiResponse(201, "Playlist created successfully", playlist))
})

const getUserPlaylists = asyncHandler(async (req, res) => {
    const {userId} = req.params
    if (!userId) {
        throw new ApiError(400, "User ID is required")
    }

    if (!isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid user ID")
    }

    const playlists = await Playlist.find({ owner: userId }).populate('videos', 'title duration').exec()

    if (!playlists) {
        return res.status(404).json(new ApiResponse(404, "No playlists found for this user"))
    }
    return res.status(200).json(new ApiResponse(200, "User playlists retrieved successfully", playlists))
})

const getPlaylistById = asyncHandler(async (req, res) => {
    const {playlistId} = req.params

    if (!req.user) {
        throw new ApiError(401, "Unauthorized")
    }

    if (!playlistId) {
        throw new ApiError(400, "Playlist ID is required")
    }

    if (!isValidObjectId(playlistId)) {
        throw new ApiError(400, "Invalid playlist ID")
    }

    const playlist = await Playlist.findById(playlistId).populate('videos', 'title duration').exec()
    if (!playlist) {
        throw new ApiError(404, "Playlist not found")
    }

    if(!(playlist.owner.equals(req.user._id))) {
    throw new ApiError(403, "You do not have permission to access this playlist")
    }

    if(!playlist) {
        return res.status(404).json(new ApiResponse(404, "Playlist not found"))
    }

    return res.status(200).json(new ApiResponse(200, "Playlist retrieved successfully", playlist))
})

const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params

    if(!req.user) {
        throw new ApiError(401, "Unauthorized")
    }

    if(!(playlistId && videoId)) {
        throw new ApiError(400, "Playlist ID and Video ID are required")
    }

    if(!isValidObjectId(playlistId) || !isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid playlist ID or video ID")
    }

    const playlist = await Playlist.findById(playlistId)
    if (!playlist) {
        throw new ApiError(404, "Playlist not found")
    }

    if(!(playlist.owner.equals(req.user._id))) {
        throw new ApiError(403, "You do not have permission to modify this playlist")
    }

    const updatedPlaylist = await Playlist.findByIdAndUpdate(
        playlistId,
        { $addToSet: { videos: videoId } }, // Use $addToSet to avoid duplicates
        { new: true}
    ).populate('videos', 'title duration').exec()

    if (!updatedPlaylist) {
        throw new ApiError(500, "Failed to add video to playlist")
    }
    return res
    .status(200)
    .json(new ApiResponse(200, "Video added to playlist successfully", updatedPlaylist))
});

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params
    if(!req.user) {
        throw new ApiError(401, "Unauthorized")
    }

    if(!(playlistId && videoId)) {
        throw new ApiError(400, "Playlist ID and Video ID are required")
    }

    if(!isValidObjectId(playlistId) || !isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid playlist ID or video ID")
    }

    const playlist = await Playlist.findById(playlistId)
    if (!playlist) {
        throw new ApiError(404, "Playlist not found")
    }
    if(!(playlist.owner.equals(req.user._id))) {
        throw new ApiError(403, "You do not have permission to modify this playlist")
    }

    const updatedPlaylist = await Playlist.findByIdAndUpdate(
        playlistId,
        { $pull: { videos: videoId } }, 
        { new: true }
    )

    if (!updatedPlaylist) {
        throw new ApiError(500, "Failed to remove video from playlist")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, "Video removed from playlist successfully", updatedPlaylist))

})

const deletePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    
    if(!req.user) {
        throw new ApiError(401, "Unauthorized")
    }

    if(!playlistId) {
        throw new ApiError(400, "Playlist ID is required")
    }

    if(!isValidObjectId(playlistId)) {
        throw new ApiError(400, "Invalid playlist ID")
    }

    const playlist = await Playlist.findById(playlistId)
    if (!playlist) {
        throw new ApiError(404, "Playlist not found")
    }

    if(!(playlist.owner.equals(req.user._id))) {
        throw new ApiError(403, "You do not have permission to delete this playlist")
    }

    const deletedPlaylist = await Playlist.findByIdAndDelete(playlistId)
    if (!deletedPlaylist) {
        throw new ApiError(500, "Failed to delete playlist")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, "Playlist deleted successfully", deletedPlaylist))
})

const updatePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    const {name, description} = req.body

    if(!req.user) {
        throw new ApiError(401, "Unauthorized")
    }

    if(!playlistId) {
        throw new ApiError(400, "Playlist ID is required")
    }

    if(!isValidObjectId(playlistId)) {
        throw new ApiError(400, "Invalid playlist ID")
    }

    const playlist = await Playlist.findById(playlistId)
    if (!playlist) {
        throw new ApiError(404, "Playlist not found")
    }

    if(!(playlist.owner.equals(req.user._id))) {
        throw new ApiError(403, "You do not have permission to update this playlist")
    }

    const updatedPlaylist = await Playlist.findByIdAndUpdate(
        playlistId,
        { name, description },
        { new: true }
    )

    if (!updatedPlaylist) {
        throw new ApiError(500, "Failed to update playlist")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, "Playlist updated successfully", updatedPlaylist))
})

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
}