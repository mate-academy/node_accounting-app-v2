'use strict';

const express = require('express');
const router = express.Router();
const expensesController = require('../controllers/expensesControllers');

router.post('/', expensesController.post);

router.get('/', expensesController.get);

router.get('/:id', expensesController.getId);

router.patch('/:id', expensesController.patch);

router.delete('/:id', expensesController.deleteExpense);

module.exports = router;
