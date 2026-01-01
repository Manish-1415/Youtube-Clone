import asyncHandler from "express-async-handler";
import {Channel} from "../modules/channel/channel.model.js"
import ApiError from "../utility/ApiError.js"

const findChannelForUserMiddleware = asyncHandler(async (req , res , next) => {
    const channelId = req.body.channelId;
    //find channel 
    const findChannel = await Channel.findById(channelId);

    if(!findChannel) throw new ApiError(404 , "Channel Not Found , User Not authorized to perform this operation");

    req.channel = findChannel;

    next();
})


export default findChannelForUserMiddleware;