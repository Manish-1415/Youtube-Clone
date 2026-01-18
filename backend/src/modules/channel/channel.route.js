import { Router } from "express";
import validateUserMiddleware from "../../middlewares/validUser.middleware.js";
import validateSchemaMiddleware from "../../middlewares/validation.middleware.js";
import { createChannelSchema, updateChannelSchema } from "./channel.validation.js";
import { createChannel, deleteTheChannel, getChannel, updateTheChannel } from "./channel.controller.js";

const router = Router();

router.post("/channels/", validateUserMiddleware , validateSchemaMiddleware(createChannelSchema) , createChannel)


router.patch("/channels/:channelId" , validateUserMiddleware , validateSchemaMiddleware(updateChannelSchema) , updateTheChannel)


router.delete("/channels/:channelId" , validateUserMiddleware , deleteTheChannel);

router.get("/channel/:channelId" , getChannel);

export default router;