const express = require('express');
const expensesController = require('../controllers/expenses.controller');

const router = express.Router();

router.get('/', expensesController.getAll);

router.post('/', expensesController.create);

router.get('/:id', expensesController.get);

router.delete('/:id', expensesController.remove);

router.patch('/:id', expensesController.update);

module.exports = { router };
