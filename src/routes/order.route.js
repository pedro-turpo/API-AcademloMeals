const express = require('express');

const orderController = require('../controllers/order.controller');

const authMiddleware = require('../middlewares/auth.middleware');
const orderMiddleware = require('../middlewares/order.middleware');

const router = express.Router();

router.use(authMiddleware.protect);

router.post('/', orderController.createOrder);

router.get('/me', orderController.getAllOrdersOneUser);

router.use(authMiddleware.protect);
router
  .route('/:id')
  .patch(
    orderMiddleware.validOrder,
    authMiddleware.protectAccountOwner,
    orderController.orderCompleted
  )
  .delete(
    orderMiddleware.validOrder,
    authMiddleware.protectAccountOwner,
    orderController.orderCancelled
  );

module.exports = router;
