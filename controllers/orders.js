const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const ordersRepository = require('../repositories/orders');
const ordersService = require('../services/orders');

const getAllOrders = asyncHandler(async (req, res, next) => {
    const result = await ordersRepository.getAllOrders();
    res.status(200).json(result);
});

const getOrderById = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const result = await ordersRepository.getOrderById(id);
    if (result == null) {
        return next(new ErrorResponse(`Order doesn't exist with id: ${id}`, 404));
    }
    res.status(200).json(result);
});

const createOrder = asyncHandler(async (req, res, next) => {
    const data = req.body;    
    const result = await ordersService.processAndCreateOrder(data);
    res.status(201).json(result);
});

const updateOrder = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const data = req.body;
    const result = await ordersService.processAndUpdateOrder(id, data);
    if (result == null) {
        return next(new ErrorResponse(`Order doesn't exist with id: ${id}`, 404));
    }
    res.status(200).json(result);
});

const deleteOrder = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const result = await ordersRepository.deleteOrder(id);
    if (result == null) {
        return next(new ErrorResponse(`Order doesn't exist with id: ${id}`, 404));
    }
    res.status(200).json({message: 'Order deleted successfully'});
});

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
}