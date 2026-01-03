import Router from "express"
import validateUserMiddleware from "../../middlewares/validUser.middleware";
import { createComment, deleteComment, getCommentsOnAVideo, updateComment } from "./comment.controller";
import validateSchemaMiddleware from "../../middlewares/validation.middleware";
import { createCommentSchema, updateCommentSchema } from "./comment.validation";

const router = Router();

router.post("/:videoId" , validateUserMiddleware , validateSchemaMiddleware(createCommentSchema) , createComment);

router.patch("/:commentId", validateUserMiddleware , validateSchemaMiddleware(updateCommentSchema) , updateComment);

router.delete("/:commentId", validateUserMiddleware , deleteComment);

router.get("/:videoId", getCommentsOnAVideo);

export default router;