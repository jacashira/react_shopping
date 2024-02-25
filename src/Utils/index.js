
/**
 * This function calculate total price of new order
 * @param {Array} products cartProducts: Array of Objects
 * @returns {number} Total price
 */
export const totalPrice = (products) => {
    let totalPrice = 0
    products.forEach(product => totalPrice += product.price)
    return totalPrice
}