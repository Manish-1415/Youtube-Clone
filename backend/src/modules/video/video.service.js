import ApiError from "../../utility/ApiError"
import { Channel } from "../channel/channel.model.js";
import {Video} from "./video.model.js"

const videoService = {
    uploadVideoEntry : async (videoInfoObj) => {
        // delete the channelId
        delete videoInfoObj.channelId;
        // upload video
        const video = await Video.create(videoInfoObj);

        if(!video) throw new ApiError(500 , "Error Occurred while uploading the video");
        
        return video;
    },


    updateVideoEntry : async (videoId , videoInfoObj) => {
        // delete the channelId -
        delete videoInfoObj.channelId;

        const findVideo = await Video.findById(videoId);

        if(!findVideo) throw new ApiError(404 , "Video Not Found");

        // if video is there then update it.

        const findAndUpdateTheVid = await Video.findByIdAndUpdate(videoId , videoInfoObj ,{new : true});

        if(!findAndUpdateTheVid) throw new ApiError(500 , "Error Occurred While Saving DB Entry");

        return findAndUpdateTheVid;
    },

    deleteVideoEntry : async (videoId) => {
        // find the video first
        const findVideo = await Video.findById(videoId);

        if(!findVideo) throw new ApiError(404 , "Video Not Found , for deleting");

        const findAndDeleteVideo = await Video.findByIdAndDelete(findVideo);

        if(!findAndDeleteVideo) throw new ApiError(500 , "Error Occurred while deleting Video");

        return findAndDeleteVideo;
    },

    getVideoEntry : async (videoId) => {
        // find Video
        const video = await Video.findById(videoId);

        if(!video) throw new ApiError(404 , "Video Not Found");

        return video;
    },

    getAllVideoEntry : async (channelId) => {
        // find channel
        const channel = await Channel.findById(channelId);

        if(!channel) throw new ApiError(404 , "Channel Not Found");

        // now give me all video related to channel

        const allVids = await Video.find({channelId : channelId});

        if(allVids.length === 0) return [];

        else {
            return allVids;
        }
    }
}

export default videoService;