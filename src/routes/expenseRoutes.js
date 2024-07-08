const { Router } = require('express');
const {GetAllExpensesController} = require('../controllers/expense');

const expenseRoutes = Router();

expenseRoutes.get('/', GetAllExpensesController.handle);
expenseRoutes.get('/:id');
expenseRoutes.post('/');
expenseRoutes.patch('/:id');
expenseRoutes.delete('/:id');

module.exports = expenseRoutes;
