import express, { request, response } from "express"
import { StudentInfo } from "../models/student.js"; 

const router = express.Router();

router.post("/" , async (request , response) => {
    const { name } = request.body;
    try {
        const result = await StudentInfo.find( name )
        if (!result){return response.status(404).json({message:"الطالب غير موجود"})}
        return response.status( 200 ).json( { result } );
    }
    catch(error){response.status(500).json({message: "يوجد خطأ"})}
} );





export default router