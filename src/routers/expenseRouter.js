'use strict';

const express = require('express');

const expenseContoller = require('../controlers/expenses.js');

const router = express.Router();

router.post('/', expenseContoller.add);

router.get('/', expenseContoller.getAll);

router.get('/:id', expenseContoller.getById);

router.patch('/:id', expenseContoller.update);

router.delete('/:id', expenseContoller.remove);

module.exports = router;
