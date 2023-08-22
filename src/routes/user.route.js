const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

const userMiddleware = require('../middlewares/user.middleware');
const validationMiddleware = require('../middlewares/validations.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

router.post(
  '/signup',
  validationMiddleware.createUserValidation,
  userController.signup
);
router.post(
  '/login',
  validationMiddleware.loginUserValidation,
  userController.login
);

router.use(authMiddleware.protect);

router
  .route('/:id')
  .patch(
    validationMiddleware.updateUserValidation,
    userMiddleware.validUser,
    authMiddleware.protectAccountOwner,
    userController.updateUser
  )
  .delete(
    userMiddleware.validUser,
    authMiddleware.protectAccountOwner,
    userController.deleteUser
  );

router.get('/orders', userController.getOrders);
router.get('/orders/:id', userController.getOneOrder);

module.exports = router;
