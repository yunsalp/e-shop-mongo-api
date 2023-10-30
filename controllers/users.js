const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const usersRepository = require('../repositories/users');
const {createJwt} = require('../utils/jwtHelper');
const {compareWithHashedPassword} = require('../utils/passwordHelper');

const getAllUsers = asyncHandler(async (req, res, next) => {
    const result = await usersRepository.getAllUsers();
    res.status(200).json(result);
});

const getUserById = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const result = await usersRepository.getUserById(id);
    if (result == null) {
        return next(new ErrorResponse(`User doesn't exist with id: ${id}`, 404));
    }
    res.status(200).json(result);
});

const createUser = asyncHandler(async (req, res, next) => {
    const data = req.body;
    if ((data.password !== undefined) && (data.password.length < 6)) {
        return next(new ErrorResponse(`Password must be at least 6 characters long`, 400));
    }
    const result = await usersRepository.createUser(data);
    if (result._id) {
        const token = createJwt(result._id);
        res.status(201).json({user: result, token: token});
    }    
});

const updateUser = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const data = req.body;
    if ((data.password !== undefined) && (data.password.length < 6)) {
        return next(new ErrorResponse(`Password must be at least 6 characters long`, 400));
    }
    const result = await usersRepository.updateUser(id, data);
    if (result == null) {
        return next(new ErrorResponse(`User doesn't exist with id: ${id}`, 404));
    }
    res.status(200).json(result);
});

const deleteUser = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const result = await usersRepository.deleteUser(id);
    if (result == null) {
        return next(new ErrorResponse(`User doesn't exist with id: ${id}`, 404));
    }
    res.status(200).json({message: 'User deleted successfully'});
});

const login = asyncHandler(async (req, res, next) => {
    const {username, password} = req.body;
    const user = await usersRepository.getUserByUsername(username);
    if (user === null || password === undefined) {
        return next(new ErrorResponse(`Invalid credentials`, 400));
    }
    const isValid = compareWithHashedPassword(password, user.password);
    if (isValid) {
        const token = createJwt(user._id);    
        return res.status(200).json({message: 'Logged in successfully', 
                                    user: {full_name: user.full_name, username: username}, token: token});
    }
    next(new ErrorResponse(`Invalid credentials`, 400));    
});

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    login
}