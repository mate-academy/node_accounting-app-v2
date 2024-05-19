const express = require('express');
const expenseController = require('../controller/expense.controller');

const router = express.Router();

router.get('/', expenseController.getAll);
router.get('/:id', expenseController.getById);
router.post('/', expenseController.create);
router.patch('/:id', expenseController.update);
router.delete('/:id', expenseController.remove);

module.exports = {
  expenseRouter: router,
};
