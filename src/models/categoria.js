import mongoose from "mongoose";
const { Schema } = mongoose;


const Categorias = new Schema({

    nome: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        unique: true
    },
    descricao: {
        type: String,
        required: true
    }
})

Categorias.pre('save', function(next){
    if(!this.slug) {
        this.slug = this.nome
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
    }
    next();
});

export const Categoria = mongoose.model("categorias", Categorias)