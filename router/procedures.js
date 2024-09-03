import express from "express"
import { StudentInfo } from "../models/student.js";
import { GamesInfo } from "../models/game.js"

const router = express.Router()

router.put( "/:id", async ( request, response ) =>
{
  try
  {
    const { id } = request.params;
    const { gameName, gamePrice } = request.body;

    // العثور على الطالب بناءً على ID
    const result = await StudentInfo.findById( id );
    if ( !result )
    {
      return response.status( 404 ).json( { message: "الطالب غير موجود" } );
    }

    const game = await GamesInfo.findOne( { name: gameName } );
    if ( !game )
    {
      return response.status( 404 ).json( { message: "اللعبة غير موجودة" } );
    }

    if ( result.points < gamePrice )
    {
      return response.status( 400 ).json( { notHavePoints: "نقاطك غير كافية لشراء هذه اللعبة" } );
    }

    result.points -= gamePrice;
    game.quantity = game.quantity + 1;

    result.choices.push( {
      name: gameName,
      price: gamePrice
    } );

    // حفظ التعديلات
    await result.save();
    await game.save();

    response.status( 200 ).json( { message: "تمت الإضافة إلى السلة" } );
  } catch ( error )
  {
    response.status( 500 ).json( { message: "حدث خطأ في الخادم" } );
  }
} );


router.post( "/:id", async ( request, response ) =>
{
  const { id } = request.params;
  const { gameName, gamePrice } = request.body;

  try
  {
    const student = await StudentInfo.findById( id );
    const game = await GamesInfo.findOne( { name: gameName } );

    if ( !student )
    {
      return response.status( 404 ).json( { message: "Student not found" } );
    }

    const indexToRemove = student.choices.findIndex( ( choice ) => choice.name === gameName );

    if ( indexToRemove !== -1 )
    {
      student.choices.splice( indexToRemove, 1 );
    }

    student.points += gamePrice;
    if ( game.quantity > 0 )
    {
      game.quantity -= 1;
    } 
    await student.save();
    await game.save();


    response.json( { message: "تم تحديث قائمة اختيارات الطالب بنجاح", choices: student.choices } );
  } catch ( error )
  {
    console.error( "Error updating student choices:", error );
    response.status( 500 ).json( { message: "An error occurred while updating student choices" } );
  }
} );




export default router