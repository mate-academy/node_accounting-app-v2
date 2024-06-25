const express = require('express');

const {
  getFilteredExpense,
  setExpense,
  getCurrentExpense,
  deleteExpense,
  updateExpense,
} = require('./../controllers/expense.controller');

const router = express.Router();

router.get('/expenses', getFilteredExpense);

router.post('/expenses', setExpense);

router.get('/expenses/:id', getCurrentExpense);

router.delete('/expenses/:id', deleteExpense);

router.patch('/expenses/:id', updateExpense);

module.exports = {
  router,
};
