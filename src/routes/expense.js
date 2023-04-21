'use strict';

const express = require('express');
const expenseController = require('../controllers/expense');

const router = express.Router();

router.get('/', expenseController.getFiltered);
router.post('/', expenseController.add);
router.get('/:id', expenseController.getById);
router.delete('/:id', expenseController.remove);
router.patch('/:id', expenseController.update);

module.exports = {
  expenseRouter: router,
};
