const mongoose = require('mongoose');
const Product = require('./product');
const User = require('./user');
const ErrorResponse = require('../utils/errorResponse');

const orderLineItemSchema = new mongoose.Schema({
    product: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity: {
        required: true,
        type: Number
    },
    unit_price: Number
});

const orderSchema = new mongoose.Schema({
    customer: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    order_date: {
        required: true,
        type: Date
    },
    total_amount: Number,
    order_line_items: [orderLineItemSchema]
});

orderSchema.pre('save', async function (next) {
    // Check if the referenced customer exists
    const customerExists = await User.exists({ _id: this.customer, roles: 'Customer'});
    if (!customerExists) {
        const err = new ErrorResponse(`Referenced customer '${this.customer}' does not exist`, 400);
        return next(err);
    }
    for (let item of this.order_line_items) {
        // Check if all the referenced products exists
        const productExists = await Product.exists({ _id: item.product});
        if (!productExists) {
            const err = new ErrorResponse(`Referenced product '${item.product}' does not exist`, 400);
            return next(err);
        }
    }
    next();
});

orderSchema.pre('findOneAndUpdate', async function (next) {
    // Check if the referenced customer exists
    const newFieldValue = this._update.customer;
    if (newFieldValue) {
        const customerExists = await User.exists({ _id: newFieldValue, roles: 'Customer'});
        if (!customerExists) {
            const err = new ErrorResponse(`Referenced customer '${newFieldValue}' does not exist`, 400);
            return next(err);
        }
    }
    if (this._update.order_line_items !== undefined) {
        for (let item of this._update.order_line_items) {
            // Check if all the referenced products exists
            const productExists = await Product.exists({ _id: item.product});
            if (!productExists) {
                const err = new ErrorResponse(`Referenced product '${item.product}' does not exist`, 400);
                return next(err);
            }    
        }
    }
    next();
});

module.exports = mongoose.model('Order', orderSchema);