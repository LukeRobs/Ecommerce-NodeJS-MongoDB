// models/Entrega.js
import mongoose from "mongoose";

const { Schema } = mongoose;

const entrega = new Schema({
    pedido: {
        type: mongoose.Types.ObjectId,
        ref: "pedidos",
        required: true,
        unique: true
    },
    endereco: {
        destinatario: {
            type: String,
            required: true
        },
        rua: {
            type: String,
            required: true
        },
        numero: {
            type: String,
            required: true
        },
        complemento: String,
        bairro: {
            type: String,
            required: true
        },
        cidade: {
            type: String,
            required: true
        },
        estado: {
            type: String,
            required: true,
            maxlength: 2
        },
        cep: {
            type: String,
            required: true
        },
        referencia: String
    },
    tipoEntrega: {
        type: String,
        enum: ['standard', 'express', 'agendada', 'retirada_loja'],
        default: 'standard'
    },
    transportadora: {
        nome: String,
        codigo: String,
        contato: String
    },
    status: {
        type: String,
        enum: ['pendente','preparando','postado','em_transito','saiu_entrega','entregue','tentativa_falhada','devolvido'],
        default: 'pendente'
    },
    codigoRastreamento: String,
    linkRastreamento: String,
    prazoEstimado: Date,
    prazoMinimo: Date,
    prazoMaximo: Date,
    historico: [{
        data: {
            type: Date,
            default: Date.now
        },
        status: String,
        localizacao: String,
        descricao: String,
        origem: {
            type: String,
            enum: ['sistema', 'transportadora', 'manual'],
            default: 'sistema'
        }
    }],
    tentativasEntrega: [{
        data: Date,
        horario: String,
        motivo: String,
        observacao: String,
        proximaTentativa: Date
    }],
    dataPostagem: Date,
    dataEntrega: Date,
    dataDevolvido: Date,
    peso: Number,
    dimensoes: {
        altura: Number,
        largura: Number,
        comprimento: Number
    },
    observacoes: String,
    instrucoesEntrega: String
}, 
{
    timestamps: true
});

entrega.methods.adicionarHistorico = function(status, localizacao, descricao, origem = 'sistema') {
    this.historico.push({
        status,
        localizacao,
        descricao,
        origem
    });
    this.status = status;
};

entrega.methods.registrarTentativa = function(motivo, observacao, proximaTentativa) {
    this.tentativasEntrega.push({
        data: new Date(),
        motivo,
        observacao,
        proximaTentativa
    });
    this.status = 'tentativa_falhada';
};

entrega.methods.marcarEntregue = function(observacao = '') {
    this.status = 'entregue';
    this.dataEntrega = new Date();
    this.adicionarHistorico('entregue', 'Destinatário', observacao || 'Entrega realizada com sucesso');
};

export const Entrega = mongoose.model("entregas", entrega);