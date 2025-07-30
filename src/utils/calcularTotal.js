
export const calcularTotal = (pedido) => {
    
    const subtotal = pedido.items.reduce((sum, item) => sum + item.subtotal, 0);
    pedido.total = subtotal + pedido.frete - pedido.desconto;

    return pedido.total;
}