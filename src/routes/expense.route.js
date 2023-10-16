'use strict';

const expenseController = require('../controllers/expense.controllers');
const express = require('express');

const router = express.Router();

router.get('/', expenseController.getAll);
router.get('/:id', expenseController.getOne);
router.post('/', expenseController.create);
router.patch('/:id', expenseController.update);
router.delete('/:id', expenseController.remove);

module.exports = router;
