import express from "express";
import { criarCarrinho, removeItemCarrinho, getCarrinhoUsuario } from '../controllers/carrinhoController.js';
import { middlewareAuthentication} from '../middlewares/Authentication.middleware.js'

const router = express();

router.get('/carrinho', middlewareAuthentication, getCarrinhoUsuario)
router.post('/carrinho', middlewareAuthentication, criarCarrinho)
router.delete('/carrinho/:produtoId', middlewareAuthentication, removeItemCarrinho)

export default router;