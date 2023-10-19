const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        require: true,
        type: String
    }
});

module.exports = mongoose.model('Category', categorySchema);