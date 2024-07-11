const expenseController = require('./../controllers/expense.controller');

const express = require('express');
const router = express.Router();

router.get('/', expenseController.get);

router.get('/:id', expenseController.getOne);

router.post('/', expenseController.post);

router.delete('/:id', expenseController.remove);

router.patch('/:id', expenseController.patch);

module.exports = router;
