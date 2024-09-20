const express = require('express');
const expenceController = require('../controllers/expenseControllers');

const expenceRoute = express.Router();

expenceRoute.get('/', expenceController.getExpenses);
expenceRoute.get('/:id', expenceController.getOneExpense);
expenceRoute.post('/', expenceController.createExpance);
expenceRoute.patch('/:id', expenceController.updateExpense);
expenceRoute.delete('/:id', expenceController.removeExpense);

module.exports = { expenceRoute };
