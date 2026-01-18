import Router from "express"
import validateUserMiddleware from "../../middlewares/validUser.middleware.js"
import { getNotifications, updateAllNotificationsOfChannel, updateSingleNotificationAsRead } from "./notification.controller.js";
import validateSchemaMiddleware from "../../middlewares/validation.middleware.js";
import { markNotificationReadValidation } from "./notification.validation.js";

const router = Router();

router.get("/:channelId" , getNotifications);

router.patch("/read/:id" , validateUserMiddleware , validateSchemaMiddleware(markNotificationReadValidation) , updateSingleNotificationAsRead);

router.patch("/read/:channelId", validateUserMiddleware , validateSchemaMiddleware(markNotificationReadValidation), updateAllNotificationsOfChannel)

export default router;