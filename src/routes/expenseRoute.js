const express = require('express');
const expenseRouter = express.Router();
const expenseController = require('../controllers/expenseController');

expenseRouter.get('/', expenseController.getAll);

expenseRouter.post('/', expenseController.create);

expenseRouter.get('/:id', expenseController.get);

expenseRouter.delete('/:id', expenseController.remove);

expenseRouter.patch('/:id', expenseController.update);

module.exports = { expenseRouter };
