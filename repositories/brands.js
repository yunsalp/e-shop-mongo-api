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
    const updatedData = await Brand.findByIdAndUpdate(id, data, {new: true, runValidators: true});
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