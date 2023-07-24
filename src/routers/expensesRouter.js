'use strict';

const express = require('express');
const { expensesController } = require('../controllers/expensesController');

const router = express();

router.get('/expenses', expensesController.getAll);

router.get('/expenses/:expenseId', expensesController.getByOne);

router.post('/expenses', express.json(), expensesController.create);

router.delete('/expenses/:expenseId', expensesController.remove);

router.patch('/expenses/:expenseId', express.json(), expensesController.update);

module.exports.expensesRouter = router;
