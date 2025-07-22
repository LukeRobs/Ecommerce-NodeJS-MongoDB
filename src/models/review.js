import mongoose from "mongoose";
const { Schema } = mongoose;

const reviews = new Schema({
    usuario: {
        type: mongoose.Types.ObjectId,
        ref: "users",
        required: true
    },
    produto: {
        type: mongoose.Types.ObjectId,
        ref: "produtos",
        required: true
    },
    nota: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comentario: {
        type: String,
        trim: true
    },
},
{
    timestamps: true
});

reviews.index({usuario: 1, produto: 1}, {unique: true});

export const Review = mongoose.model("reviews", reviews)