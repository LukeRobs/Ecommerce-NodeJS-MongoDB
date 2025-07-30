import express from 'express';
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


router.post('/', criarPedido);
router.get('/listar', listarPedidos);
router.get('/listar/:id', listarPedido);
router.put('/atualizar/:id', atualizarPedido);
router.delete('/delete/:id', deletarPedido);
router.get('/cliente/:clienteId', listarPedidosPorCliente)

// Rotas para gerenciamento de status
router.patch('/:id/status', atualizarStatus);
router.patch('/:id/confirmar', confirmarPedido);
router.patch('/:id/cancelar', cancelarPedido);
router.patch('/:id/preparar', prepararPedido);
router.patch('/:id/finalizar-preparo', finalizarPreparo);
router.patch('/:id/entregar', entregarPedido);

// outras rotas
router.get('/:id/total', calcularTotal);
router.get('/relatorio/vendas', relatorioVendas);
router.post('/:id/pagamento', processarPagamento);
router.post('/:id/entrega', iniciarEntrega);

export default router;