'use strict';

const express = require('express');
const { expensesController } = require('../controllers/expensesController');

const router = express();

router.get('/', expensesController.getAll);

router.get('/:expenseId', expensesController.getByOne);

router.post('/', express.json(), expensesController.create);

router.delete('/:expenseId', expensesController.remove);

router.patch('/:expenseId', express.json(), expensesController.update);

module.exports.expensesRouter = router;
