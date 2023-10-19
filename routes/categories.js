const express = require('express');
const categoryControllers = require('../controllers/categories');

const router = express.Router();

router.get('/', categoryControllers.getAllCategories);
router.get('/:id', categoryControllers.getCategoryById);
router.post('/', categoryControllers.createCategory);
router.patch('/:id', categoryControllers.updateCategory);
router.delete('/:id', categoryControllers.deleteCategory);

module.exports = router;