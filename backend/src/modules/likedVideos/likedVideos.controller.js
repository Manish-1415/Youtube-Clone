import ApiResponse from "../../utility/ApiResponse";
import asyncHandler from "express-async-handler"
import likedVideosService from "./likedVideos.service";

export const giveLikedVideos = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const likedVideos = await likedVideosService.likedVideos(userId);

    return res
    .status(200)
    .json(new ApiResponse(200 , "Liked Video Reaction Fetched", likedVideos));
})