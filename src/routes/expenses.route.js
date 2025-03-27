const express = require('express');
const expenseController = require('../controllers/expenses.controller');

const router = express.Router();

router
  .get('/', expenseController.get)
  .get('/:id', expenseController.getOne)
  .post('/', expenseController.create)
  .delete('/:id', expenseController.remove)
  .patch('/:id', expenseController.update);

module.exports = router;
