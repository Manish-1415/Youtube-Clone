import ApiError from "../../utility/ApiError";
import { WatchLater } from "./watchLater.model";

const watchLaterService = {
    createWatchLaterEntry : async (userId , videoId) => {
        const findWatchLater = await WatchLater.findOne({userId , videoId});

        if(findWatchLater) throw new ApiError(400 , "Video Already Added in WatchLater");

        const createWatchLater = await WatchLater.create({userId , videoId});

        if(!createWatchLater) throw new ApiError(500 , "Error Occurred while creating watch later");

        return createWatchLater;
    },

    deleteWatchLaterEntry : async (userId , vidDocId) => {
        const findVidInWatchLater = await WatchLater.findById(vidDocId);

        if(!findVidInWatchLater) throw new ApiError(404 , "Vid Not Found in WatchLater");

        if(findVidInWatchLater.userId.toString() !== userId.toString()) throw new ApiError(403 , "User is Unauthorized to perform this Operation");

        const findAndDelVidEntry = await WatchLater.findByIdAndDelete(vidDocId);

        return findAndDelVidEntry;
    },

    getWatchLaterEntrys : async(userId) => {
        const findVids = await WatchLater.find({userId});

        if(findVids.length === 0) return [];

        return findVids;
    }
}

export default watchLaterService;