'use strict';

const express = require('express');
const router = express.Router();
const expensesService = require('./expensesService');

router.post('/', (req, res) => {
  const { name, amount } = req.body;

  if (!name || !amount) {
    return res.status(400).json({ error: 'Name and amount are required.' });
  }

  const newExpense = expensesService.createExpense(name, amount);

  return res.status(201).json(newExpense);
});

router.get('/', (req, res) => {
  const allExpenses = expensesService.getAllExpenses();

  return res.json(allExpenses);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const expense = expensesService.getExpenseById(id);

  if (!expense) {
    return res.status(404).json({ error: 'Expense not found.' });
  }

  return res.json(expense);
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, amount } = req.body;

  if (!name || !amount) {
    return res.status(400).json({ error: 'Name and amount are required.' });
  }

  const updatedExpense = expensesService.updateExpense(id, name, amount);

  if (!updatedExpense) {
    return res.status(404).json({ error: 'Expense not found.' });
  }

  return res.json(updatedExpense);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const success = expensesService.deleteExpense(id);

  if (!success) {
    return res.status(404).json({ error: 'Expense not found.' });
  }

  return res.status(204).send();
});

module.exports = router;
