import { Router } from "express";
import validateUserMiddleware from "../../middlewares/validUser.middleware";
import { createPlaylist, updatePlaylist } from "./playlist.controller";
import validateSchemaMiddleware from "../../middlewares/validation.middleware"
import { playlistValidationSchema, videoIdValidation } from "./playlist.validation";

const router = Router();

router.post("/", validateUserMiddleware , validateSchemaMiddleware(playlistValidationSchema) , createPlaylist);

router.patch("/:playlistId" , validateUserMiddleware , validateSchemaMiddleware(videoIdValidation) , updatePlaylist);


export default router;