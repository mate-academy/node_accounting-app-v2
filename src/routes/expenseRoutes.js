/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
'use strict';

const express = require('express');

function createExpenseRoutes(expenseController) {
  const router = express.Router();

  router.get('/', (req, res) => expenseController.getAllExpenses(req, res));
  router.post('/', (req, res) => expenseController.createExpense(req, res));
  router.get('/:id', (req, res) => expenseController.getExpenseById(req, res));
  router.patch('/:id', (req, res) => expenseController.updateExpense(req, res));

  router.delete('/:id', (req, res) =>
    expenseController.deleteExpense(req, res));

  return router;
}

module.exports = { createExpenseRoutes };
