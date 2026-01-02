import Router from "express"

import validateUserMiddleware from "../../middlewares/validUser.middleware.js";
import { addSubscriber, removeSubscriber } from "./subscription.controller.js";

const router = Router();

router.post("/subscribe/:channelId" , validateUserMiddleware , addSubscriber);

router.delete("/subscribe/:channelId", validateUserMiddleware , removeSubscriber);


export default router;