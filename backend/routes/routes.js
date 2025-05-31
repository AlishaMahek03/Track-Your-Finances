const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const usercontroller = require('../controllers/user.controller');
const authmiddleware = require('../middlewares/auth.middleware');


router.post('/signup',
  body('name').isLength({min: 3}).withMessage('Name must be at least 3 characters long'),
  body('email').isEmail().withMessage('Please enter a valid email address'),
  body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'), usercontroller.signup
);

router.post('/login',
  body('email').isEmail().withMessage('Please enter a valid email address'),
  body('password').notEmpty().withMessage('Password cannot be empty'), usercontroller.login
);

router.post('/transactions',authmiddleware.authTransaction,
  body('name_transaction').isLength({min: 1}).withMessage('Transaction name is required'),
  body('amount').isNumeric().withMessage('Amount must be a number'),
  body('category').isLength({min: 1}).withMessage('Category is required'),
  usercontroller.createTransaction
);

router.get('/transactions_get',authmiddleware.authTransaction, usercontroller.getTransactions);


router.get('/backend', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the backend API',
    status: 'success'
  });
}
);

module.exports = router;