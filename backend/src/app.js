import express from "express"

const app = express();

import cookieParser from "cookie-parser";
import cors from "cors"

// useful middlewares

app.use(express.json());

app.use(express.static("public"))

app.use(express.urlencoded( {extended : true} ));

app.use(cookieParser())

app.use(cors({origin : process.env.CORS_ORIGIN , credentials : true}));




// Routers
import authRouter from "./modules/auth/auth.route.js";
import userRouter from "./modules/user/user.route.js";
import channelRouter from "./modules/channel/channel.route.js";
import videoRouter from "./modules/video/video.route.js";
import subscriptionRouter from "./modules/subscription/subscription.route.js";
import commentRouter from "./modules/comments/comment.route.js";
import reactionRouter from "./modules/reaction/reaction.route.js";

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/channels", channelRouter);
app.use("/api/v1/videos" , videoRouter);
app.use("/api/v1/subscriptions" , subscriptionRouter);
app.use("/api/v1/comments" , commentRouter);
app.use("/api/v1/reactions" , reactionRouter);
// err middleware at last
import errorMiddleware from "./middlewares/error.middleware.js";

app.use(errorMiddleware());

export default app;