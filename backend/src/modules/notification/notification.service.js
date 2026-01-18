import ApiError from "../../utility/ApiError";
import { Notification } from "./notification.model";

const notificationService = {
    createNotification : async (payload) => {
        const notification = await Notification.create(payload);

        if(!notification) throw new ApiError(500 , "Error Occurred While Creating Notification");

        return "Everything Exectued Perfectly..."
    },
    

    getNotificationsForChannel : async (channelId) => {
        // find notifications for channel
        const findNotifications = await Notification.find({receiverId : channelId , isRead : false});

        if(findNotifications.length === 0) return {notificationCount : 0 , message : "No Unread Notifications Present"}

        return findNotifications;

        },


    updateSingleNotification : async (notificationId) => {
        // find notifi.
        let notification = await Notification.findById(notificationId);

        if(!notification) throw new ApiError(404 , "Notification Not Found TO Update");
        
        if(notification.isRead === true) throw new ApiError(400 , "Notification Already been Read");

        notification.isRead = true;

        await notification.save();

        return notification;
    },

    updateAllNotifications : async (channelId) => {
        // find Notifications related to channel
        const updateNotifications = await Notification.updateMany( {receiverId : channelId , isRead : false }, {$set: {isRead : true}} );

        if(updateNotifications.matchedCount === 0) throw new ApiError(400 , "No Unread Notifications");

        return updateNotifications;
    }
}


export default notificationService;