import ApiError from "../../utility/ApiError.js";
import { History } from "./history.model.js";

const historyService = {
    createHistoryEntryForUser : async (userId , videoId) => {
        // find if user already watched the video / history have a doc
        let findHistory = await History.findOne({userId , videoId})

        if(findHistory) {
            findHistory.watchedAt = Date.now();
            findHistory.watchCount += 1;

            return await findHistory.save();
        }
        else {
            // now simply create a Doc .
            const historyObj = {
                videoId ,
                userId ,
            }

            const createHistory = await History.create(historyObj);

            if(!createHistory) throw new ApiError(500 , "Error Occurred while creating history obj");

            return createHistory;
        }
    },

    giveUserHistory : async (userId , page = 1 , limit = 10) => {
        let skip = (page - 1) * limit;
        // find if your watch something or not
        const findUserHistory = await History.find().skip(skip).limit(limit);

        if(!findUserHistory) throw new ApiError(404 , "User Didnt have any History");

        const totalVideosWatched = await History.countDocuments({userId})

        return {
            videoData : findUserHistory,
            totalVideosWatched,
            pagination : {
                page ,
                limit ,
            },
            totalPages : Math.ceil(totalVideosWatched / limit) 
        }
    }
}

export default historyService;