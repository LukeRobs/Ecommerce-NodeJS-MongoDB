export const calcularCarrinho = (carrinho) => {
    let totalGeral = 0;

    for (let item of carrinho.itens) {
        let calcularSubtotal = item.preco * item.quantidade
        item.subtotal = calcularSubtotal;
        totalGeral += calcularSubtotal;
    }
        carrinho.total = totalGeral

    return carrinho
}