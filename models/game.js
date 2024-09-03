import mongoose from "mongoose";

const gamesScema = mongoose.Schema( {
    name: String,
    price: Number,
    photo: String,
    quantity: {
        type: Number,
        default:0
    },
    type: String ,
    SpecificQuantity: Boolean
} );

export const GamesInfo = mongoose.model( "GamesInfo", gamesScema );
