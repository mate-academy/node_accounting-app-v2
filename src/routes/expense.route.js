'use strict';

const express = require('express');
const router = express.Router();
const expenseController = require('./../controllers/expense.controller');

router.get('/', expenseController.get);

router.get('/:id', expenseController.getOne);

router.post('/', expenseController.create);

router.patch('/:id', expenseController.update);

router.delete('/:id', expenseController.remove);

module.exports = router;
