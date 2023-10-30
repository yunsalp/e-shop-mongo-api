const mongoose = require('mongoose');
const Category = require('./category');
const Brand = require('./brand');
const ErrorResponse = require('../utils/errorResponse');

const productSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String,
        minlength: 3
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

productSchema.pre('save', async function (next) {
    // Check if the referenced category exists
    const categoryExists = await Category.exists({ _id: this.category});
    if (!categoryExists) {
        const err = new ErrorResponse(`Referenced category '${this.category}' does not exist`, 400);
        return next(err);
    }
    // Check if the referenced brand exists
    const brandExists = await Brand.exists({ _id: this.brand});
    if (!brandExists) {
        const err = new ErrorResponse(`Referenced brand '${this.brand}' does not exist`, 400);
        return next(err);
    }
    next();
});

productSchema.pre('findOneAndUpdate', async function (next) {
    // Check if the referenced category exists
    let newFieldValue = this._update.category;
    if (newFieldValue) {
        const categoryExists = await Category.exists({ _id: newFieldValue});
        if (!categoryExists) {
            const err = new ErrorResponse(`Referenced category '${newFieldValue}' does not exist`, 400);
            return next(err);
        }
    }
    // Check if the referenced brand exists
    newFieldValue = this._update.brand;
    if (newFieldValue) {
        const brandExists = await Brand.exists({ _id: newFieldValue});
        if (!brandExists) {
            const err = new ErrorResponse(`Referenced brand '${newFieldValue}' does not exist`, 400);
            return next(err);
        }
    }
    next();
});

module.exports = mongoose.model('Product', productSchema);
