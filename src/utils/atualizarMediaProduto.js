import { Review } from '../models/review.js';
import { Produto } from '../models/produto.js';       
       
       
    export const atualizarMediaProduto = async (produtoId) => {
        
        const reviews = await Review.find({ produto: produtoId });
        const numeroAvaliacoes = reviews.length;
        const mediaAvaliacoes = numeroAvaliacoes === 0 ? 0 : reviews.reduce((acc, cur) => acc + cur.nota, 0) / numeroAvaliacoes
        
        await Produto.findByIdAndUpdate(produtoId, {
            numeroAvaliacoes,
            mediaAvaliacoes
        });
    };