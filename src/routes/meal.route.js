const express = require('express');

const mealController = require('../controllers/meal.controller');
const validationMiddleware = require('../middlewares/validations.middleware');
const mealMiddleware = require('../middlewares/meal.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.post(
  '/:id',
  authMiddleware.protect,
  authMiddleware.restrictTo('admin'),
  validationMiddleware.createMealValidation,
  mealController.createMeal
);

router.get('/', mealController.findAllMeals);

router
  .route('/:id')
  .get(mealController.findOneMeal)
  .patch(
    mealMiddleware.validMeal,
    authMiddleware.protect,
    authMiddleware.restrictTo('admin'),
    validationMiddleware.updateMealValidation,
    mealController.updateMeal
  )
  .delete(
    mealMiddleware.validMeal,
    authMiddleware.protect,
    authMiddleware.restrictTo('admin'),
    mealController.deleteMeal
  );

module.exports = router;
