const express = require('express');
const router = express.Router();
const expenssesController = require('../controllers/expenssesConroller');

router.get('/', expenssesController.getExpenses);

router.get('/:id', expenssesController.getExpenseById);

router.post('/', expenssesController.createExpense);

router.patch('/:id', expenssesController.updateExpense);

router.delete('/:id', expenssesController.deleteExpense);

module.exports = router;
