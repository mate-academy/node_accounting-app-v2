'use strict';

const express = require('express');
const expensesControllers = require('../controllers/expenses');

const route = express.Router();

route.get('/', expensesControllers.getAll);

route.get('/:id', expensesControllers.getOne);

route.delete('/:id', expensesControllers.remove);

route.post('/', expensesControllers.add);

route.patch('/:id', expensesControllers.update);

module.exports = {
  route,
};
