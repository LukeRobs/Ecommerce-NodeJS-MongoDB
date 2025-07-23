import mongoose from "mongoose";
const { Schema } = mongoose

const carrinho = new Schema({
    usuario: {
        type: mongoose.Types.ObjectId,
        ref: "users",
        required: true
    },
    itens: [
        {
        produto:  {
            type: mongoose.Types.ObjectId,
            ref: "produtos",
            required: true
            },
            quantidade: {
            type: Number,
            required: true
            },
            preco: {
            type: Number,
            required: true
            },
            subtotal: {
            type: Number,
            required: true,
        },
        },
    ],
    total: {
        type: Number,
        required: true
    }
},
{
    timestamps: true
});

export const Carrinho = mongoose.model("carrinho", carrinho)