import mongoose from "mongoose";
import { Produto } from "../models/produto.js";
import { Carrinho } from "../models/carrinho.js" 
import { calcularCarrinho } from "../utils/calcularCarrinho.js";
import { validarEstoque } from "../utils/validarEstoque.js";

export const criarCarrinho = async (req, res) => {
    try {

        const {produto, quantidade} = req.body
        const user = req.user.id;

        let carrinho  = await Carrinho.findOne({
            usuario: req.user.id
        })
        const produtoExiste = await Produto.findById(produto);
        if(!produtoExiste) {
            return res.status(404).json({ error: "Produto não encontrado" });
        }

        if(!carrinho) {
            carrinho = new Carrinho({
                usuario: req.user.id,
                itens: []
            });
        };

        const itemIndex = carrinho.itens.findIndex(item => item.produto.toString() === produto);
        let quantidadeAtualCarrinho = 0;
        
        if (itemIndex > -1) {
            quantidadeAtualCarrinho = carrinho.itens[itemIndex].quantidade;
        }
        const estoqueValido = validarEstoque(produtoExiste, quantidadeAtualCarrinho, quantidade);
        
        if(!estoqueValido) {
            return res.status(400).json({message: "Estoque insuficiente"});
        }

        if( itemIndex > -1) {
            carrinho.itens[itemIndex].quantidade += quantidade;
            carrinho.itens[itemIndex].preco = produtoExiste.preco;
        }
        else {
            carrinho.itens.push({
                produto: produtoExiste._id,
                quantidade,
                preco: produtoExiste.preco
            });
        }
        
        calcularCarrinho(carrinho);

        await carrinho.save();
        return res.status(200).json(carrinho);
    }
    catch(err) {
        console.error(err);
        return res.status(500).json({error: "Erro ao processar o carrinho"})
    }
}

export const getCarrinhoUsuario = async (req, res) => {
  try {
    const carrinho = await Carrinho.findOne({ usuario: req.user.id }).populate("itens.produto");

    if (!carrinho || carrinho.itens.length === 0) {
      return res.status(200).json({ mensagem: "Carrinho vazio", itens: [], total: 0 });
    }

    return res.status(200).json(carrinho);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro ao buscar o carrinho" });
  }
};

export const removeItemCarrinho = async (req, res) => {
    try {
        const usuario = req.user.id;
        const produto = req.params.produtoId;

        const carrinho = await Carrinho.findOne({usuario: req.user.id});
        
        if(!carrinho) {
            return res.status(404).json({message: "carrinho não encontado!"})
        }
        
        const produtoIndex = carrinho.itens.findIndex(item => item.produto.toString() === produto)

        if(produtoIndex > -1){
            carrinho.itens.splice(produtoIndex, 1)
        }
        else {
            return res.status(404).json({ message: "Produto não está no carrinho!" });
        }

        if(carrinho.itens.length === 0) {
            carrinho.total = 0;
        }
        else{
            calcularCarrinho(carrinho);
        }
        await carrinho.save();
        return res.status(200).json(carrinho);
    }
    catch(err) {
         return res.status(500).json({ message: "Erro ao remover item do carrinho" });
    }
}