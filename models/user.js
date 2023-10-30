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
        type: String,
        minlength: 3
    },
    gender: {
        required: true,
        type: String,
        enum: ['Male', 'Female']
    },
    address: addressSchema,
    email: {
        required: true,
        type: String,
        validate: {
            validator: function(v) {
                let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
                return regex.test(v);
                //return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        }
    },
    phone: {
        required: true,
        type: String
    },
    username: {
        required: true,
        unique: true,
        type: String,
        minlength: 3
    },
    password: {
        required: true,
        type: String
    },
    roles: [{
        required: true,
        type: String,
        enum: ['Admin', 'Customer']
    }]
});

userSchema.path('email').validate(function (email) {
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(email);
 }, 'Please enter a valid email.')

userSchema.path('roles')
    .validate((val) => val.length > 0, "The user must have atleast one role (either 'Admin' or 'Customer' or both)");

module.exports = mongoose.model('User', userSchema);
