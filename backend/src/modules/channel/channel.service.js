import eventBus from "../../eventBus/index.js";
import ApiError from "../../utility/ApiError.js";
import {Auth} from "../auth/auth.model.js"
import { Channel } from "./channel.model.js";

const channelService = {
    createChannelEntry : async (channelInfoObj , userId) => {
        //find user
        const user = await Auth.findById(userId);

        if(!user) throw new ApiError(404 , "User Not Found");

        // if user is there then simply create the channel

        const newChannelObj = {
            ownerUserId : userId,
            channelName : channelInfoObj.channelName,
            description : channelInfoObj.description,
            avatar : {
                url : channelInfoObj.avatar.url,
                path : channelInfoObj.avatar.path
            },
        }

        // create new channel now

        const channel = await Channel.create(newChannelObj);

        if(!channel) throw new ApiError(500 , "Error Occurred while creating new Channel");

        return channel;
    },


    updateChannelEntry : async (userId ,channelId ,channelInfoObj) => {
        // no need to check for user cause here we will check for channel & whoever owns a channel is a user

        // find the channel
        let findTheChannel = await Channel.findById(channelId);

        if(!findTheChannel) throw new ApiError(404 , "Channel Does Not Exist");

        // if channel is there then check its userId's
        if(findTheChannel.ownerUserId.toString() !== userId.toString()) throw new ApiError(401 , "User is Not Authorized to perform this operation");


        // store publicId for deleting purpose
        let oldPublicId ;

        if(channelInfoObj.avatar.path && findTheChannel.avatar?.path) {
            oldPublicId = findTheChannel.avatar.path;
        }

        // now update the channelInfo

        const findAndUpdateChannel = await Channel.findByIdAndUpdate(channelId , channelInfoObj , {new : true});

        if(!findAndUpdateChannel) throw new ApiError(500 , "Error Occurred While Updating the channel");

        // shout the event ⚙️⚙️🐉🐉👉👉😁😁

        if(oldPublicId && oldPublicId !== undefined) {
            eventBus.emit("CLOUDINARY_PROFILE_DELETE" , {
            publicId : oldPublicId,
        })
        }

        return findAndUpdateChannel;
    },


    deleteChannelEntry : async (userId , channelId) => {
        // find the channel
        const findChannel = await Channel.findById(channelId);

        if(!findChannel) throw new ApiError(404 ,"Channel Not Found");

        if(findChannel.ownerUserId.toString() !== userId.toString()) throw new ApiError(401 , "User Cannot Perform This Operation");

        // store old publicId
        let oldPublicId;

        if(findChannel.avatar.path) {
            oldPublicId = findChannel.avatar.path;
        }

        // find & delete the channel
        const findAndDeleteChannel = await Channel.findByIdAndDelete(channelId);

        if(!findAndDeleteChannel) throw new ApiError(500 , "Error Occurred while saving DB Entry");

        if(oldPublicId && oldPublicId !== undefined) {
            eventBus.emit("CLOUDINARY_PROFILE_DELETE" , {
            publicId : oldPublicId
        })
        }

        return findAndDeleteChannel;
    },


    getChannelEntry : async (channelId) => {
        // find channel
        const findChannel = await Channel.findById(channelId);

        if(!findChannel) throw new ApiError(404 , "Channel Is Not Found");

        return findChannel;
    }
}

export default channelService;