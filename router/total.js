import express, { request, response } from "express"
import { StudentInfo } from "../models/student.js"; 
import { GamesInfo } from "../models/game.js"
const router = express.Router()

router.get("/", (request , response) => {
    const student = StudentInfo.find( {} );
    const game = GamesInfo.find( {} );

    try {
        return response.status( 200 ).json( { student: student, game: game } );
    }
    catch (error) {
        response.json({error})
    }
})


export default router