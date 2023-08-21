'use strict';

const express = require('express');
const expensesController = require('../controllers/expenses');

const router = express.Router();

router.get('/', expensesController.getAll);

router.get('/:id', expensesController.getById);

router.delete('/:id', expensesController.remove);

router.post('/', expensesController.create);

router.patch('/:id', expensesController.update);

module.exports = router;
