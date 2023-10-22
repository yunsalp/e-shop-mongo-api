const Brand = require('../models/brand');

const getAllBrands = async () => {
    const brands = await Brand.find();
    return brands;
}

const getBrandById = async (id) => {
    const brand = await Brand.findById(id);
    return brand;
}

const createBrand = async (data) => {
    const newBrand = new Brand(data);
    const savedData = await newBrand.save();
    return savedData;
}

const updateBrand = async (id, data) => {
    const result = await Brand.findByIdAndUpdate(id, data);
    const updatedData = await Brand.findById(id);
    return updatedData;
}

const deleteBrand = async (id) => {
    const result = await Brand.findByIdAndDelete(id);
    return result;
}

module.exports = {
    getAllBrands,
    getBrandById,
    createBrand,
    updateBrand,
    deleteBrand
}