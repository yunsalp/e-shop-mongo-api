const Order = require('../models/order');

const getAllOrders = async () => {
    const products = await Order.find().populate(['customer', 'order_line_items.product']);
    return products;
}

const getOrderById = async (id) => {
    const product = await Order.findById(id).populate(['customer', 'order_line_items.product']);
    return product;
}

const createOrder = async (data) => {
    const newOrder = new Order(data);
    const result = await newOrder.save()
    const createdOrder = Order.findById(result._id).populate(['customer', 'order_line_items.product']);
    return createdOrder;
}

const updateOrder = async (id, data) => {
    const result = await Order.findByIdAndUpdate(id, data);
    const updatedOrder = await Order.findById(id).populate(['customer', 'order_line_items.product']);
    return updatedOrder;
}

const deleteOrder = async (id) => {
    const result = await Order.findByIdAndDelete(id);
    return result;
}

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
}