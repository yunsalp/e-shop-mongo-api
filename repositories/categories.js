const Category = require('../models/category');

const getAllCategories = async () => {
    const categories = await Category.find();
    return categories;
}

const getCategoryById = async (id) => {
    const category = await Category.findById(id);
    return category;
}

const createCategory = async (data) => {
    const newCategory = new Category(data);
    const savedData = await newCategory.save()
    return savedData;
}

const updateCategory = async (id, data) => {
    const updatedData = await Category.findByIdAndUpdate(id, data, {new: true, runValidators: true});
    return updatedData;
}

const deleteCategory = async (id) => {
    const result = await Category.findByIdAndDelete(id);
    return result;
}

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
}