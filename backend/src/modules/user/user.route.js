import Router from "express";
import validateUserMiddleware from "../../middlewares/validUser.middleware.js";
import validateSchemaMiddleware from "../../middlewares/validation.middleware.js";
import { updateUserProfileSchema } from "./user.validation.js";
import { getUserProfile, updateUserProfile } from "./user.controller.js";

const router = Router();

router.patch("/:id", validateUserMiddleware , validateSchemaMiddleware(updateUserProfileSchema) , updateUserProfile);

router.get("/profile" , validateUserMiddleware , getUserProfile);

export default router;