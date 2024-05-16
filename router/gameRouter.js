import express, { response }  from "express"
import { GamesInfo } from "../models/game.js"

const router = express.Router()


router.get("/", async (requset , response) => {
    try{
        const allStudents = await GamesInfo.find( {} )
        return response.status( 200 ).json( {
            data: allStudents
        })}
    catch (error) {response.status(500).send(error.message)}
} )

router.post("/" , async (request , response ) => {
    const { name, price , photo} = request.body
    try {
        const newGame = new GamesInfo( {
            name: name, 
            price: price,
            photo:photo
        } )
        await newGame.save();
        response.json({message: "تمت اضافة اللعبة بنجاح"})
    }
    catch (error) {response.json({message: error.message})}
});

router.put("/:id" , async  (request , response) => {
    const { name, price , photo } = request.body
    const { id } = request.params
    try {
        const updateStudent = await GamesInfo.findByIdAndUpdate( id, {  name,  price , photo  } ).exec();
        return response.status(200).json({message: "تم تحديث بيانات اللعبة بنجاح"})
    }
    catch (error){response.status(500).json({message: "حدث خطأ الرجاء المحاولة لاحقا"})}
})

router.delete("/:id" , async (request , response) => {
    try { 
        const { id } = request.params
        const result = await GamesInfo.findByIdAndDelete( id )
        if ( !result ) {return response.status( 404 ).send( "الطالب محذوف بالفعل" ) }
        return response.status(200).send("تم حذف الطالب  بنجاح")
    }
    catch (error) {response.status(500).send(error.message)}
} )
export default router