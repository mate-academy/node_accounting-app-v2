const express = require('express');
const expensesController = require('../controllers/expenses.controller.js');
const router = express.Router();

router.get('/', expensesController.getAll);
router.get('/:id', expensesController.getOne);
router.post('/', expensesController.createExpense);
router.delete('/:id', expensesController.deleteExpense);
router.patch('/:id', expensesController.updateExpense);

module.exports = router;
