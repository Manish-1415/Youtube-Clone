import express from "express"

const app = express();

import cookieParser from "cookie-parser";
import cors from "cors"


app.use(express.json());

app.use(express.static("public"))

app.use(express.urlencoded( {extended : true} ));

app.use(cookieParser())

app.use(cors({origin : process.env.CORS_ORIGIN , credentials : true}));

export default app;