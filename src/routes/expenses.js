'use strict';

const expensesControllers = require('../controllers/expenses');

const express = require('express');
const router = express.Router();

router.get('/', expensesControllers.getAll);

router.get('/:id', expensesControllers.getAOne);

router.post('/', expensesControllers.create);

router.delete('/:id', expensesControllers.remove);

router.patch('/:id', expensesControllers.update);

module.exports = router;
