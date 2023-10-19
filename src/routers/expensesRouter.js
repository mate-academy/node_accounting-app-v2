'use strict';

const express = require('express');
const expensesController = require('../controllers/expensesController');

const expensesRouter = express.Router();

expensesRouter.get('/', expensesController.getAll);

expensesRouter.post('/', expensesController.post);

expensesRouter.get('/:id', expensesController.getById);

expensesRouter.delete('/:id', expensesController.remove);

expensesRouter.patch('/:id', expensesController.update);

module.exports = { expensesRouter };
