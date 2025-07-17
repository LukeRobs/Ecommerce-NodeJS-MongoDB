import express from 'express';
import {criarProduto, listarProdutos, listarProduto, editarProduto, deletarProduto } from '../controllers/produtoController.js'

const router = express.Router();

router.post('/create', criarProduto)
router.get('/list', listarProdutos)
router.get('/list/:id', listarProduto)
router.put('/edit/:id', editarProduto)
router.delete('/delete/:id', deletarProduto)

export default router;