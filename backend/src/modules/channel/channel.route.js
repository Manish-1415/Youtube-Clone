import { Router } from "express";
import validateUserMiddleware from "../../middlewares/validUser.middleware";
import validateSchemaMiddleware from "../../middlewares/validation.middleware";
import { createChannelSchema, updateChannelSchema } from "./channel.validation";
import { createChannel, deleteTheChannel, getMyChannel, updateTheChannel } from "./channel.controller";

const router = Router();

router.post("/channels/", validateUserMiddleware , validateSchemaMiddleware(createChannelSchema) , createChannel)


router.patch("/channels/:channelId" , validateUserMiddleware , validateSchemaMiddleware(updateChannelSchema) , updateTheChannel)


router.delete("/channels/:channelId" , validateUserMiddleware , deleteTheChannel);

router.get("/channel/:channelId" , getMyChannel);

export default router;