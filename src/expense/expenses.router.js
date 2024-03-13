'use strict';

const {
  getAll,
  getOneById,
  createExpenseController,
  updateExpenseController,
  deleteExpenseController,
} = require('../controllers/expenses.controller');

const express = require('express');

const router = express.Router();

router.get('/', getAll);

router.get('/:id', getOneById);

router.post('/', createExpenseController);

router.patch('/:id', updateExpenseController);

router.delete('/:id', deleteExpenseController);

module.exports = {
  router,
};
