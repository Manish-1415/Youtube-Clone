import asyncHandler from "express-async-handler"
import channelService from "./channel.service.js";
import ApiResponse from "../../utility/ApiResponse.js"

export const createChannel = asyncHandler(async (req , res) => {
    const channelInfoObj = req.body;
    const userId = req.user.id;
    // const refreshToken = req.cookies.refreshToken;

    const channel = await channelService.createChannelEntry(channelInfoObj , userId);

    const resObjSendToUser = {
        ownerUserId : channel.ownerUserId,
        channelName : channel.channelName,
        description : channel.description,
        avatar : {
            url : channel.avatar.url,
            path : channel.avatar.path,
        }
    }

    return res
    .status(201)
    .json(new ApiResponse(201 , "Channel is Created", resObjSendToUser));
})



export const updateTheChannel = asyncHandler(async (req , res) => {
    const userId = req.user.id;
    const channelInfoObj = req.body;
    const channelId = req.params.channelId;

    const updatedChannel = await channelService.updateChannelEntry(userId , channelId , channelInfoObj);

    const resObjSendToUser = {
        ownerUserId : updatedChannel.ownerUserId,
        channelName : updatedChannel.channelName,
        description : updatedChannel.description,
        avatar : {
            url : updatedChannel.avatar.url,
            path : updatedChannel.avatar.path
        }
    }

    return res
    .status(200)
    .json(new ApiResponse(200 , "Channel Updated Successfully", resObjSendToUser));
})



export const deleteTheChannel = asyncHandler(async (req , res) => {
    const userId = req.user.id;
    const channelId = req.params.id;

    const deleteChannel = await channelService.deleteChannelEntry(userId , channelId);

    return res
    .status(200)
    .json(new ApiResponse(200, "Channel Deleted Successfully ", {deletedChannel : deleteChannel.channelName}));
})



export const getChannel = asyncHandler(async (req , res) => {
    const channeId = req.params.channeId;

    const channel = await channelService.getChannelEntry(channeId);

    const resObjSendToUser = {
        channelName : channel.channelName,
        description : channel.description,
        avatar : {
            url : channel.avatar.url,
            path : channel.avatar.path,
        }
    }

    return res
    .status(200)
    .json(new ApiResponse(200 , "Channel Fetched Successfully", resObjSendToUser));
});