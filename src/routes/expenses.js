'use strict';

const expensesController = require('../controllers/expenses');
const express = require('express');

const router = express.Router();

router.post('/expenses', express.json(), expensesController.add);

router.get('/expenses', express.json(), expensesController.getALL);

router.get('/expenses/:id', express.json(), expensesController.getOne);

router.patch('/expenses/:id', express.json(), expensesController.update);

router.delete('/expenses/:id', express.json(), expensesController.remove);

module.exports = router;
