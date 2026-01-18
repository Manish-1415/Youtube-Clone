import Router from "express";

import validateUserMiddleware from "../../middlewares/validUser.middleware.js";
import findChannelForUserMiddleware from "../../middlewares/findChannelForUser.middleware.js";
import checkUserIsOwnerOfChannelMiddleware from "../../middlewares/checkUsersChannelOwnerShip.middleware.js";
import validateSchemaMiddleware from "../../middlewares/validation.middleware.js";
import { updateVideoSchema, uploadVideoSchema } from "./video.validation.js";
import { deleteTheVideo, getAllVideoOfaChannel, getVideo, updateTheUploadedVideo, updateTheViewCount, uploadVideo } from "./video.controller.js";

const router = Router();

router.post("/:channelId", validateUserMiddleware , findChannelForUserMiddleware , checkUserIsOwnerOfChannelMiddleware , validateSchemaMiddleware(uploadVideoSchema) , uploadVideo);

router.patch("/:videoId", validateUserMiddleware , findChannelForUserMiddleware , checkUserIsOwnerOfChannelMiddleware , validateSchemaMiddleware(updateVideoSchema) , updateTheUploadedVideo);


router.delete("/:videoId", validateSchemaMiddleware , findChannelForUserMiddleware , checkUserIsOwnerOfChannelMiddleware , deleteTheVideo);

router.get("/:videoId", getVideo);

router.get("/:channelId" , getAllVideoOfaChannel);

router.patch("/:videoId/views" , updateTheViewCount)

export default router;