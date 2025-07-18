import Joi from "joi";
import mongoose from "mongoose";


export const createProdutoSchema = Joi.object({
    nome: Joi.string().min(3).required(),
    descricao: Joi.string().min(10).max(250).allow('').optional(),
    preco: Joi.number().min(0).required(),
    estoque: Joi.number().integer().min(0).default(0),
    isActive: Joi.bool(),
    categoria: Joi.string().custom((value, helpers) => {
        if (mongoose.Types.ObjectId.isValid(value)) {
            return value;
        }  
        if (typeof value === 'string' && value.length >= 3) {
            return value;
        }
        return helpers.error('any.invalid');
        
    }, 'ObjectId or string validation').required()
});
