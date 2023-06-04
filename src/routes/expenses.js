'use strict';

const express = require('express');
const expenseController = require('../controllers/expenses');
const router = express.Router();

router.get('/expenses', expenseController.getAll);

router.get('/expenses/:expenseId', expenseController.getOne);

router.post('/expenses', express.json(), expenseController.add);

router.delete('/expenses/:expenseId', expenseController.remove);

router.patch('/expenses/:expenseId', express.json(), expenseController.update);

module.exports = { expenseRouter: router };
