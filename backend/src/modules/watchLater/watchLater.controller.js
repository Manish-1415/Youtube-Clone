import ApiResponse from "../../utility/ApiResponse.js";
import asyncHandler from "express-async-handler"
import watchLaterService from "./watchLater.service.js";

export const createWatchLater = asyncHandler(async (req , res) => {
    const userId = req.user.id;
    const videoId = req.params.videoId;

    const watchLater = await watchLaterService.createWatchLaterEntry(userId , videoId);

    return res
    .status(200)
    .json(new ApiResponse(200 , "WatchLater created for a video" , watchLater));
})


export const deleteWatchLaterDoc = asyncHandler(async (req , res) => {
    const vidDocId = req.params.docId;
    const userId = req.user.id;

    const watchLaterDelete = await watchLaterService.deleteWatchLaterEntry(userId , vidDocId);

    return res
    .status(200)
    .json({success : true , message : "Video Removed from WatchLater"});
})

export const getWatchLaterForUser = asyncHandler(async (req , res) => {
    const userId = req.user.id;

    const watchLaterVids = await watchLaterService.getWatchLaterEntrys(userId);

    return res
    .status(200)
    .json(new ApiResponse(200 , "Videos Fetched From Watch Later" , watchLaterVids));
})