import mongoose, { Types } from "mongoose";

const studentScema = mongoose.Schema( {
    name: { type: String , trim: true },
    points: Number,
    totalPoints : Number,
    secretNumber: Number,
    phoneNumber: Number,
    choices: [
        {
            name: String,
            price: Number
        }
    ]
} );

export const StudentInfo = mongoose.model( "StudentInfo", studentScema );
