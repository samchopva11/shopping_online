const CartUtil = {
    getTotal(mycart){
        var total = 0;
        for (const item of mycart){
            total += item.product.price * item.quantity;
        }
        return total;
    },

    getAmount(item){
        var amount = item.product.price*item.quantity;
        return amount

    }
}
export default CartUtil;