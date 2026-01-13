import eventBus from "../../eventBus";
import notificationService from "./notification.service";

eventBus.on("REACTION_CREATED", async (payload) => {
    const notification = await notificationService.createNotification(payload);
})

eventBus.on("COMMENT_CREATED", async(payload) => {
    const notification = await notificationService.createNotification(payload);
})

eventBus.on("SUBSCRIPTION_CREATED", async(payload) => {
    const notification = await notificationService.createNotification(payload);
})