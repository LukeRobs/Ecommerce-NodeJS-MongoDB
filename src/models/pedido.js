import mongoose from "mongoose";
import { generateOrderNumber } from "../utils/gerarNumeroPedido.js";
import { calcularTotal } from "../utils/calcularTotal.js";

const { Schema } = mongoose

const pedido = new Schema({
    usuario: {
        type: mongoose.Types.ObjectId,
        ref: "users",
        required: true
    },
    numeroPedido: {
        type: String,
        unique: true,
        validate: {
            validator: function(v) {
            return this.isNew ? true : !!v;
            },
        message: 'Número do pedido é obrigatório'
        }
    },
    status: {
        type: String,
        required: true,
        enum: ['pendente', 'processando', 'pago', 'enviado', 'entregue', 'cancelado'],
        default: 'pendente'
    },
    items: [{
        produto: {
            type: mongoose.Types.ObjectId,
            ref: "produtos",
            required: true
        },
        quantidade: {
            type: Number,
            required: true,
            min: 1
        },
        preco: {
            type: Number,
            required: true
        },
        subtotal: {
            type: Number,
            required: true
        },
    }],
    frete: {
        type: Number,
        required: true,
        default: 0
    },
    desconto: {
        type: Number,
        default: 0
    },
    observacoes: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    }
},
{
    timestamps: true
});

pedido.pre('save', async function(next) {
    if(!this.numeroPedido) {
        const numeroGerado = await generateOrderNumber();
        this.numeroPedido = numeroGerado;
    }
    next();
});
pedido.methods.calcularTotal = function() {
    return calcularTotal(this);
}

export const Pedido = mongoose.model("pedidos", pedido)