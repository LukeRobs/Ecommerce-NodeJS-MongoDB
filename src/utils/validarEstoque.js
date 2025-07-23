export const validarEstoque = (produto, quantidadeAtualCarrinho = 0, quantidadeSolicitada) => {
    const quantidadeTotal = quantidadeAtualCarrinho + quantidadeSolicitada;

    if(quantidadeTotal > produto.estoque) {
        return false;
    }
    else {
        return true;
    }
}