import Router from "express"
import validateUserMiddleware from "../../middlewares/validUser.middleware";
import { deleteReaction, generateNewReaction, getReactions, getUserReaction, toggleReaction } from "./reaction.controller";
import validateSchemaMiddleware from "../../middlewares/validation.middleware";
import { reactionSchema } from "./reaction.validation";

const router = Router();

router.post("/", validateUserMiddleware , validateSchemaMiddleware(reactionSchema) ,generateNewReaction);

router.delete("/:reactionId", validateUserMiddleware , deleteReaction);

router.patch("/:reactionId", validateUserMiddleware , toggleReaction);

router.get("/:targetId/:targetType", getReactions);

router.get("/:targetId/:targetType" , getUserReaction);

export default router;