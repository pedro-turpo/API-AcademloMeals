const { body, validationResult } = require('express-validator');

const validateFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }

  next();
};

exports.createUserValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email must be a correct format'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must have a least 8 characters')
    .matches(/[a-zA-Z]/)
    .withMessage('Password must have cotain a least one letter'),
  validateFields,
];

exports.loginUserValidation = [
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email must be a correct format'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must have a least 8 characters')
    .matches(/[a-zA-Z]/)
    .withMessage('Password must have contain a least one letter'),
  validateFields,
];

exports.updateUserValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email must be a correct format'),
  validateFields,
];

exports.createRestaurantValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('address')
    .notEmpty()
    .withMessage('Address is required')
    .isLength({ max: 100 })
    .withMessage('The address cannot be longer than 100 characters'),
  body('rating')
    .notEmpty()
    .withMessage('Rating is required')
    .isInt({ min: 1, max: 5 })
    .withMessage('The rating must be a number from 1 to 5'),
  validateFields,
];

exports.updateRestaurantValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('address')
    .notEmpty()
    .withMessage('Address is required')
    .isLength({ max: 100 })
    .withMessage('The address cannot be longer than 100 characters'),
  validateFields,
];

exports.createMealValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('price')
    .notEmpty()
    .withMessage('Price is required')
    .isInt({ min: 1 })
    .withMessage('Price must be a positive integer'),
  validateFields,
];

exports.updateMealValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('price')
    .notEmpty()
    .withMessage('Price is required')
    .isInt({ min: 1 })
    .withMessage('Price must be a positive integer'),
  validateFields,
];
