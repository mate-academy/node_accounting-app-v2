const express = require('express');
const {
  loadExpenses,
  loadOneExpense,
  addOneExpense,
  changeOneExpense,
  removeExpense,
} = require('../controllers/expensesControllers');

const expensesRouter = express.Router();

router.get('/', cors(), loadExpenses);

router.get('/:id', loadOneExpense);

router.post('/', addOneExpense);

router.put('/:id', changeOneExpense);

router.delete('/:id', removeExpense);

module.exports = {
  expensesRouter,
};
