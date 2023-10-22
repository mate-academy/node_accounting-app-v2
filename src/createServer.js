'use strict';

const express = require('express');
const app = express();

const expenses = [];

app.post('/expenses', (req, res) => {
  const { name, amount } = req.body;

  if (!name || !amount) {
    return res.status(400).json({ error: 'Name and amount are required.' });
  }

  const newExpense = {
    id: expenses.length + 1,
    name,
    amount,
  };

  expenses.push(newExpense);

  return res.status(201).json(newExpense);
});

app.get('/expenses', (req, res) => {
  return res.json(expenses);
});

app.get('/expenses/:id', (req, res) => {
  const { id } = req.params;

  const expense = expenses.find((e) => e.id === parseInt(id));

  if (!expense) {
    return res.status(404).json({ error: 'Expense not found.' });
  }

  return res.json(expense);
});

app.put('/expenses/:id', (req, res) => {
  const { id } = req.params;
  const { name, amount } = req.body;

  if (!name || !amount) {
    return res.status(400).json({ error: 'Name and amount are required.' });
  }

  const expense = expenses.find((e) => e.id === parseInt(id));

  if (!expense) {
    return res.status(404).json({ error: 'Expense not found.' });
  }

  expense.name = name;
  expense.amount = amount;

  return res.json(expense);
});

app.delete('/expenses/:id', (req, res) => {
  const { id } = req.params;

  const index = expenses.findIndex((e) => e.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ error: 'Expense not found.' });
  }

  expenses.splice(index, 1);

  return res.status(204).send();
});

module.exports = {
  createServer: () => app,
};
