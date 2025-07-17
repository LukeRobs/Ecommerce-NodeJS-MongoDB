import express from "express";
import {createUser, loginUser } from "../controllers/userController.js";
import { middlewareAuthentication } from "../middlewares/middlewares.js";


const router = express.Router();

router.post('/cadastro', createUser);
router.post('/login', loginUser);


//Listar usuarios (somente Admin)
router.get('/usuarios', middlewareAuthentication, (req, res) => {

});


export default router;