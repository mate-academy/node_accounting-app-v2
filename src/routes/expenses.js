'use strict';

const express = require('express');

function createExpensesRoute(expenses, users) {
  const router = express.Router();
  let expenseIdCounter = 1;

  router.get('/', (req, res) => {
    let filteredExpenses = expenses;

    if (req.query.userId) {
      filteredExpenses = filteredExpenses.filter(
        (exp) => exp.userId === Number(req.query.userId),
      );
    }

    if (req.query.categories) {
      filteredExpenses = filteredExpenses.filter(
        (exp) =>
          // eslint-disable-next-line
          req.query.categories.includes(exp.category),
        // eslint-disable-next-line
      );
    }

    if (req.query.from) {
      filteredExpenses = filteredExpenses.filter(
        (exp) => exp.spentAt >= req.query.from,
      );
    }

    if (req.query.to) {
      filteredExpenses = filteredExpenses.filter(
        (exp) => exp.spentAt <= req.query.to,
      );
    }

    res.send(filteredExpenses);
  });

  router.post('/', (req, res) => {
    const expense = req.body;

    if (!expense.amount) {
      return res.status(400).send('Amount is required');
    }

    if (!expense.title) {
      return res.status(400).send('title is required');
    }

    if (!expense.userId) {
      return res.status(400).send('userId is required');
    }

    const user = users.find((us) => us.id === expense.userId);

    if (!user) {
      return res.status(400).send('Such user doesn`t exist');
    }

    if (!expense.spentAt) {
      return res.status(400).send('spentAt is required');
    }

    if (!expense.category) {
      return res.status(400).send('category is required');
    }

    expense.id = expenseIdCounter;
    expenseIdCounter++;

    expenses.push(expense);
    res.status(201).send(expense);
  });

  router.get('/:id', (req, res) => {
    const expense = expenses.find((ex) => ex.id === Number(req.params.id));

    if (!expense) {
      return res.status(404).send('Expense not found');
    }

    res.send(expense);
  });

  router.delete('/:id', (req, res) => {
    const index = expenses.findIndex((ex) => ex.id === Number(req.params.id));

    if (index === -1) {
      return res.status(404).send('Expense not found');
    }

    expenses.splice(index, 1);

    res.status(204).send('Deleted');
  });

  router.patch('/:id', (req, res) => {
    const index = expenses.findIndex((ex) => ex.id === Number(req.params.id));

    if (index === -1) {
      return res.status(404).send('Expense not found');
    }

    expenses[index] = {
      ...expenses[index],
      ...req.body,
    };

    res.send(expenses[index]);
  });

  return router;
}

module.exports = createExpensesRoute;
