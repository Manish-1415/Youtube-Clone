import dotenv from "dotenv"
dotenv.config({path : "./.env"});

import app from "./app.js";
import connectWithDatabase from "./DB/connectDB.js";

const port = process.env.PORT | 8080;

connectWithDatabase()
.then( () =>  {
    app.listen(port , () => console.log(`App is Listening on Port ${port} 👍`))
})