'use strict';

const express = require('express');
const { expensesController } = require('../controllers/expanse');

const router = express.Router();

router.get('/', expensesController.getAll);

router.get('/:id', expensesController.getById);

router.post('/', expensesController.create);

router.delete('/:id', expensesController.remove);

router.patch('/:id', expensesController.update);

module.exports = {
  router,
};
