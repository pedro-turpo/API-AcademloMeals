const express = require('express');

const restaurantController = require('../controllers/restaurant.controller');

const validationMiddleware = require('../middlewares/validations.middleware');
const restaurantMiddleware = require('../middlewares/restaurant.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const reviewMiddleware = require('../middlewares/review.middleware');

const router = express.Router();

router
  .route('/')
  .post(
    authMiddleware.protect,
    authMiddleware.restrictTo('admin'),
    validationMiddleware.createRestaurantValidation,
    restaurantController.createRestaurant
  )
  .get(restaurantController.findAllRestaurants);

router
  .route('/:id')
  .get(
    restaurantMiddleware.validRestaurant,
    restaurantController.findOneRestaurant
  )
  .patch(
    authMiddleware.protect,
    authMiddleware.restrictTo('admin'),
    validationMiddleware.updateRestaurantValidation,
    restaurantMiddleware.validRestaurant,
    restaurantController.updateRestaurant
  )
  .delete(
    authMiddleware.protect,
    authMiddleware.restrictTo('admin'),
    restaurantMiddleware.validRestaurant,
    restaurantController.deleteRestaurant
  );

router.use(authMiddleware.protect);

router.route('/reviews/:id').post(restaurantController.createReview);

router
  .route('/reviews/:restaurantId/:id')
  .patch(
    reviewMiddleware.validReview,
    authMiddleware.protectAccountOwner,
    restaurantController.updateReview
  )
  .delete(
    reviewMiddleware.validReview,
    authMiddleware.protectAccountOwner,
    restaurantController.deleteReview
  );

module.exports = router;
