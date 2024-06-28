const express = require('express');

const {
  getFilteredExpense,
  setExpense,
  getCurrentExpense,
  deleteExpense,
  updateExpense,
} = require('./../controllers/expense.controller');

const {
  requestValidatorExpense,
  currentValidatorExpense,
  validateExpenseData,
} = require('../middleware/validator.middleware');

const router = express.Router();

router.get('/expenses', validateExpenseData, getFilteredExpense);

router.post('/expenses', requestValidatorExpense, setExpense);

router.get('/expenses/:id', currentValidatorExpense, getCurrentExpense);

router.delete('/expenses/:id', currentValidatorExpense, deleteExpense);

router.patch('/expenses/:id', currentValidatorExpense, updateExpense);

module.exports = {
  router,
};
