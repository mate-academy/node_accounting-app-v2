const { Router } = require('express');
const {
  getExpenses,
  getExpenseById,
  createNewExpense,
  updateExpenseById,
  deleteExpenseById,
} = require('../controllers/expenses.controller');

const router = Router();

module.exports = { router };

router.get('/', getExpenses);
router.get('/:id', getExpenseById);
router.post('/', createNewExpense);
router.put('/:id', updateExpenseById);
router.patch('/:id', updateExpenseById);
router.delete('/:id', deleteExpenseById);
