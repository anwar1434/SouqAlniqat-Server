import mongoose from "mongoose";

const gamesScema = mongoose.Schema( {
    name: String,
    price: Number,
    photo: String
} );

export const GamesInfo = mongoose.model( "GamesInfo", gamesScema );
