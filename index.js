import { mongoDb } from "./config.js"
import express from "express"
import mongoose from "mongoose"


import studentRouter from "./router/studentRouter.js"
import gameRouter from "./router/gameRouter.js"
import startRouter from "./router/startRouter.js"
import total from "./router/total.js"
import procedures from "./router/procedures.js"

import cors from "cors"

const app = express()

const port = 5000
app.use(cors())
app.use( express.json() )


app.use( "/student", studentRouter ); // Students Info
app.use( "/game", gameRouter ); // Games Info
app.use( "/start", startRouter ); // LogIn
app.use("/procedures" , procedures) // Add & Delete Order
app.use( "/total", total );



mongoose.connect( mongoDb )
    .then(() => {
        app.listen( port, ( ) => { 
            console.log( `App is listen to the port ${ port }` )
            console.log("Connection is successful");
        })
    })
    .catch((error) => {
        console.log(error);
    })


