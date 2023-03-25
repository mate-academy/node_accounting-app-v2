'use strict';

const express = require('express');
const expensesController = require('../controllers/expenses.js');

const router = express.Router();

router.get('/expenses', expensesController.getAll);

router.get('/expenses/:expensesId', expensesController.getById);

router.post('/expenses', express.json(), expensesController.add);

router.delete('/expenses/:expensesId', expensesController.remove);

router.patch('/expenses/:expensesId', express.json(),
  expensesController.update);

module.exports = {
  router,
};
