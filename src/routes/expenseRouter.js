'use strict';

const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

router.get('/', expenseController.getAll);
router.post('/', expenseController.create);
router.get('/:id', expenseController.get);
router.patch('/:id', expenseController.update);
router.delete('/:id', expenseController.remove);

module.exports = {
  router,
};
