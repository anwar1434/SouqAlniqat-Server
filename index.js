import { mongoDb } from "./config.js"
import express from "express"
import mongoose from "mongoose"


import studentRouter from "./router/studentRouter.js"
import gameRouter from "./router/gameRouter.js"
import startRouter from "./router/startRouter.js"
import pointsRouter from "./router/pointsRouter.js"
import upload from "./router/upload.js"
import update from "./router/update.js"


import cors from "cors"

const app = express()

const port = 5000
app.use(cors())
app.use( express.json() )


app.use( "/student", studentRouter );
app.use( "/game", gameRouter );
app.use( "/start", startRouter );
app.use( "/points", pointsRouter );
app.use( "/upload", upload );
app.use( "/update", update );



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


