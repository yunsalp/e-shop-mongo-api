const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const customersRepository = require('../repositories/customers');

const getAllCustomers = asyncHandler(async (req, res, next) => {
    const result = await customersRepository.getAllCustomers();
    res.status(200).json(result);
});

const getCustomerById = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const result = await customersRepository.getCustomerById(id);
    if (result == null) {
        return next(new ErrorResponse(`Customer doesn't exist with id: ${id}`, 404))
    }
    res.status(200).json(result);
});

const createCustomer = asyncHandler(async (req, res, next) => {
    const data = req.body;
    const result = await customersRepository.createCustomer(data);
    res.status(201).json(result);
});

const updateCustomer = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const data = req.body;
    const result = await customersRepository.updateCustomer(id, data);
    if (result == null) {
        return next(new ErrorResponse(`Customer doesn't exist with id: ${id}`, 404))
    }
    res.status(200).json(result);
});

const deleteCustomer = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const result = await customersRepository.deleteCustomer(id);
    if (result == null) {
        return next(new ErrorResponse(`Customer doesn't exist with id: ${id}`, 404))
    }
    res.status(200).json({message: 'Customer deleted successfully'});
});

module.exports = {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer
}