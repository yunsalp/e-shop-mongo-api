const Category = require('../models/category');

const getAllCategories = async () => {
    const categories = await Category.find();
    return categories;
}

async function getCategoryById(id) {
    const category = await Category.findById(id);
    return category;
}

async function createCategory(data) {
    const newCategory = new Category(data);
    const savedData = await newCategory.save()
    return savedData;
}

async function updateCategory(id, data) {
    const updatedData = await Category.findByIdAndUpdate(id, data, {new: true, runValidators: true});
    return updatedData;
}

async function deleteCategory(id) {
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