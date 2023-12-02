const { body } = require('express-validator')

exports.validateTask = [
    body('title')
    .exists()
    .withMessage('Title is required.')
    .notEmpty()
    .withMessage('Title must be filled.'),

    body('due_date')
    .exists()
    .withMessage('Due Date is required.')
    .notEmpty()
    .withMessage('Due Date must be filled.')
] 