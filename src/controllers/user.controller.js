const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcryptjs');
const generateJWT = require('../utils/jwt');
const AppError = require('../utils/appError');
const Order = require('../models/order.model');
const Meal = require('../models/meal.model');
const Restaurant = require('../models/restaurant.model');

exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const salt = await bcrypt.genSalt(12);
  const encryptedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name: name.toLowerCase().trim(),
    email: email.toLowerCase().trim(),
    password: encryptedPassword,
    role,
  });

  const token = await generateJWT(user.id);

  res.status(200).json({
    status: 'success',
    message: 'The user has been created',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email: email.toLowerCase().trim(),
      status: 'active',
    },
  });

  if (!user) {
    return next(new AppError(`User with email: ${email} not found`, 404));
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  const token = await generateJWT(user.id);
  return res.status(200).json({
    status: 'success',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { name, email } = req.body;

  await user.update({ name, email });

  res.status(200).json({
    status: 'success',
    message: 'User updated successfully',
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.update({ status: 'inactive' });

  return res.status(200).json({
    status: 'success',
    message: 'User deleted successfully',
  });
});

exports.getOrders = catchAsync(async (req, res, next) => {
  const { id } = req.sessionUser;
  const orders = await Order.findAll({
    where: {
      userId: id,
      status: 'active',
    },
    attributes: {
      exclude: ['status', 'createdAt', 'updatedAt'],
    },
    include: [
      {
        model: Meal,
        attributes: ['id', 'name', 'price'],
        include: [
          {
            model: Restaurant,
            attributes: ['id', 'name', 'address', 'rating'],
          },
        ],
      },
    ],
  });

  return res.status(200).json({
    status: 'success',
    message: 'Here are your orders 🫡!',
    orders,
  });
});

exports.getOneOrder = catchAsync(async (req, res, next) => {
  const { id: userId } = req.sessionUser;
  const { id } = req.params;

  const order = await Order.findOne({
    where: {
      id,
      userId,
      status: 'active',
    },
    attributes: {
      exclude: ['status', 'createdAt', 'updatedAt'],
    },
    include: [
      {
        model: Meal,
        attributes: ['id', 'name', 'price'],
        include: [
          {
            model: Restaurant,
            attributes: ['id', 'name', 'address', 'rating'],
          },
        ],
      },
    ],
  });

  return res.status(200).json({
    status: 'success',
    message: 'Here are your order 🫡!',
    order,
  });
});
