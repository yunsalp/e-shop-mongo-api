const productsRepository = require('../repositories/products');
const ordersRepository = require('../repositories/orders');
const ErrorResponse = require('../utils/errorResponse');

const processOrder = async (data, operation) => {
    if (operation == 'create') {
        if ((data.order_line_items === undefined) || !data.order_line_items.length) {
            throw new ErrorResponse(`order_line_items is not specified`, 400);
        }
    } else { //'update'
        if (data.order_line_items === undefined) {
            return data;
        }
        if (!data.order_line_items.length) {
            throw new ErrorResponse(`order_line_items is not specified`, 400);
        }
    }
    let price, totalAmount = 0;
    for (let item of data.order_line_items) { 
        if (item.unit_price !== undefined) {
            if (typeof item.unit_price == 'number') {
                price = item.unit_price;
            } else {
                throw new ErrorResponse(`unit_price is invalid for the product ${item.product}`, 400);
            }
        }
        else {
            price = await productsRepository.getProductOfferPrice(item.product);
            if (price == null) {
                throw new ErrorResponse(`offer_price is not defined for the product ${item.product}`, 404);
            }
            item.unit_price = price;
        }
        if (item.quantity === undefined) {
            throw new ErrorResponse(`quantity is not specified for the product ${item.product}`, 400);
        }
        if (typeof item.quantity != 'number') {
            throw new ErrorResponse(`quantity is invalid for the product ${item.product}`, 400);
        }
        totalAmount += (price * item.quantity);
    }
    data.total_amount = totalAmount;
    return data;
}

const processAndCreateOrder = async (data) => {    
    const processedData = await processOrder(data, 'create');
    const result = await ordersRepository.createOrder(processedData);
    return result;
}

const processAndUpdateOrder = async (id, data) => {    
    const processedData = await processOrder(data, 'update');
    const result = await ordersRepository.updateOrder(id, processedData);
    return result;
}

module.exports = {
    processAndCreateOrder,
    processAndUpdateOrder
}