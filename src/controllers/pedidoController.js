import mongoose from "mongoose";
import { PedidoService } from "../services/pedidoService.js";
import { Pedido } from "../models/Pedido.js";
import { Pagamento } from "../models/Pagamento.js";
import { Entrega } from "../models/Entrega.js";


export const criarPedido = async (req, res) => {
    
    try {
        const { 
            clienteId, 
            itens, 
            endereco, 
            formaPagamento, 
            observacoes, 
            taxaEntrega 
        } = req.body;

        const dadosPedido = {
            usuario: clienteId,
            items: itens.map(item => {
                const subtotal = item.preco * item.quantidade;

                return {

              
                    produto: item.produtoId,
                    nome: item.nome,
                    preco: item.preco,
                    quantidade: item.quantidade,
                    subtotal,
                    observacoes: item.observacoes
                };
            }),
            observacoes,
            status: 'pendente'
        };
        const dadosPagamento = {
            formaPagamento,
            status: 'pendente'
        };
        const dadosEntrega = {
            endereco,
            taxaEntrega: taxaEntrega || 0,
            status: 'pendente'
        };
        const pedidoService = new PedidoService();
        const novoPedido = await pedidoService.criarPedido(dadosPedido, dadosPagamento, dadosEntrega);
        res.status(201).json({
            success: true, 
            message: 'Pedido criado com sucesso', 
            data: novoPedido
        });
    }
    catch(err) {
        console.error('Erro ao criar pedido:', err);
        res.status(400).json({
            success: false,
            message: err.message || 'Erro ao criar pedido',
            error: err.message
        });
    }
}
export const listarPedidos = async (req, res) => {
   try {
        const { page = 1, limit = 10, status, clienteId } = req.query;
        const filtros = {};
        
        if (status) filtros.status = status;
        if (clienteId) filtros.usuario = clienteId;

        const skip = (page - 1) * limit;
        const pedidos = await Pedido.find(filtros)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit))
            .populate('usuario', 'nome email')
            .populate('items.produto', 'nome preco');

        const total = await Pedido.countDocuments(filtros);

        res.status(200).json({
            success: true,
            message: 'Pedidos listados com sucesso',
            data: {
                pedidos,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total,
                    pages: Math.ceil(total / limit)
                }
            }
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Erro ao listar pedidos',
            error: err.message
        });
    }
}

export const listarPedido = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await PedidoService.buscarPedidoCompleto(id);

        res.status(200).json({
            success: true,
            message: 'Pedido encontrado',
            data: resultado
        });
    } 
    catch (err) {
        if (err.message === 'Pedido não encontrado') {
            return res.status(404).json({
                success: false,
                message: 'Pedido não encontrado'
            });
        }

        res.status(500).json({
            success: false,
            message: err.message || 'Erro ao buscar pedido',
            error: err.message
        });
    }
}

export const listarPedidosPorCliente = async (req, res) => {
    try {
        const { clienteId } = req.params;
        const { page = 1, limit = 10 } = req.query;

        const pedidos = await PedidoService.buscarPedidosUsuario(clienteId, parseInt(page), parseInt(limit));

        res.status(200).json({
            success: true,
            message: 'Pedidos do cliente listados com sucesso',
            data: pedidos
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Erro ao buscar pedidos do cliente',
            error: err.message
        });
    }
}

export const atualizarPedido = async (req, res) => {
    try {
        const { id } = req.params;
        const dadosAtualizacao = req.body;

        // Como não temos método atualizarPedido no service, vamos fazer diretamente
        const pedidoAtualizado = await Pedido.findByIdAndUpdate(
            id, 
            dadosAtualizacao, 
            { new: true, runValidators: true }
        );

        if (!pedidoAtualizado) {
            return res.status(404).json({
                success: false,
                message: 'Pedido não encontrado'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Pedido atualizado com sucesso',
            data: pedidoAtualizado
        });
    } 
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message || 'Erro ao atualizar pedido',
            error: err.message
        });
    }
}

export const atualizarStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const pedidoAtualizado = await PedidoService.atualizarStatus(id, status);

        res.status(200).json({
            success: true,
            message: `Status do pedido atualizado para ${status}`,
            data: pedidoAtualizado
        });
    } 
    catch (err) {
        if (err.message === 'Pedido não encontrado') {
            return res.status(404).json({
                success: false,
                message: 'Pedido não encontrado'
            });
        }

        res.status(400).json({
            success: false,
            message: err.message || 'Erro ao atualizar status do pedido',
            error: err.message
        });
    }
}

export const confirmarPedido = async (req, res) => {
    try {
        const { id } = req.params;
        const pedidoConfirmado = await PedidoService.atualizarStatus(id, 'confirmado');

        res.status(200).json({
            success: true,
            message: 'Pedido confirmado com sucesso',
            data: pedidoConfirmado
        });
    } 
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message || 'Erro ao confirmar pedido',
            error: err.message
        });
    }
}

