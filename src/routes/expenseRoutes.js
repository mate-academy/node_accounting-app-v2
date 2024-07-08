const { Router } = require('express');
const {
  GetAllExpensesController,
  CreateExpenseController,
  GetExpenseController,
  EditExpenseController,
  DeleteExpenseController,
} = require('../controllers/expense');
const {
  verifyExpenseFields,
  verifyIfExpenseExists,
  verifyIfUserExists,
  verifyIfIdIsANumber,
} = require('../middlewares');

const expenseRoutes = Router();

expenseRoutes.get('/', GetAllExpensesController.handle);

expenseRoutes.get(
  '/:id',
  verifyIfIdIsANumber,
  verifyIfExpenseExists,
  GetExpenseController.handle,
);

expenseRoutes.post(
  '/',
  verifyIfUserExists,
  verifyExpenseFields,
  CreateExpenseController.handle,
);

expenseRoutes.patch(
  '/:id',
  verifyIfIdIsANumber,
  verifyIfExpenseExists,
  verifyIfUserExists,
  verifyExpenseFields,
  EditExpenseController.handle,
);
expenseRoutes.delete('/:id', verifyIfIdIsANumber, verifyIfExpenseExists, DeleteExpenseController.handle);

module.exports = expenseRoutes;
