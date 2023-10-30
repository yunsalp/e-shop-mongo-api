const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    name: {
        required: true,
        unique: true,
        type: String,
        minlength: 3
    }
});

module.exports = mongoose.model('Brand', brandSchema);