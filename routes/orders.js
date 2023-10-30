const express = require('express');
const ordersController = require('../controllers/orders');
const {verifyTokenHandler, verifyRoles} = require('../middlewares/jwtHandler');

const router = express.Router();

router.get('/', [verifyTokenHandler, verifyRoles(['Admin'])], ordersController.getAllOrders);
router.get('/:id', verifyTokenHandler, ordersController.getOrderById);
router.post('/', [verifyTokenHandler, verifyRoles(['Customer'])], ordersController.createOrder);
router.patch('/:id', [verifyTokenHandler, verifyRoles(['Customer'])], ordersController.updateOrder);
router.delete('/:id', [verifyTokenHandler, verifyRoles(['Customer'])], ordersController.deleteOrder);

module.exports = router;