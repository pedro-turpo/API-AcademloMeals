const catchAsync = require('../utils/catchAsync');
const Restaurant = require('../models/restaurant.model');
const Review = require('../models/review.model');
const AppError = require('../utils/appError');

exports.createRestaurant = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;

  const restaurant = await Restaurant.create({
    name: name.toLowerCase().trim(),
    address: address.toLowerCase().trim(),
    rating,
  });

  return res.status(200).json({
    status: 'Success',
    message: 'The restaurant has been created',
    restaurant,
  });
});

exports.findAllRestaurants = catchAsync(async (req, res, next) => {
  const restaurants = await Restaurant.findAll({
    where: {
      status: 'active',
    },
  });

  return res.status(200).json({
    status: 'success',
    restaurants,
  });
});

exports.findOneRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  return res.status(200).json({
    status: 'success',
    restaurant: {
      id: restaurant.id,
      name: restaurant.name,
      address: restaurant.address,
      rating: restaurant.rating,
    },
  });
});

exports.updateRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;
  const { name, address } = req.body;

  await restaurant.update({ name, address });

  return res.status(200).json({
    status: 'success',
    message: 'Restaurant updated successfully',
  });
});

exports.deleteRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  await restaurant.update({ status: 'inactive' });

  return res.status(200).json({
    status: 'success',
    message: 'Restaurant deleted successfully',
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  const { id: userId } = req.sessionUser;
  const { id: restaurantId } = req.params;
  const { comment, rating } = req.body;

  const review = await Review.create({
    userId,
    restaurantId,
    comment,
    rating,
  });

  return res.status(200).json({
    status: 'success',
    message: 'Review was created successfully',
    review: {
      id: review.id,
      userId: review.userId,
      comment: review.comment,
      rating: review.rating,
    },
  });
});

exports.updateReview = catchAsync(async (req, res, next) => {
  const { review } = req;
  const { comment, rating } = req.body;

  await review.update({ comment, rating });

  return res.status(200).json({
    status: 'success',
    message: 'Review updated successfully',
  });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  const { review } = req;

  await review.update({ status: 'deleted' });

  return res.status(200).json({
    status: 'success',
    message: 'Review deleted successfully',
  });
});
