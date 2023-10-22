/* eslint-disable no-param-reassign */

'use strict';

const express = require('express');

const expenseRoutes = (expenses, expenseId, users) => {
  const router = express.Router();

  router.post('/', (req, res) => {
    const {
      userId: newUserId,
      spentAt,
      note,
      title,
      amount,
      category,
    } = req.body;

    const userExists = users.some(u => u.id === newUserId);

    if (!userExists) {
      return res.status(400).send({ message: 'User not found' });
    }

    if (!newUserId || !spentAt || !title || !note || !amount || !category) {
      return res.status(400).send();
    }

    const newExpense = {
      id: ++expenseId,
      userId: newUserId,
      spentAt,
      note,
      title,
      amount,
      category,
    };

    expenses.push(newExpense);
    res.status(201).json(newExpense);
  });

  router.get('/', (req, res) => {
    let filteredExpenses = [...expenses];

    const { userId, categories, from, to } = req.query;

    if (userId) {
      filteredExpenses = filteredExpenses
        .filter(expense => expense.userId === parseInt(userId));
    }

    if (categories) {
      filteredExpenses = filteredExpenses
        .filter(expense => categories.includes(expense.category));
    }

    if (from) {
      const fromDate = new Date(from);

      filteredExpenses = filteredExpenses
        .filter(expense => new Date(expense.spentAt) >= fromDate);
    }

    if (to) {
      const toDate = new Date(to);

      filteredExpenses = filteredExpenses
        .filter(expense => new Date(expense.spentAt) <= toDate);
    }

    res.status(200).json(filteredExpenses);
  });

  router.get('/:id', (req, res) => {
    const expense = expenses.find(e => e.id === parseInt(req.params.id));

    if (!expense) {
      return res.status(404).send();
    }
    res.status(200).json(expense);
  });

  router.patch('/:id', (req, res) => {
    const expense = expenses.find(e => e.id === parseInt(req.params.id));

    if (!expense) {
      return res.status(404).send();
    }

    const { spentAt, title, amount, category, note } = req.body;

    if (spentAt) {
      expense.spentAt = spentAt;
    }

    if (title) {
      expense.title = title;
    }

    if (amount) {
      expense.amount = amount;
    }

    if (category) {
      expense.category = category;
    }

    if (note) {
      expense.note = note;
    }

    res.status(200).json(expense);
  });

  router.delete('/:id', (req, res) => {
    const index = expenses.findIndex(e => e.id === parseInt(req.params.id));

    if (index === -1) {
      return res.status(404).send();
    }
    expenses.splice(index, 1);
    res.status(204).send();
  });

  return router;
};

module.exports = expenseRoutes;
