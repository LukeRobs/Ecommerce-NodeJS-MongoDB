import mongoose from "mongoose";

const { Schema } = mongoose;

const pagamento = new Schema({
    pedido: {
        type: mongoose.Types.ObjectId,
        ref: "pedidos",
        required: true,
        unique: true
    },
    formaPagamento: {
        type: String,
        enum: ['cartao_credito', 'cartao_debito', 'pix', 'boleto'],
        required: true
    },
    status: {
        type: String,
        enum: ['pendente', 'aprovado', 'rejeitado', 'estornado'],
        default: 'pendente'
    },
    valor: {
        type: Number,
        required: true
    },
    dadosCartao: {
        bandeira: String,
        finalCartao: String,
        parcelas: {
            type: Number,
            default: 1
        },
    },
    dadosPix: {
        chave: String,
        qrCode: String,
        linkPagamento: String
    },
    dadosBoleto: {
        codigoBarras: String,
        linhaDigitavel: String,
        linkBoleto: String,
        dataVencimento: Date
    },
    transacao: {
        id: String,
        authorizationCode: String,
        tid: String,
        nsu: String,
        gateway: String
    },
    tentativas: [{
        data: {
            type: Date,
            default: Date.now
        },
        status: String,
        codigoErro: String,
        mensagemErro: String,
        dadosGateway: Schema.Types.Mixed
    }],
    dataProcessamento: Date,
    dataAprovacao: Date,
    dataEstorno: Date,
    observacoes: String,
},
{
    timestamps: true
});

pagamento.methods.adicionarTentativa = function(status, erro = null) {
    this.tentativas.push({
        status,
        codigoErro: erro?.codigo,
        mensagemErro: erro?.mensagem,
        dadosGateway: erro?.dadosCompletos
    });
};
pagamento.methods.aprovar = function(dadosTransacao) {
    this.status = 'aprovado';
    this.dataAprovacao = new Date();
    this.transacao = { ...this.transacao, ...dadosTransacao };
};

export const Pagamento = mongoose.model("pagamentos", pagamento);