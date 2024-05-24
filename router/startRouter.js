import express from "express"
import { StudentInfo } from "../models/student.js"; 
const router = express.Router()


router.post("/" , async (request , response ) => {
    try {
        const { code } = request.body
        const result = await StudentInfo.findOne( { secretNumber: code } );
        if ( !result || result.length == 0 ) { return response.status(404).json( { message: "الرمز غير موجدود الرجاء التأكد من الرمز ثم اعادة المحاولة" } ) }
        return response.status( 200 ).json( { message: "true" , id: result._id } )
    }
    catch ( error ) { response.status( 500 ).json( { message: "الرمز غير موجدود الرجاء التأكد من الرمز ثم اعادة المحاولة"  } )}
} )

router.get("/:id" , async (request , response) => {
    const { id } = request.params;
    try {
        const result = await StudentInfo.findById( id )
        return response.status( 200 ).json( { result } );
    }
    catch(error){response.status(500).json({message: "يوجد خطأ"})}
} );

router.put("/:id" , async (request , response) => {
    const { id } = request.params;
    const { newList , newpoints } = request.body;
    try {
        const student = await StudentInfo.findByIdAndUpdate( id, { choices: newList  }, { new: true } );
        
        response.json({ message: "تم تحديث قائمة اختيارات الطالب بنجاح", choices: student.choices });
    }
    catch (error) {response.json({message: "Error"})}
})


export default router;