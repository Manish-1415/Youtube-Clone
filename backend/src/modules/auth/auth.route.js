import { Router } from "express";

import validateSchemaMiddleware from "../../middlewares/validation.middleware.js";
import { loginSchema, registerSchema } from "./auth.validation.js";
import { assignNewToken, loginTheUser, logOutUser, registerUser } from "./auth.controller.js";
import validateUserMiddleware from "../../middlewares/validUser.middleware.js";
import validateRefreshToken from "../../middlewares/verifyRefreshToken.middleware.js";

const router = Router();

//register user
router.post("/register", validateSchemaMiddleware(registerSchema), registerUser)

router.post("/login", validateSchemaMiddleware(loginSchema) , loginTheUser);

router.post("/logout" , validateUserMiddleware , logOutUser);

router.post("/refresh" , validateRefreshToken , assignNewToken);

export default router;