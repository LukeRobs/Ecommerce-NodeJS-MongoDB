import express from "express";
import {createUser, loginUser } from "../controllers/userController.js";
import { middlewareAuthentication } from "../middlewares/Authentication.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import { createUserSchema } from "../validations/user.validation.js";
import { pagination } from "../middlewares/pagination.middleware.js";

const router = express.Router();

router.post('/cadastro', validate(createUserSchema), createUser);
router.post('/login', loginUser);


//Listar usuarios (somente Admin)
router.get('/usuarios', pagination, middlewareAuthentication, (req, res) => {

});


export default router;