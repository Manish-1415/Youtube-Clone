import { Subscription } from "./subscription.model";
import ApiError from "../../utility/ApiError.js"
import {Channel} from "../channel/channel.model.js";
import eventBus from "../../eventBus/index.js";

const subscriptionService = { 
    subscribeChannel : async (channelId , userId , userName) => {
        // find if user already subscribed or not
        const checkSubscriber = await Subscription.findOne({subscriberUserId : userId , channelId : channelId});

        if(checkSubscriber) throw new ApiError(400 , "User Already Subscribed , cannot Subscribe more than 1");

        const subscribeByUser = {
            subscriberUserId : userId,
            channelId : channelId
        }

        const subscribe = await Subscription.create(subscribeByUser);

        if(!subscribe) throw new ApiError(500 , "Error Occurred While Subscribing Channel");


        // shout Event 🐉🐉🐉😁😁😁😁🦁🦁🦁🦁

        eventBus.emit("SUBSCRIPTION_CREATED" , {
            receiverId : channelId,
            actorId : userId,
            type : "SUBSCRIPTION",
            targetType : "CHANNEL",
            targetId : channelId,
            message : `${userName} Subscribed Your Channel`
        })

        // now update the subscriber count of that channel
        const subscribersCount = await Subscription.countDocuments({channelId});

        let findChannel = await Channel.findById(channelId);

        if(!findChannel) throw new ApiError(404 , "Channel Not Found");

        findChannel.subscribersCount = subscribersCount;

        await findChannel.save();

        return subscribe;

    },


    unsubscribeChannel : async (channelId , userId) => {

        const findSubscription = await Subscription.findOne({subscriberUserId : userId , channelId});

        if(!findSubscription) throw new ApiError(400 , "User Did Not Subscribed this channel");
    
        // delete subscriber

        const deleteSubscriber = await Subscription.findByIdAndDelete(findSubscription._id);

        const subscriberCount = await Subscription.countDocuments({channelId});

        let findChannel = await Channel.findById(channelId);

        if(!findChannel) throw new ApiError(404 , "Channel Not Found");

        findChannel.subscribersCount = subscriberCount;

        await findChannel.save();

        return {channel : findChannel , unsubscribeChannel : deleteSubscriber}
    }
}


export default subscriptionService;