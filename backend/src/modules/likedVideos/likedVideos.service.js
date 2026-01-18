import ApiError from "../../utility/ApiError.js";
import {Reaction} from "../reaction/reaction.model.js"

const likedVideosService = {
    likedVideos : async (userId) => {
        const findLikedVideos = await Reaction.find({userId , targetType : "video" , reaction : "like"});

        if(findLikedVideos.length === 0) return [];
        
        return findLikedVideos;
    }
}

export default likedVideosService;