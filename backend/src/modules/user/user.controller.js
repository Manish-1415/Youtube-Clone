import asyncHandler from "express-async-handler";
import userService from "./user.service";
import ApiResponse from "../../utility/ApiResponse.js"

export const updateUserProfile = asyncHandler(async (req , res) => {
    const userInfoObj = req.body;
    const userId = req.user.id;
    const refreshToken = req.cookies.refreshToken;

    const user = await userService.updateUserEntry(userId , userInfoObj , refreshToken);

    const updatedUser = {
        id : user._id,
        name : user.name,
        email : user.email,
        avatar : user.avatar
    }

    return res
    .status(200) 
    .json(new ApiResponse(200 , "User Entry Updated" , updatedUser));
})


export const getUserProfile = asyncHandler(async (req , res) => {
    const userId = req.user.id;

    const profile = await userService.getUserEntry(userId);

    return res
    .status(200)
    .json(new ApiResponse(200 , "User Profile Fetched Successfully", profile));
})

