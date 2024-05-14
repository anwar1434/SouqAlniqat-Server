import express  from "express"
import { StudentInfo } from "../models/student.js"; 

const router = express.Router()

router.put('/:id' , async (request, response) => {
    const { id } = request.params
    const { pointsToSubtract } = request.body;
    try {
        const student = await StudentInfo.findById( id )
        if (student.points < pointsToSubtract) {
            return response.status(201).json({ message: student.points }); 
        }        
        student.points -= pointsToSubtract
        await student.save()
        return response.status(200).json({message: student.points})
    }
    catch (error) {
        response.status(500).json({message: error})
    }
} )

router.post("/:id" , async (request , response) => {
    const { id } = request.params;
    const { newpoints } = request.body;
    

    try {
        const student = await StudentInfo.findByIdAndUpdate( id, { points: newpoints  }, { new: true } );
        
        response.json({ message: "تم تحديث  نقاط الطالب بنجاح", choices: student.choices });
    }
    catch (error) {response.json({message: "Error"})}
})


export default router