import express, { response } from "express"
import multer from "multer";
import path from "path"
import { fileURLToPath } from "url";
import { GamesInfo } from "../models/game.js"
import { request } from "http";




const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage( {
    destination: function ( req, file, cb )
    {
        cb( null, path.join( __dirname, "../images" ) )
    },
    filename: function ( req, file, cb )
    {
        cb( null, new Date().toISOString().replace(/:/g , '-') + file.originalname );
    }
} );

const upload = multer({storage})

router.post("/" , upload.single("image") , async (request , response) => {
    const { name, price } = request.body
    const image = request.file.filename
    try
    {
        const newGame = new GamesInfo( { name , price , image } )
        await newGame.save()
        response.status(200).json({message: "upload true"})
    }
    catch (error){response.json({message: "fales"})}

})
router.get("/", async (requset , response) => {
    try{
        const allStudents = await GamesInfo.find( {} )
        return response.status( 200 ).json( {
            data: allStudents
        })}
    catch (error) {response.status(500).send(error.message)}
} )




export default router