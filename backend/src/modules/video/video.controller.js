import asyncHandler from "express-async-handler"
import videoService from "./video.service";
import ApiResponse from "../../utility/ApiResponse.js"

export const uploadVideo = asyncHandler(async (req ,res) => {
    const channelId = req.params.channelId;
    let videoInfoObj = req.body;
    const userId = req.user.id;

    const video = await videoService.uploadVideoEntry(videoInfoObj , channelId , userId);

    return res
    .status(201)
    .json(new ApiResponse(201 , "Video Metadata Saved Successfully." , video))
})


export const updateTheUploadedVideo = asyncHandler(async (req , res) => {
    const videoId = req.params.videoId;
    const videoInfoObj = req.body;

    const updateVideo = await videoService.updateVideoEntry(videoId , videoInfoObj); 

    return res
    .status(200)
    .json(new ApiResponse(200 , "Video Updated Successfully." , updateVideo));
}) 


export const deleteTheVideo = asyncHandler(async (req , res) => {
    const videoId = req.params.videoId;

    const deletedVideo = await videoService.deleteVideoEntry(videoId);

    return res
    .status(200)
    .json(new ApiResponse(200 , "Video Deleted Successfully !", { deletedVideo : deletedVideo._id }))
})



export const getVideo = asyncHandler(async (req , res) => {
    const videoId = req.params.id;

    const video = await videoService.getVideoEntry(videoId);

    return res
    .status(200)
    .json(new ApiResponse(200 , "Video Fetched Successfully", video));
});


export const getAllVideoOfaChannel = asyncHandler(async (req , res) => {
    const channelId = req.params.id;

    const videos = await videoService.getAllVideoEntry(channelId);

    return res
    .status(200)
    .json(new ApiResponse(200 , "All Videos Fetched", videos));
})


export const updateTheViewCount = asyncHandler(async (req , res) => {
    const userId = req.user.id;
    const videoId = req.params.videoId;

    const videoWithViews = await videoService.updateViewInVideo(userId , videoId);

    return res
    .status(200)
    .json(new ApiResponse(200 , "View Updated Successfully", videoWithViews));
})