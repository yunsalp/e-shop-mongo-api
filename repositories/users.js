const User = require('../models/user');

const getAllUsers = async () => {
    const users = await User.find();
    return users;
}

async function getUserById(id) {
    const user = await User.findById(id);
    return user;
}

async function createUser(data) {
    const newUser = new User(data);
    const savedData = await newUser.save()
    return savedData;
}

async function updateUser(id, data) {
    const updatedData = await User.findByIdAndUpdate(id, data, {new: true, runValidators: true});
    return updatedData;
}

async function deleteUser(id) {
    const result = await User.findByIdAndDelete(id);
    return result;
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}