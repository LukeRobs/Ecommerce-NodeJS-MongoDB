// services/PedidoService.js
import { Pedido } from "../models/Pedido.js";
import { Pagamento } from "../models/Pagamento.js";
import { Entrega } from "../models/Entrega.js";

export class PedidoService {
    
    async criarPedido(dadosPedido, dadosPagamento, dadosEntrega) {
        try {
            const pedido = new Pedido(dadosPedido);
            pedido.calcularTotal();
            await pedido.save();
            
            const pagamento = new Pagamento({
                ...dadosPagamento,
                pedido: pedido._id,
                valor: pedido.total
            });
            await pagamento.save(); 
            const entrega = new Entrega({
                ...dadosEntrega,
                pedido: pedido._id
            });
            await entrega.save();
            
            return {
                pedido,
                pagamento,
                entrega
            };
            
        } 
        catch (err) {
          throw err;
        };
}
    async buscarPedidoCompleto(pedidoId) {
        const pedido = await Pedido.findById(pedidoId)
            .populate("usuario")
            .populate("items.produto");
        
        if (!pedido) {
            throw new Error("Pedido não encontrado");
        }
        
        const [pagamento, entrega] = await Promise.all([
            Pagamento.findOne({ pedido: pedidoId }),
            Entrega.findOne({ pedido: pedidoId })
        ]);
        
        return {
            pedido,
            pagamento,
            entrega
        };
    }
    
    async buscarPedidosUsuario(usuarioId, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        
        const pedidos = await Pedido.find({ usuario: usuarioId })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate("items.produto", "nome imagem");
        
        const pedidosCompletos = await Promise.all(
            pedidos.map(async (pedido) => {
                const [pagamento, entrega] = await Promise.all([
                    Pagamento.findOne({ pedido: pedido._id }),
                    Entrega.findOne({ pedido: pedido._id })
                ]);
                
                return {
                    pedido: pedido.toObject(),
                    pagamento,
                    entrega
                };
            })
        );
        
        return pedidosCompletos;
    }
    
    async atualizarStatus(pedidoId, novoStatus) {
        const pedido = await Pedido.findById(pedidoId);
        if (!pedido) {
            throw new Error("Pedido não encontrado");
        }
        
        pedido.status = novoStatus;
        await pedido.save();
        
        return pedido;
    }
    
    async processarPagamento(pedidoId, dadosTransacao) {
        const pagamento = await Pagamento.findOne({ pedido: pedidoId });
        if (!pagamento) {
            throw new Error("Pagamento não encontrado");
        }
        
        if (dadosTransacao.aprovado) {
            pagamento.aprovar(dadosTransacao);
            
            await this.atualizarStatus(pedidoId, "pago");
        } else {
            pagamento.status = "rejeitado";
            pagamento.adicionarTentativa("rejeitado", dadosTransacao.erro);
        }
        
        await pagamento.save();
        return pagamento;
    }
    
    async iniciarEntrega(pedidoId, codigoRastreamento, transportadora) {
        const entrega = await Entrega.findOne({ pedido: pedidoId });
        if (!entrega) {
            throw new Error("Entrega não encontrada");
        }
        
        entrega.codigoRastreamento = codigoRastreamento;
        entrega.transportadora.nome = transportadora;
        entrega.dataPostagem = new Date();
        entrega.adicionarHistorico("postado", "Centro de Distribuição", "Objeto postado");
        
        await entrega.save();
        
        await this.atualizarStatus(pedidoId, "enviado");
        
        return entrega;
    }
}

