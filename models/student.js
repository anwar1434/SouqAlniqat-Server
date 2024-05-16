import mongoose, { Types } from "mongoose";

const studentScema = mongoose.Schema( {
    name: { type: String , trim: true },
    points: Number,
    secretNumber: Number,
    phoneNumber: Number,
    choices: [[String , Number]]
} );

export const StudentInfo = mongoose.model( "StudentInfo", studentScema );
