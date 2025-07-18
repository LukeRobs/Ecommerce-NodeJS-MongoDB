import joi from 'joi';

export const createUserSchema = joi.object({
    name: joi.string().min(3).required(),
    surname: joi.string().min(3).required(),
    cpf: joi.number().min(11).required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
})
