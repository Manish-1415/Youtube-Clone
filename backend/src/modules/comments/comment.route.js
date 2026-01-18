import Router from "express"
import validateUserMiddleware from "../../middlewares/validUser.middleware.js";
import { createComment, deleteComment, getCommentsOnAVideo, updateComment } from "./comment.controller.js";
import validateSchemaMiddleware from "../../middlewares/validation.middleware.js";
import { createCommentSchema, updateCommentSchema } from "./comment.validation.js";

const router = Router();

router.post("/:videoId" , validateUserMiddleware , validateSchemaMiddleware(createCommentSchema) , createComment);

router.patch("/:commentId", validateUserMiddleware , validateSchemaMiddleware(updateCommentSchema) , updateComment);

router.delete("/:commentId", validateUserMiddleware , deleteComment);

router.get("/:videoId", getCommentsOnAVideo);

export default router;