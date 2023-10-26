const express = require('express');
const customersController = require('../controllers/customers');

const router = express.Router();

router.get('/', customersController.getAllCustomers);
router.get('/:id', customersController.getCustomerById);
router.post('/', customersController.createCustomer);
router.patch('/:id', customersController.updateCustomer);
router.delete('/:id', customersController.deleteCustomer);

module.exports = router;