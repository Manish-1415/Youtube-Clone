import Router from "express";
import validateUserMiddleware from "../../middlewares/validUser.middleware";
import validateSchemaMiddleware from "../../middlewares/validation.middleware";
import { updateUserProfileSchema } from "./user.validation";
import { getUserProfile, updateUserProfile } from "./user.controller";

const router = Router();

router.patch("/:id", validateUserMiddleware , validateSchemaMiddleware(updateUserProfileSchema) , updateUserProfile);

router.get("/profile" , validateUserMiddleware , getUserProfile);

export default router;