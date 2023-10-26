const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    category: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    brand: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand'
    },
    price: {
        required: true,
        type: Number
    },
    offer_price: {
        required: true,
        type: Number
    }
});

module.exports = mongoose.model('Product', productSchema);