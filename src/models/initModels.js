const Meal = require('./meal.model');
const Order = require('./order.model');
const Restaurant = require('./restaurant.model');
const Review = require('./review.model');
const User = require('./user.model');

const initModel = () => {
  Restaurant.hasMany(Review);
  Review.belongsTo(Restaurant);

  Restaurant.hasMany(Meal);
  Meal.belongsTo(Restaurant);

  Meal.belongsTo(Order);
  Order.belongsTo(Meal);

  Review.belongsTo(User);
  User.hasMany(Review);

  User.hasMany(Order);
  Order.belongsTo(User);
};

module.exports = initModel;
