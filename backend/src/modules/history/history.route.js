import Router from "express"
import validateUserMiddleware from "../../middlewares/validUser.middleware.js";
import { createHistoryForUser, getUserHistory } from "./history.controller.js";

const router = Router();

router.post("/", validateUserMiddleware , createHistoryForUser);

router.get("/" , validateUserMiddleware , getUserHistory);


export default router;