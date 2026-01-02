import Router from "express";

import validateUserMiddleware from "../../middlewares/validUser.middleware";
import findChannelForUserMiddleware from "../../middlewares/findChannelForUser.middleware";
import checkUserIsOwnerOfChannelMiddleware from "../../middlewares/checkUsersChannelOwnerShip.middleware";
import validateSchemaMiddleware from "../../middlewares/validation.middleware";
import { updateVideoSchema, uploadVideoSchema } from "./video.validation";
import { deleteTheVideo, getVideo, updateTheUploadedVideo, uploadVideo } from "./video.controller";

const router = Router();

router.post("/videos/", validateUserMiddleware , findChannelForUserMiddleware , checkUserIsOwnerOfChannelMiddleware , validateSchemaMiddleware(uploadVideoSchema) , uploadVideo);

router.patch("/videos/:videoId/", validateUserMiddleware , findChannelForUserMiddleware , checkUserIsOwnerOfChannelMiddleware , validateSchemaMiddleware(updateVideoSchema) , updateTheUploadedVideo);


router.delete("/videos/:videoId/", validateSchemaMiddleware , findChannelForUserMiddleware , checkUserIsOwnerOfChannelMiddleware , deleteTheVideo);

router.get("/video/:videoId/", getVideo);

export default router;