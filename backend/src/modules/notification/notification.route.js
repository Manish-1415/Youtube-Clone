import Router from "express"
import validateUserMiddleware from "../../middlewares/validUser.middleware"
import { getNotifications, updateAllNotificationsOfChannel, updateSingleNotificationAsRead } from "./notification.controller";
import validateSchemaMiddleware from "../../middlewares/validation.middleware";
import { markNotificationReadValidation } from "./notification.validation";

const router = Router();

router.get("/:channelId" , getNotifications);

router.patch("/read/:id" , validateUserMiddleware , validateSchemaMiddleware(markNotificationReadValidation) , updateSingleNotificationAsRead);

router.patch("/read/:channelId", validateUserMiddleware , validateSchemaMiddleware(markNotificationReadValidation), updateAllNotificationsOfChannel)

export default router;