import mongoose from "mongoose";
const { Schema } = mongoose

const produtos = new Schema({
    nome: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        unique: true
    },
    descricao: {
        type: String,
        required: true
    },
    preco: {
        type: Number,
        required: true
    },
    estoque: {
        type: Number,
        required: true,
        min: 0
    },
    imagens: {
        type: [String],
        default: [],
        required: true
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: "categorias",
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
    },  
    {
    timestamps: true
    });

    produtos.pre('save', function(next) {
    if(!this.slug && this.nome) {
        this.slug = this.nome
        .toLowerCase()
        .normalize('NFD') 
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '-')           
        .replace(/[^\w\-]+/g, '')       
        .replace(/\-\-+/g, '-')         
        .replace(/^-+/, '')             
        .replace(/-+$/, '');
    }
    next();
});

export const Produto = mongoose.model("produtos", produtos)