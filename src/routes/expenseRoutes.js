const { Router } = require('express');
const { GetAllExpensesController, CreateExpenseController } = require('../controllers/expense');
const { verifyExpenseFields } = require('../middlewares');

const expenseRoutes = Router();

expenseRoutes.get('/', GetAllExpensesController.handle);
expenseRoutes.get('/:id');
expenseRoutes.post('/', verifyExpenseFields, CreateExpenseController.handle);
expenseRoutes.patch('/:id');
expenseRoutes.delete('/:id');

module.exports = expenseRoutes;
