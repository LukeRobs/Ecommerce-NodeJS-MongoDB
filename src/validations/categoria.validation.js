import Joi from "joi";

export const createCategoriaSchema = Joi.object({
    nome: Joi.string().min(3).required(),
    descricao: Joi.string().min(10).max(250).required(),
})