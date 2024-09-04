import express, { request, response } from "express"
import { StudentInfo } from "../models/student.js";
const router = express.Router()

router.get( "/", async ( request, response ) =>
{
    try
    {
        const allStudents = await StudentInfo.find( {} )
        allStudents.map( ( student ) =>
        {
            if ( !student.totalPoints )
            {
                student.totalPoints = 0;
            }
            const list = student.choices
            for ( let i = 0; i < list.length; i++ )
            {
                student.totalPoints += list[i].price
            }
            student.totalPoints += student.points
        } )
        const studentsWithChoices = allStudents.map( student =>
        {
            const listChoice = student.choices.reduce( ( acc, choice ) =>
            {
                const existingChoice = acc.find( item => item.name === choice.name );
                if ( existingChoice )
                {
                    existingChoice.quantity += 1;
                } else
                {
                    acc.push( { name: choice.name, price: choice.price, quantity: 1 } );
                }
                return acc;
            }, [] );

            return {
                ...student.toObject(), // تحويل الطالب إلى كائن عادي
                listChoice // إضافة listChoice إلى كل طالب
            };
        } );

        // إرسال الاستجابة مع البيانات المنسقة
        response.status( 200 ).json( {
            success: true,
            data: studentsWithChoices
        } );
    }
    catch ( error ) { response.status( 500 ).send( error.message ) }
} )

router.get( "/:id", async ( request, response ) =>
{
    const { id } = request.params;
    try
    {
        const result = await StudentInfo.findById( id )
        return response.status( 200 ).json( { result } );
    }
    catch ( error ) { response.status( 500 ).json( { message: "يوجد خطأ" } ) }
} );

router.post( "/", async ( request, response ) =>
{
    const { name, points, secretNumber, phoneNumber } = request.body;
    const newStudent = new StudentInfo( {
        name: name,
        points: points,
        secretNumber: secretNumber,
        phoneNumber: phoneNumber
    } );
    try
    {
        await newStudent.save();
        response.status( 200 ).send( "تمت إضافة الطالب  بنجاح" )
    }
    catch ( error ) { response.status( 500 ).send( error.message ) }
} );

router.put( "/:id", async ( request, response ) =>
{
    const { name, points, secretNumber, phoneNumber } = request.body
    const { id } = request.params
    try
    {
        const updateStudent = await StudentInfo.findByIdAndUpdate( id, { name, points, secretNumber, phoneNumber } ).exec();
        return response.status( 200 ).json( { message: "تم تحديث بيانات الطالب بنجاح" } )
    }
    catch ( error ) { response.json( { message: error.message } ) }
} )

router.delete( '/:id', async ( request, response ) =>
{
    try
    {
        const { id } = request.params 
        const result = await StudentInfo.findByIdAndDelete( id );

        if ( !result )
        {
            return response.status( 404 ).send( 'لم يتم العثور على طالب بهذا المُعرّف' );
        }

        return response.status( 200 ).send( 'تم حذف الطالب بنجاح' );
    } catch ( error )
    {
        // معالجة الخطأ بشكل مُستقل
        if ( error.name === 'CastError' )
        {
            // خطأ في تحويل id إلى ObjectID
            return response.status( 400 ).send( 'المُعرّف غير صالح' );
        } else
        {
            // خطأ آخر
            return response.status( 500 ).send( 'حدث خطأ أثناء حذف الطالب' );
        }
    }
} );

// router.delete( "/", async ( request, response ) =>
//     {
//         try
//         {
//             const result = await StudentInfo.deleteMany( {} )
//             if ( !result ) { return response.status( 404 ).send( "الطالب محذوف بالفعل" ) }
//             return response.status( 200 ).send( "تم حذف الطالب  بنجاح" )
//         }
//         catch ( error ) { response.status( 500 ).send( error.message ) }
//     } )

export default router