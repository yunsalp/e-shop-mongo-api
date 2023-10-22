const express = require('express');
const brandsController = require('../controllers/brands');

const router = express.Router();

router.get('/', brandsController.getAllBrands);
router.get('/:id', brandsController.getBrandById);
router.post('/', brandsController.createBrand);
router.patch('/:id', brandsController.updateBrand);
router.delete('/:id', brandsController.deleteBrand);

module.exports = router;
