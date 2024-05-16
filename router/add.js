import express from "express"
import { StudentInfo } from "../models/student.js"; 
import XLSX from "xlsx"
const router = express.Router()
const workbook = XLSX.readFile( "./FileA.xlsx" );
const worksheet = workbook.Sheets[workbook.SheetNames[0]];
const data = XLSX.utils.sheet_to_json( worksheet, { header: 1 } );


const doucemt = data.map((row) => {
    return new StudentInfo( {
        name: row[0],
        points: row[1],
        secretNumber: [2]
    } );
} );

    StudentInfo.insertMany(doucemt , function(err , res){
        if ( err ) throw err;
        console.log( "تم" );

    } )
    
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

export default router