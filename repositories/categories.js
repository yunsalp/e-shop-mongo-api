const Category = require('../models/category');

async function getAllCategories() {
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
    const result = await Category.findByIdAndUpdate(id, data);
    const updatedData = await Category.findById(id);
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