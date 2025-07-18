import express from 'express';
import {criarProduto, listarProdutos, listarProduto, editarProduto, deletarProduto } from '../controllers/produtoController.js';
import validate from '../middlewares/validate.middleware.js';
import { createProdutoSchema } from '../validations/produto.validation.js';

const router = express.Router();

router.post('/create', validate(createProdutoSchema), criarProduto)
router.get('/list', listarProdutos)
router.get('/list/:id', listarProduto)
router.put('/edit/:id', editarProduto)
router.delete('/delete/:id', deletarProduto)

export default router;