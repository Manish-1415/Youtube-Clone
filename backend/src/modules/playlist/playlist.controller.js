import asyncHandler from "express-async-handler"
import ApiResponse from "../../utility/ApiResponse.js"
import playlistService from "./playlist.service.js";

export const createPlaylist = asyncHandler(async (req , res) => {
    const userId = req.user.id;
    let playlistInfoObj = req.body;

    const playlist = await playlistService.createPlaylistEntry(userId , playlistInfoObj);

    return res
    .status(201)
    .json(new ApiResponse(201 , "Playlist Created Successfully" , playlist));
})


export const updatePlaylist = asyncHandler(async (req , res) => {
    const userId = req.user.id;
    const playlistId = req.params.playListId;
    const videoId = req.body.videoId;

    const playlist = await playlistService.updatePlaylistEntry(userId , playlistId , videoId);

    return res
    .status(200)
    .json(new ApiResponse(200 , "Video added in specific playlist" , playlist));
})


export const deleteVidFromPlaylist = asyncHandler(async (req , res) => {
    const userId = req.user.id;
    const playlistId = req.params.playListId;
    const videoId = req.body.videoId;

    const playlist = await playlistService.deleteVidEntryFromPlaylist(userId , playlistId , videoId);

    return res
    .status(200)
    .json(new ApiResponse(200 , "Video Removed from Playlist", playlist))
})


export const deletePlaylist = asyncHandler(async (req , res) => {
    const userId = req.user.id;
    const playlistId = req.params.playlistId;

    const playlist = await playlistService.deletePlaylistEntry(userId , playlistId);

    return res
    .status(200)
    .json(new ApiResponse(200 , "Playlist Deleted Successfully" , {message : "Playlist Deleted"}));
})


export const getPlaylistVids = asyncHandler(async (req , res) => {
    const playlistId = req.params.playlistId;

    const playlistVideos = await playlistService.getPlaylistVideosEntry(playlistId);

    return res
    .status(200)
    .json(new ApiResponse(200 , "Videos Fetched From Playlist" , playlistVideos));
})



export const getPlaylistsOfUser = asyncHandler(async (req , res) => {
    const userId = req.user.id;

    const playlist = await playlistService.getAllPlaylistOfUser(userId);

    return res
    .status(200)
    .json(new ApiResponse(200 , "Playlist Fetched Successfully of a User" , playlist));
})