import ApiError from "../utility/ApiError";


const checkUserIsOwnerOfChannelMiddleware = (req , res , next) => {
    const userId = req.user.id;
    // const channelId = req.body.channelId;
    const channelObj = req.channel;

    if(channelObj.ownerUserId.toString() !== userId.toString()) throw new ApiError(401, "User cannot perform this operation");

    next();
}


export default checkUserIsOwnerOfChannelMiddleware;