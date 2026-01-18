import { Router } from "express";
import validateUserMiddleware from "../../middlewares/validUser.middleware";
import { giveLikedVideos } from "./likedVideos.controller";

const router = Router();

router.get("/", validateUserMiddleware , giveLikedVideos);

export default router;