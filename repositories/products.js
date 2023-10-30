const Product = require('../models/product');

const populateQuery = ['category', 'brand'];

const getAllProducts = async () => {
    const products = await Product.find().populate(populateQuery);
    return products;
}

const getProductById = async (id) => {
    const product = await Product.findById(id).populate(populateQuery);
    return product;
}

const getProductOfferPrice = async (id) => {
    const priceObj = await Product.findById(id, 'offer_price -_id');
    return priceObj.offer_price;
}

const createProduct = async (data) => {
    const newProduct = new Product(data);
    const result = await newProduct.save();
    const createdProduct = await Product.findById(result._id).populate(populateQuery);
    return createdProduct;
}

const updateProduct = async (id, data) => {
    const updatedProduct = await Product.findByIdAndUpdate(id, data, {new: true, runValidators: true})
                                        .populate(populateQuery);
    return updatedProduct;
}

const deleteProduct = async (id) => {
    const result = await Product.findByIdAndDelete(id);
    return result;
}

module.exports = {
    getAllProducts,
    getProductById,
    getProductOfferPrice,
    createProduct,
    updateProduct,
    deleteProduct
}