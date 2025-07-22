import mongoose from 'mongoose';
import { Review }  from '../models/review.js';
import { Produto } from '../models/produto.js';
import { atualizarMediaProduto } from '../utils/atualizarMediaProduto.js';

export const criarReview = async (req, res) => {
    try {
        const { nota, comentario} = req.body;
        const produto = req.params.produtoId;

        const jaAvaliado = await Review.findOne({
            usuario: req.user.id,
            produto
        });
        if(jaAvaliado) {
            return res.status(400).json({message: 'Você ja avaliou este produto'})
        }
        const produtoExiste = await Produto.findById(produto);
        if(!produtoExiste) {
            return res.status(404).json({message: "produto não encontrado"})
        }

        const review = await Review.create({
            usuario: req.user.id,
            produto,
            nota,
            comentario
        });
        await atualizarMediaProduto(produto);
        res.status(201).json({message: 'Review Criado com sucesso', review})
    }
    catch(err) {
        console.log(err)
        res.status(500).json({ message: 'Erro ao criar review', error: err.message });
    }
}

export const listReviewProduto = async (req, res) => {
    try {   
        const {produtoId} = req.params;

        if(!mongoose.Types.ObjectId.isValid(produtoId)) {
            return res.status(400).json({ message: 'ID de produto inválido.' });
        }
        const reviews = await Review.find({produto: produtoId}).populate('usuario', 'nome');

        await atualizarMediaProduto(produtoId);

        const produto = await Produto.findById(produtoId).select('numeroAvaliacoes mediaAvaliacoes');

        const produtosAvaliados = {
            produtoId,
            numeroAvaliacoes: produto ? produto.numeroAvaliacoes : 0,
            mediaAvaliacoes: produto ? Number(produto.mediaAvaliacoes.toFixed(2)) : 0,
            reviews
        };

        res.status(200).json(produtosAvaliados);
    }
    catch(err) {
        res.status(500).json({ message: 'Erro ao buscar reviews', error: err.message });
    }
}

export const deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);

        if(!review) {
            return res.status(404).json({ message: 'Review não encontrada.' });
        }
        if(review.usuario.toString() !== req.usuario._id.toString() && !req.user.isAdmin) {
            return res.status(401).json({message: 'Não autorizado'});
        }

        await review.remove();
        await atualizarMediaProduto(review.produto);
        res.json({ message: 'Review removida com sucesso.' });
    }
    catch(err) {
        res.status(500).json({ message: 'Erro ao deletar review', error: err.message });
    }
}