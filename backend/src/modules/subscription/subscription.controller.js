import asyncHandler from "express-async-handler";
import ApiResponse from "../../utility/ApiResponse.js";
import subscriptionService from "./subscription.service.js";

export const addSubscriber = asyncHandler(async (req , res) => {
    const channelId = req.params.channelId;
    const userId = req.user.id;

    const subscribe = await subscriptionService.subscribeChannel(channelId , userId);

    return res
    .status(201)
    .json(new ApiResponse(201, "Channel Gets Subscribed", subscribe));
})


export const removeSubscriber = asyncHandler(async (req , res) => {
    const channelId = req.params.channelId;
    const userId = req.user.id;

    const unsubscribe = await subscriptionService.unsubscribeChannel(channelId , userId);

    return res
    .status(200)
    .json(new ApiResponse(200, "Unsubcribe the Channel", {unsubscibeTo : unsubscribe.channel.channelName}));
})