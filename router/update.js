import express  from "express"
import { StudentInfo } from "../models/student.js"; 
import { GamesInfo } from "../models/game.js"
const router = express.Router()

router.post("/:id" , async  (request , response) => {
    const { name, points , secretNumber , phoneNumber } = request.body
    const { id } = request.params
    try {
        const updateStudent = await StudentInfo.findByIdAndUpdate( id, {  name,  points , secretNumber  , phoneNumber} ).exec();
        return response.status(200).json({message: "تم تحديث بيانات الطالب بنجاح"})
    }
    catch (error){response.json({message:error.message})}
})

export default router;