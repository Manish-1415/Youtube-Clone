import dotenv from "dotenv"
dotenv.config({path : "./.env"});

import app from "./app.js";
import connectWithDatabase from "./DB/connectDB.js";
import http from "http"
import { initSocket } from "./sockets/index.js";


const port = process.env.PORT | 8080;

//created an http server
const server = http.createServer(app);

//here we sending server & there in index.js the initial handshake is happening
initSocket(server)

connectWithDatabase()
.then( () =>  {
    server.listen(port , () => console.log(`App is Listening on Port ${port} 👍`))
})