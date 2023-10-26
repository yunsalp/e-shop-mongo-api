const productsRepository = require('../repositories/products');
const ordersRepository = require('../repositories/orders');
const ErrorResponse = require('../utils/errorResponse');

const processOrder = async (data) => {
    let price, totalAmount = 0;
    for (let item of data.order_line_items) {        
        if (typeof item.unit_price == 'number') {
            price = item.unit_price;
        }
        else {
            price = await productsRepository.getProductOfferPrice(item.product);
            if (price == null) {
                throw new ErrorResponse(`offer_price is not defined for the product ${item.product}`, 404);
            }
            item.unit_price = price;
        }
        if (typeof item.quantity != 'number') {
            throw new ErrorResponse(`quantity is not specified for the product ${item.product}`, 400);
        }
        totalAmount += (price * item.quantity);
    }
    data.total_amount = totalAmount;
    return data;
}

const processAndCreateOrder = async (data) => {    
    const processedData = await processOrder(data);
    const result = await ordersRepository.createOrder(processedData);
    return result;
}

const processAndUpdateOrder = async (id, data) => {    
    const processedData = await processOrder(data);
    const result = await ordersRepository.updateOrder(id, processedData);
    return result;
}

module.exports = {
    processAndCreateOrder,
    processAndUpdateOrder
}