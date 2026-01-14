import Router from "express"
import validateUserMiddleware from "../../middlewares/validUser.middleware";

const router = Router();

router.post("/", validateUserMiddleware , )


export default router;