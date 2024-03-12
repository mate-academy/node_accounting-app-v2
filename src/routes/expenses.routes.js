'use strict';

const { Router } = require('express');
const expenseControllers = require('../controllers/expense.controller');

const router = Router();

router.get('/', expenseControllers.getAll);

router.get('/:expenseId', expenseControllers.get);

router.patch('/:expenseId', expenseControllers.update);

router.delete('/:expenseId', expenseControllers.remove);

router.post('/', expenseControllers.create);

module.exports = {
  router,
};
