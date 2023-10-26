const Customer = require('../models/customer');

const getAllCustomers = async () => {
    const customers = await Customer.find();
    return customers;
}

async function getCustomerById(id) {
    const customer = await Customer.findById(id);
    return customer;
}

async function createCustomer(data) {
    const newCustomer = new Customer(data);
    const savedData = await newCustomer.save()
    return savedData;
}

async function updateCustomer(id, data) {
    const result = await Customer.findByIdAndUpdate(id, data);
    const updatedData = await Customer.findById(id);
    return updatedData;
}

async function deleteCustomer(id) {
    const result = await Customer.findByIdAndDelete(id);
    return result;
}

module.exports = {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer
}