const { body } = require('express-validator')

exports.validateUser = [
    body('name')
    .exists()
    .withMessage('User Name is required')
    .notEmpty()
    .withMessage('User Name must be filled'),

    body('email')
    .exists()
    .withMessage('Email is required')
    .notEmpty()
    .withMessage('Email must be filled')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),

    body('phone')
    .exists()
    .withMessage('Phone is required')
    .notEmpty()
    .withMessage('Phone must be filled')
    .isMobilePhone()
    .withMessage('Please enter a valid phone number.'),

    body('password')
    .exists()
    .withMessage('Password is required')
    .notEmpty()
    .withMessage('Password must be filled')
    .isLength({ min: 5 })
    .withMessage('Password must be atleast 5 characters long')
]

exports.validateUserLogin = [
    body('email')
    .exists()
    .withMessage('Email is required')
    .notEmpty()
    .withMessage('Email must be filled')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),

    body('password')
    .exists()
    .withMessage('Password is required')
    .notEmpty()
    .withMessage('Password must be filled')
]