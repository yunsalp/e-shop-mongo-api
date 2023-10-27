const Order = require('../models/order');

const populateQuery = [{path: 'customer', select: '-username -password -roles'}, 'order_line_items.product'];
const getAllOrders = async () => {
    const products = await Order.find().populate(populateQuery);
    return products;
}

const getOrderById = async (id) => {
    const product = await Order.findById(id).populate(populateQuery);
    return product;
}

const createOrder = async (data) => {
    const newOrder = new Order(data);
    const result = await newOrder.save()
    const createdOrder = Order.findById(result._id).populate(populateQuery);
    return createdOrder;
}

const updateOrder = async (id, data) => {
    const updatedOrder = await Order.findByIdAndUpdate(id, data, {new: true, runValidators: true})
                                .populate(populateQuery);
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