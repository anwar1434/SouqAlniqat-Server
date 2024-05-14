import mongoose from "mongoose";

const gamesScema = mongoose.Schema( {
    name: String,
    price: Number,
    image: String
} );

export const GamesInfo = mongoose.model( "GamesInfo", gamesScema );
