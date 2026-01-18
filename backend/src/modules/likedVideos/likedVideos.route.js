import { Router } from "express";
import validateUserMiddleware from "../../middlewares/validUser.middleware.js";
import { giveLikedVideos } from "./likedVideos.controller.js";

const router = Router();

router.get("/", validateUserMiddleware , giveLikedVideos);

export default router;