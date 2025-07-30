import express from 'express';
import { middlewareAuthentication } from "../middlewares/Authentication.middleware.js";
import {
    criarPedido,
    listarPedidos,
    listarPedido,
    listarPedidosPorCliente,
    atualizarPedido,
    atualizarStatus,
    confirmarPedido,
    cancelarPedido,
    prepararPedido,
    finalizarPreparo,
    entregarPedido,
    calcularTotal,
    deletarPedido,
    relatorioVendas,
    processarPagamento,
    iniciarEntrega
} from '../controllers/pedidoController.js'

const router = express.Router();


router.post('/', middlewareAuthentication, criarPedido);
router.get('/listar', middlewareAuthentication, listarPedidos);
router.get('/listar/:id', middlewareAuthentication, listarPedido);
router.put('/atualizar/:id', middlewareAuthentication, atualizarPedido);
router.delete('/delete/:id', middlewareAuthentication, deletarPedido);
router.get('/cliente/:clienteId', middlewareAuthentication, listarPedidosPorCliente)

// Rotas para gerenciamento de status
router.patch('/:id/status', middlewareAuthentication, atualizarStatus);
router.patch('/:id/confirmar', middlewareAuthentication, confirmarPedido);
router.patch('/:id/cancelar', middlewareAuthentication, cancelarPedido);
router.patch('/:id/preparar', middlewareAuthentication, prepararPedido);
router.patch('/:id/finalizar-preparo', middlewareAuthentication, finalizarPreparo);
router.patch('/:id/entregar', middlewareAuthentication, entregarPedido);

// outras rotas
router.get('/:id/total', middlewareAuthentication, calcularTotal);
router.get('/relatorio/vendas', middlewareAuthentication, relatorioVendas);
router.post('/:id/pagamento', middlewareAuthentication, processarPagamento);
router.post('/:id/entrega', middlewareAuthentication, iniciarEntrega);

export default router;