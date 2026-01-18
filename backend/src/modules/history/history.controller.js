import ApiResponse from "../../utility/ApiResponse.js"
import asyncHandler from "express-async-handler"
import historyService from "./history.service.js";

export const createHistoryForUser = asyncHandler(async (req , res) => {
    const userId = req.user.id;
    const videoId = req.params.videoId;

    const history = await historyService.createHistoryEntryForUser(userId , videoId);

    return res
    .status(201)
    .json(new ApiResponse(201 , "History Obj Created For a User", history));
})

export const getUserHistory = asyncHandler(async (req , res) => {
    const userId = req.user.id;
    const {page , limit} = req.query;
    page = Number(page)
    limit = Number(limit)
    
    const history = await historyService.giveUserHistory(userId , page , limit);

    return res
    .status(200)
    .json(new ApiResponse(200 , "History fetched Successfully", history));
})