const Order = require('../models/order.model');
const User = require('../models/user.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findOne({
    where: {
      id,
      status: 'active',
    },
  });

  if (!order) {
    return next(new AppError(`Order with id: ${id} not found`, 404));
  }

  const user = await User.findOne({
    where: {
      id: order.userId,
      status: 'active',
    },
  });

  if (!user) {
    return next(new AppError('This user is inactive', 404));
  }

  req.user = user;
  req.order = order;
  next();
});
