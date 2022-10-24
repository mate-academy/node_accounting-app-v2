'use strict';

const express = require('express');
const expenseController = require('../controllers/expenses');
const router = express.Router();

router.get('/', expenseController.get);

router.post('/', expenseController.add);

router.get('/:id', expenseController.getOne);

router.delete('/:id', expenseController.remove);

router.patch('/:id', expenseController.update);

module.exports = router;
