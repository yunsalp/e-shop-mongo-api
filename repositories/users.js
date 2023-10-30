const User = require('../models/user');
const {hashPassword} = require('../utils/passwordHelper');

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

const getAllUsers = async () => {
    const users = await User.find({}, '-password');
    return users;
}

const getUserById = async (id) => {
    const user = await User.findById(id, '-password');
    return user;
}

const getUserByUsername = async (username) => {
    const user = await User.findOne({username: username}, 'full_name username password');
    return user;
}

const getUserRolesByUserId = async (userid) => {
    const user = await User.findById(userid, 'roles');
    return user;
}

const createUser = async (data) => {
    if (data.gender !== undefined) 
        data.gender = capitalize(data.gender);
    if (data.roles !== undefined) {
        for (let i = 0; i < data.roles.length; i++) {
            data.roles[i] = capitalize(data.roles[i]);
        }
    }
    if (data.password !== undefined) 
        data.password = hashPassword(data.password);
    const newUser = new User(data);
    const result = await newUser.save();
    const savedData = await User.findById(result._id, '-password');
    return savedData;
}

const updateUser = async (id, data) => {
    if (data.gender !== undefined) 
        data.gender = capitalize(data.gender);
    if (data.roles !== undefined) {
        for (let i = 0; i < data.roles.length; i++) {
            data.roles[i] = capitalize(data.roles[i]);
        }
    }
    if (data.password !== undefined) 
        data.password = hashPassword(data.password);
    const updatedData = await User.findByIdAndUpdate(id, data, 
                                                {new: true, select: '-password', runValidators: true});
    return updatedData;
}

const deleteUser = async (id) => {
    const result = await User.findByIdAndDelete(id);
    return result;
}

module.exports = {
    getAllUsers,
    getUserById,
    getUserByUsername,
    getUserRolesByUserId,
    createUser,
    updateUser,
    deleteUser
}