const cors = require('cors');
const express = require('express');
const app = express();
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/error.controller');

const userRoutes = require('./routes/user.route');
const restaurantRoutes = require('./routes/restaurant.route');
const mealRoutes = require('./routes/meal.route');
const orderRoutes = require('./routes/order.route');

app.use(express.json());
app.use(cors());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/restaurants', restaurantRoutes);
app.use('/api/v1/meals', mealRoutes);
app.use('/api/v1/orders', orderRoutes);

app.all('*', (req, res, next) => {
  return next(
    new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
  );
});

app.use(globalErrorHandler);

module.exports = app;

/* 
! My notes:
? 1. Me quede en el paso 27
? 2. No se hara el paso 44 cambio de contraseña
? 3. Me quede en restaurant.middleware.js 
? 4. Me quede en el paso 54
? 5. Me quede en meal.middleware.js 
?
*/
