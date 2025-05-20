const express = require('express');
const router = express.Router();
const {
  getExpenses,
  getExpense,
  postExpense,
  patchExpense,
  deleteExpense,
} = require('../controllers/expenseController');

router.get('/', getExpenses);
router.get('/:id', getExpense);
router.post('/', postExpense);
router.patch('/:id', patchExpense);
router.delete('/:id', deleteExpense);

module.exports = router;
