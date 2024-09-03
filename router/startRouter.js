import express from "express"
import { StudentInfo } from "../models/student.js";
const router = express.Router()

//  the secret number
router.post( "/", async ( request, response ) =>
{
    try
    {
        const { code } = request.body
        const result = await StudentInfo.findOne( { secretNumber: code } );
        if ( !result || result.length == 0 ) { return response.status( 404 ).json( { message: "الرمز غير موجدود الرجاء التأكد من الرمز ثم اعادة المحاولة" } ) }
        return response.status( 200 ).json( { message: "true", id: result._id } )
    }
    catch ( error ) { response.status( 500 ).json( { message: "الرمز غير موجدود الرجاء التأكد من الرمز ثم اعادة المحاولة" } ) }
} )

export default router;