'use strict';

const express = require('express');
const expensesController = require('../controllers/expensesController');

const expensesRouter = express.Router();

expensesRouter.get('/', expensesController.get);

expensesRouter.post('/', expensesController.post);

expensesRouter.get('/:id', expensesController.getOne);

expensesRouter.delete('/:id', expensesController.deleteOne);

expensesRouter.patch('/:id', expensesController.patchOne);

module.exports = { expensesRouter };
