import { Router } from "express";
import validateUserMiddleware from "../../middlewares/validUser.middleware.js";
import { createPlaylist, deletePlaylist, deleteVidFromPlaylist, getPlaylistsOfUser, getPlaylistVids, updatePlaylist } from "./playlist.controller.js";
import validateSchemaMiddleware from "../../middlewares/validation.middleware.js"
import { playlistValidationSchema, videoIdValidation } from "./playlist.validation.js";

const router = Router();

router.post("/", validateUserMiddleware , validateSchemaMiddleware(playlistValidationSchema) , createPlaylist);

router.patch("/:playlistId" , validateUserMiddleware , validateSchemaMiddleware(videoIdValidation) , updatePlaylist);

router.delete("/video/:playlistId", validateUserMiddleware , validateSchemaMiddleware(videoIdValidation) , deleteVidFromPlaylist)

router.delete("/:playlistId", validateUserMiddleware , deletePlaylist);

router.get("/:playlistId" , getPlaylistVids);

router.get("/" , validateUserMiddleware , getPlaylistsOfUser);

export default router;