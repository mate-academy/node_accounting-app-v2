const { Router } = require('express');
const {
  GetAllExpensesController,
  CreateExpenseController,
  GetExpenseController,
} = require('../controllers/expense');
const { verifyExpenseFields, verifyIfExpenseExists, verifyIfUserExists, verifyIfIdIsANumber } = require('../middlewares');

const expenseRoutes = Router();

expenseRoutes.get('/', GetAllExpensesController.handle);
expenseRoutes.get('/:id', verifyIfIdIsANumber, verifyIfExpenseExists, GetExpenseController.handle);
expenseRoutes.post('/', verifyIfUserExists, verifyExpenseFields, CreateExpenseController.handle);
expenseRoutes.patch('/:id');
expenseRoutes.delete('/:id');

module.exports = expenseRoutes;
