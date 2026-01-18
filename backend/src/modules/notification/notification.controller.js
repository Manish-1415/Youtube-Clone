import ApiResponse from "../../utility/ApiResponse.js"
import asyncHandler from "express-async-handler"
import notificationService from "./notification.service.js"

export const getNotifications = asyncHandler(async (req , res) => {
    const channelId = req.params.channelId;

    const notifications = await notificationService.getNotificationsForChannel(channelId);

    return res
    .status(200)
    .json(new ApiResponse(200, "Notifications Fetched for a Channel" , notifications));
})


export const updateSingleNotificationAsRead = asyncHandler(async (req , res) => {
    const notificationToUpdate = req.params.id;

    const updateNotification = await notificationService.updateSingleNotification(isRead , notificationToUpdate);

    return res
    .status(200)
    .json(new ApiResponse(200 , "Notification Updated" , updateNotification))
})


export const updateAllNotificationsOfChannel = asyncHandler(async (req , res) => {
    const channelId = req.params.channelId;

    const notifications = await notificationService.updateAllNotifications(channelId , isRead);

    return res
    .status(200)
    .json(new ApiResponse(200 , "All Notifications Have Been Readed" , notifications));
})