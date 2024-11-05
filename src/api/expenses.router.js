const express = require('express');
const expenseRoute = express.Router();
const expenseController = require('../controllers/expenseController');

expenseRoute.get('/', expenseController.getAll);

expenseRoute.post('/', expenseController.add);

expenseRoute.get('/:id', expenseController.get);

expenseRoute.delete('/:id', expenseController.remove);

expenseRoute.patch('/:id', expenseController.update);

module.exports = { expenseRoute };