export const cancelarPedido = async (req, res) => {
    try {
        const { id } = req.params;
        const { motivo } = req.body;

        const pedidoCancelado = await PedidoService.atualizarStatus(id, 'cancelado');

        res.status(200).json({
            success: true,
            message: 'Pedido cancelado com sucesso',
            data: pedidoCancelado
        });
    } 
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message || 'Erro ao cancelar pedido',
            error: err.message
        });
    }
}

export const prepararPedido = async (req, res) => {
    try {
        const { id } = req.params;
        const pedidoEmPreparo = await PedidoService.atualizarStatus(id, 'preparando');

        res.status(200).json({
            success: true,
            message: 'Pedido colocado em preparo',
            data: pedidoEmPreparo
        });
    } 
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message || 'Erro ao preparar pedido',
            error: err.message
        });
    }
}

export const finalizarPreparo = async (req, res) => {
    try {
        const { id } = req.params;
        const pedidoPronto = await PedidoService.atualizarStatus(id, 'pronto');

        res.status(200).json({
            success: true,
            message: 'Pedido pronto para entrega',
            data: pedidoPronto
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message || 'Erro ao finalizar preparo',
            error: err.message
        });
    }
}


export const entregarPedido = async (req, res) => {
    try {
        const { id } = req.params;
        const pedidoEntregue = await PedidoService.atualizarStatus(id, 'entregue');

        res.status(200).json({
            success: true,
            message: 'Pedido entregue com sucesso',
            data: pedidoEntregue
        });
    } 
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message || 'Erro ao entregar pedido',
            error: err.message
        });
    }
}

export const calcularTotal = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await PedidoService.buscarPedidoCompleto(id);
        
        if (!resultado.pedido) {
            return res.status(404).json({
                success: false,
                message: 'Pedido não encontrado'
            });
        }

        const total = resultado.pedido.valores.total;

        res.status(200).json({
            success: true,
            message: 'Total calculado com sucesso',
            data: { pedidoId: id, total }
        });
    } 
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Erro ao calcular total',
            error: err.message
        });
    }
}

export const deletarPedido = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Deletar pedido e registros relacionados
        await Promise.all([
            Pedido.findByIdAndDelete(id),
            Pagamento.deleteOne({ pedido: id }),
            Entrega.deleteOne({ pedido: id })
        ]);

        res.status(200).json({
            success: true,
            message: 'Pedido deletado com sucesso'
        });
    } 
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Erro ao deletar pedido',
            error: err.message
        });
    }
}

export const relatorioVendas = async (req, res) => {
    try {
        const { dataInicio, dataFim, status } = req.query;
        const filtros = {};

        if (dataInicio || dataFim) {
            filtros.createdAt = {};
            if (dataInicio) filtros.createdAt.$gte = new Date(dataInicio);
            if (dataFim) filtros.createdAt.$lte = new Date(dataFim);
        }
        if (status) filtros.status = status;

        const pedidos = await Pedido.find(filtros)
            .populate('usuario', 'nome email')
            .populate('items.produto', 'nome categoria')
            .sort({ createdAt: -1 });

        // Calcular estatísticas
        const totalVendas = pedidos.reduce((sum, pedido) => sum + pedido.valores.total, 0);
        const totalPedidos = pedidos.length;

        const relatorio = {
            pedidos,
            estatisticas: {
                totalPedidos,
                totalVendas,
                ticketMedio: totalPedidos > 0 ? totalVendas / totalPedidos : 0
            }
        };

        res.status(200).json({
            success: true,
            message: 'Relatório gerado com sucesso',
            data: relatorio
        });
    } 
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Erro ao gerar relatório',
            error: err.message
        });
    }
}

export const processarPagamento = async (req, res) => {
    try {
        const { id } = req.params;
        const dadosTransacao = req.body;

        const pagamento = await PedidoService.processarPagamento(id, dadosTransacao);

        res.status(200).json({
            success: true,
            message: 'Pagamento processado com sucesso',
            data: pagamento
        });
    } catch (err) {
        if (err.message === 'Pagamento não encontrado') {
            return res.status(404).json({
                success: false,
                message: 'Pagamento não encontrado'
            });
        }
        
        res.status(400).json({
            success: false,
            message: err.message || 'Erro ao processar pagamento',
            error: err.message
        });
    }
}

export const iniciarEntrega = async (req, res) => {
    try {
        const { id } = req.params;
        const { codigoRastreamento, transportadora } = req.body;

        const entrega = await PedidoService.iniciarEntrega(id, codigoRastreamento, transportadora);

        res.status(200).json({
            success: true,
            message: 'Entrega iniciada com sucesso',
            data: entrega
        });
    } catch (err) {
        if (err.message === 'Entrega não encontrada') {
            return res.status(404).json({
                success: false,
                message: 'Entrega não encontrada'
            });
        }
        
        res.status(400).json({
            success: false,
            message: err.message || 'Erro ao iniciar entrega',
            error: err.message
        });
    }
}