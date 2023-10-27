const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    addressLine1: {
        required: true,
        type: String
    },
    city: {
        required: true,
        type: String
    },
    state: String,
    country: {
        required: true,
        type: String
    },
    pincode: {
        required: true,
        type: Number
    }
});

const userSchema = new mongoose.Schema({
    full_name: {
        required: true,
        type: String
    },
    gender: {
        required: true,
        type: String,
        enum: ['Male', 'Female']
    },
    address: addressSchema,
    email: {
        required: true,
        type: String
    },
    phone: {
        required: true,
        type: String
    },
    username: {
        required: true,
        unique: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    roles: [{
        required: true,
        type: String,
        enum: ['admin', 'customer']
    }]
});

module.exports = mongoose.model('User', userSchema);
