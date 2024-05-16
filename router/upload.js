import express, { response } from "express"
import { GamesInfo } from "../models/game.js"
import { request } from "http";

const router = express.Router();

router.get("/", async (requset , response) => {
    try{
        const allStudents = await GamesInfo.find( {} )
        return response.status( 200 ).json( {
            data: allStudents
        })}
    catch (error) {response.status(500).send(error.message)}
} )

export default router