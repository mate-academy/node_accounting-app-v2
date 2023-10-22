'use strict';

const express = require('express');
const router = express.Router();
const expensesController = require('../controllers/expenses.controller');

router.get('/', expensesController.get);
router.get('/:id', expensesController.getOne);
router.patch('/:id', expensesController.update);
router.post('/', expensesController.create);
router.delete('/:id', expensesController.remove);

module.exports = router;
