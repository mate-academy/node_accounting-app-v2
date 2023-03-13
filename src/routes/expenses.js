'use strict';

const expenseController = require('../controllers/expenses');
const express = require('express');

const router = express.Router();

router.get('/expenses', express.json(), expenseController.getAll);
router.get('/expenses/:expenseId', expenseController.getOne);

router.post('/expenses', express.json(), expenseController.add);

router.delete('/expenses/:expenseId', expenseController.remove);

router.patch('/expenses/:expenseId', express.json(), expenseController.update);

module.exports = router;
