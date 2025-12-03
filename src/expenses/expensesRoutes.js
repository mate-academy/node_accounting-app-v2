const express = require('express');
const router = express.Router();

const {
  listExpenses,
  listExpensesById,
  createExpenses,
  putExpensesById,
  patchExpensesById,
  deleteExpensesById,
} = require('./expensesController');

router.get('/', listExpenses);
router.get('/:id', listExpensesById);
router.post('/', createExpenses);
router.put('/:id', putExpensesById);
router.patch('/:id', patchExpensesById);
router.delete('/:id', deleteExpensesById);

module.exports = router;
