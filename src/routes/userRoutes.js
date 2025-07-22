import express from "express";
import {createUser, loginUser } from "../controllers/userController.js";
import { middlewareAuthentication } from "../middlewares/Authentication.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import { createUserSchema } from "../validations/user.validation.js";
import { pagination } from "../middlewares/pagination.middleware.js";

const router = express.Router();

router.post('/cadastro', validate(createUserSchema), async (req, res) => {
    try {
        const user = createUser(req.body);
        await user.save();
        res.status(201).json({
        message: "Usuário cadastrado com sucesso",
        token: generateToken(newUser._id),
        user: {
            id: user._id,
            name: user.name,
            surname: user.surname,
            cpf: user.cpf,
            email: user.email,
        }
    });
    }
    catch(err) {

    }
});
router.post('/login', loginUser);


//Listar usuarios (somente Admin)
router.get('/usuarios', pagination, middlewareAuthentication, (req, res) => {

});


export default router;