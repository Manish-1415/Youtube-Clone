import ApiError from "../../utility/ApiError";
import { History } from "./history.model";

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
    }
}

export default historyService;