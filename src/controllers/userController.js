import { Users } from '../models/user.js';
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
import { verificarCpf } from '../utils/cript.js';

const generateToken = (userId) => {
    return jwt.sign({id: userId}, process.env.JWT_SECRET, {
        expiresIn: "1h"
    });
};

export const createUser = async (req, res) => {
    const { name, surname, cpf, email, password} = req.body

    try {
        const userExists = await Users.findOne({email});
        if(userExists) {
            return res.status(400).json({Message: "E-mail já cadastrado"});
        }

        if (!verificarCpf(cpf)) {
            return res.status(400).json({ message: "CPF inválido." });
        }
   
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt)

    const newUser = new Users({
        name, 
        surname, 
        cpf, 
        email, 
        password: passwordHash
    });
    await newUser.save();
    res.status(201).json({
        message: "Usuário cadastrado com sucesso",
        token: generateToken(newUser._id),
        user: {
        id: newUser._id,
        name: newUser.name,
        surname: newUser.surname,
        cpf: newUser.cpf,
        email: newUser.email,
        password: newUser.password
        }
    });
    }
    catch(err) {
        console.error("Erro ao cadastrar:", err);
        res.status(500).json({message: "Erro ao cadastrar usuário"});
    }
};


export const loginUser = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await Users.findOne({email});
        if (!user) {
            return res.status(404).json({message: "Usuario não encontrado"});
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword) {
            return res.status(401).json({message: "Senha invalida"})
        }

        res.status(200).json({
            message: "Login realizado com sucesso",
            user: {
                token: generateToken(user._id),
                name: user.name,
                surname: user.surname,
                email: user.email
        }
        });  
    }
    catch(err) {
        res.status(500).json({ message: "Erro ao realizar login"})
    }
}



