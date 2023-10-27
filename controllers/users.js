const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const usersRepository = require('../repositories/users');

const getAllUsers = asyncHandler(async (req, res, next) => {
    const result = await usersRepository.getAllUsers();
    res.status(200).json(result);
});

const getUserById = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const result = await usersRepository.getUserById(id);
    if (result == null) {
        return next(new ErrorResponse(`User doesn't exist with id: ${id}`, 404))
    }
    res.status(200).json(result);
});

const createUser = asyncHandler(async (req, res, next) => {
    const data = req.body;
    const result = await usersRepository.createUser(data);
    res.status(201).json(result);
});

const updateUser = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const data = req.body;
    const result = await usersRepository.updateUser(id, data);
    if (result == null) {
        return next(new ErrorResponse(`User doesn't exist with id: ${id}`, 404))
    }
    res.status(200).json(result);
});

const deleteUser = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const result = await usersRepository.deleteUser(id);
    if (result == null) {
        return next(new ErrorResponse(`User doesn't exist with id: ${id}`, 404))
    }
    res.status(200).json({message: 'User deleted successfully'});
});

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}