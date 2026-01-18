import { Router } from "express";
import validateUserMiddleware from "../../middlewares/validUser.middleware";
import { createWatchLater, deleteWatchLaterDoc, getWatchLaterForUser } from "./watchLater.controller";

const router = Router();

router.post("/:videoId", validateUserMiddleware , createWatchLater);

router.delete("/:docId" , validateUserMiddleware , deleteWatchLaterDoc);

router.get("/" , getWatchLaterForUser);

export default router;