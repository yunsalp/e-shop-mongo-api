const Product = require('../models/product');

const getAllProducts = async () => {
    const products = await Product.find().populate(['category', 'brand']);
    return products;
}

const getProductById = async (id) => {
    const product = await Product.findById(id).populate(['category', 'brand']);
    return product;
}

const getProductOfferPrice = async (id) => {
    const priceObj = await Product.findById(id, 'offer_price -_id');
    return priceObj.offer_price;
}

const createProduct = async (data) => {
    const newProduct = new Product(data);
    const result = await newProduct.save()
    const createdProduct = Product.findById(result._id).populate(['category', 'brand']);
    return createdProduct;
}

const updateProduct = async (id, data) => {
    const result = await Product.findByIdAndUpdate(id, data);
    const updatedProduct = await Product.findById(id).populate(['category', 'brand']);
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