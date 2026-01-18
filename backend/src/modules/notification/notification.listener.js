import eventBus from "../../eventBus/index.js";
import notificationService from "./notification.service.js";

eventBus.on("REACTION_CREATED", async (payload) => {
    const notification = await notificationService.createNotification(payload);
})

eventBus.on("COMMENT_CREATED", async(payload) => {
    const notification = await notificationService.createNotification(payload);
})

eventBus.on("SUBSCRIPTION_CREATED", async(payload) => {
    const notification = await notificationService.createNotification(payload);
})