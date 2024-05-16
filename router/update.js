import express  from "express"
import { StudentInfo } from "../models/student.js"; 
import { GamesInfo } from "../models/game.js"
const router = express.Router()

router.post("/:id" , async  (request , response) => {
    const { name, points, secretcode } = request.body
    const {id} = request.params
    try {
        const updateStudent = StudentInfo.findByIdAndUpdate( id, {  name,  points } ).exec();
        return response.status(200).json({message: "تم تحديث بيانات الطالب بنجاح"})
    }
    catch (error){response.json({message:error.message})}
})

export default router;