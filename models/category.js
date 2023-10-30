const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        required: true,
        unique: true,
        type: String,
        minlength: 3
    }
});

module.exports = mongoose.model('Category', categorySchema);