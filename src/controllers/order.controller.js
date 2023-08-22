const Meal = require('../models/meal.model');
const Order = require('../models/order.model');
const Restaurant = require('../models/restaurant.model');
const User = require('../models/user.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createOrder = catchAsync(async (req, res, next) => {
  const { quantity, mealId } = req.body;
  const { id: userId } = req.sessionUser;

  const meal = await Meal.findOne({
    where: {
      status: 'active',
      id: mealId,
    },
  });

  if (!meal) {
    return next(new AppError(`The meal with id: ${mealId} not found`, 404));
  }

  const totalPrice = (await quantity) * meal.price;

  const order = await Order.create({
    mealId,
    userId,
    totalPrice,
    quantity,
  });

  return res.status(200).json({
    status: 'success',
    message: 'The order has been created',
    order,
  });
});

exports.getAllOrdersOneUser = catchAsync(async (req, res, next) => {
  const { id } = req.sessionUser;
  const orders = await Order.findAll({
    where: {
      userId: id,
      status: 'active',
    },
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'status'],
    },
    include: [
      {
        model: Meal,
        attributes: {
          orderId: null,
          exclude: ['createdAt', 'updatedAt', 'status', 'orderId'],
        },
        include: [
          {
            model: Restaurant,
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'status'],
            },
          },
        ],
      },
    ],
  });

  if (!orders) {
    return next(new AppError(`You don't have orders`));
  }

  return res.status(200).json({
    status: 'success',
    message: 'here are your orders',
    orders,
  });
});

exports.orderCompleted = catchAsync(async (req, res, next) => {
  const { order } = req;

  await order.update({ status: 'completed' });

  return res.status(200).json({
    status: 'success',
    message: 'Order is completed successfully 😁!',
  });
});

exports.orderCancelled = catchAsync(async (req, res, next) => {
  const { order } = req;

  await order.update({ status: 'cancelled' });

  return res.status(200).json({
    status: 'success',
    message: 'Order is cancelled successfully 😢!',
  });
});
