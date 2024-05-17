import express, { request, response } from "express"
import { StudentInfo } from "../models/student.js"; 

const router = express.Router()


router.get("/" , async (request, response) => {
    try{
        const allStudents = await StudentInfo.find( {} )
        return response.status( 200 ).json( {
            data: allStudents
        })}
    catch (error) {response.status(500).send(error.message)}
} )

router.get("/:id" , async (request , response) => {
    const { id } = request.params;
    try {
        const result = await StudentInfo.findById( id )
        return response.status( 200 ).json( { result } );
    }
    catch(error){response.status(500).json({message: "يوجد خطأ"})}
} );

router.post("/", async (request, response) => {
    const { name, points , secretNumber , phoneNumber} = request.body;
    const newStudent = new StudentInfo({
        name: name,
        points: points,
        secretNumber: secretNumber,
        phoneNumber:phoneNumber
});
    try {
        await newStudent.save();
        response.status(200).send("تمت إضافة الطالب  بنجاح")}
    catch ( error ) { response.status( 500 ).send( error.message ) }
} );

router.put("/:id" , async (request , response) => {
    try {
        const { id } = request.params;
        const game = request.body.gameName
        const gamePrice = request.body.gamePrice
    
        const result = await StudentInfo.findById( id )
        if (result.points < gamePrice) {
            return response.status(201).json({ notHavePoints: "نقاطك غير كافية لشراء هذه اللعبة" }); 
        }
        result.choices.push( [game , gamePrice] )
        await result.save()
        response.status( 200 ).json( { message: "تمت الاضافة الى السلة"} );
    }
    catch (error) { response.json({message: "error"})}
} )

router.delete("/:id" , async (request , response) => {
    try { 
        const { id } = request.params
        const result = await StudentInfo.findByIdAndDelete( id )
        if ( !result ) {return response.status( 404 ).send( "الطالب محذوف بالفعل" ) }
        return response.status(200).send("تم حذف الطالب  بنجاح")
    }
    catch (error) {response.status(500).send(error.message)}
} )

export default router