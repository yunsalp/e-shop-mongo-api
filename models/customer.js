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

const customerSchema = new mongoose.Schema({
    name: {
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
    }
});

module.exports = mongoose.model('Customer', customerSchema);