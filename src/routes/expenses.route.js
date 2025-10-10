const express = require('express');
const router = express.Router();
const expensesController = require('../controllers/expenses.controller');

router.get('/expenses', expensesController.getAll);
router.get('/expenses/:id', expensesController.getExpense);
router.post('/expenses', expensesController.createExpense);
router.patch('/expenses/:id', expensesController.updateExpense);
router.delete('/expenses/:id', expensesController.deleteExpense);

module.exports = router;
