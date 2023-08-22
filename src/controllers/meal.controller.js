const Meal = require('../models/meal.model');
const Restaurant = require('../models/restaurant.model');
const catchAsync = require('../utils/catchAsync');

exports.createMeal = catchAsync(async (req, res, next) => {
  const { name, price } = req.body;
  const { id: restaurantId } = req.params;

  const meal = await Meal.create({
    name: name.toLowerCase().trim(),
    price,
    restaurantId,
  });

  return res.status(200).json({
    status: 'success',
    message: 'The meal has been created',
    meal,
  });
});

exports.findAllMeals = catchAsync(async (req, res, next) => {
  const meals = await Meal.findAll({
    where: {
      status: 'active',
    },
    include: [
      {
        model: Restaurant,
        attributes: ['id', 'name', 'address', 'rating'],
      },
    ],
  });

  return res.status(200).json({
    status: 'success',
    meals,
  });
});

exports.findOneMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const meal = await Meal.findOne({
    where: {
      id,
      status: 'active',
    },
    include: [
      {
        model: Restaurant,
        attributes: ['id', 'name', 'address', 'rating'],
      },
    ],
  });

  if (!meal) {
    return next(new AppError(`Meal with id: ${id} not found`, 404));
  }

  return res.status(200).json({
    status: 'success',
    meal,
  });
});

exports.updateMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;
  const { name, price } = req.body;

  await meal.update({ name, price });

  return res.status(200).json({
    status: 'success',
    message: 'Meal updated successfully',
  });
});

exports.deleteMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;

  await meal.update({ status: 'inactive' });

  return res.status(200).json({
    status: 'success',
    message: 'Meal deleted successfully',
  });
});
