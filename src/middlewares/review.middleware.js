const Restaurant = require('../models/restaurant.model');
const Review = require('../models/review.model');
const User = require('../models/user.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validReview = catchAsync(async (req, res, next) => {
  const { restaurantId, id: idReview } = req.params;

  const restaurant = await Restaurant.findOne({
    where: {
      id: restaurantId,
      status: 'active',
    },
  });

  if (!restaurant) {
    return next(
      new AppError(`Restaurant with id: ${restaurantId} not found`, 404)
    );
  }

  const review = await Review.findOne({
    where: {
      id: idReview,
      status: 'active',
    },
  });

  if (!review) {
    return next(new AppError(`Review with id: ${id} not found`, 404));
  }

  const user = await User.findOne({
    where: {
      id: review.userId,
      status: 'active',
    },
  });

  req.user = user;
  req.review = review;
  next();
});
