'use strict';

const express = require('express');

function createServer() {
  const app = express();
  const users = [];
  const expenses = [];
  let nextUserId = 1;
  let nextExpenseId = 1;

  app.use(express.json());

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (typeof name !== 'string' || name.trim() === '') {
      return res.status(400).send('Name is required');
    }

    const user = {
      id: nextUserId,
      name,
    };

    nextUserId += 1;
    users.push(user);

    return res.status(201).json(user);
  });

  app.get('/users', (req, res) => {
    res.status(200).json(users);
  });

  app.get('/users/:userId', (req, res) => {
    const user = users.find(({ id }) => id === Number(req.params.userId));

    if (!user) {
      return res.status(404).send('User not found');
    }

    return res.status(200).json(user);
  });

  app.patch('/users/:userId', (req, res) => {
    const user = users.find(({ id }) => id === Number(req.params.userId));

    if (!user) {
      return res.status(404).send('User not found');
    }

    const { name } = req.body;

    if (typeof name !== 'string' || name.trim() === '') {
      return res.status(400).send('Name is required');
    }

    user.name = name;

    return res.status(200).json(user);
  });

  app.delete('/users/:userId', (req, res) => {
    const userIndex = users.findIndex(
      ({ id }) => id === Number(req.params.userId),
    );

    if (userIndex === -1) {
      return res.status(404).send('User not found');
    }

    users.splice(userIndex, 1);

    return res.status(204).send();
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (
      userId === undefined ||
      spentAt === undefined ||
      title === undefined ||
      amount === undefined ||
      category === undefined ||
      note === undefined
    ) {
      return res.status(400).send('Required fields are missing');
    }

    const user = users.find(({ id }) => id === Number(userId));

    if (!user) {
      return res.status(400).send('User not found');
    }

    const expense = {
      id: nextExpenseId,
      userId: Number(userId),
      spentAt,
      title,
      amount,
      category,
      note,
    };

    nextExpenseId += 1;
    expenses.push(expense);

    return res.status(201).json(expense);
  });

  app.get('/expenses', (req, res) => {
    const { userId, from, to, categories } = req.query;
    const categoryFilters = Array.isArray(categories)
      ? categories
      : categories
        ? categories.split(',')
        : [];

    const filteredExpenses = expenses.filter((expense) => {
      const matchesUserId = !userId || expense.userId === Number(userId);
      const matchesFrom = !from || new Date(expense.spentAt) >= new Date(from);
      const matchesTo = !to || new Date(expense.spentAt) <= new Date(to);
      const matchesCategories =
        categoryFilters.length === 0 ||
        categoryFilters.includes(expense.category);

      return matchesUserId && matchesFrom && matchesTo && matchesCategories;
    });

    return res.status(200).json(filteredExpenses);
  });

  app.get('/expenses/:expenseId', (req, res) => {
    const expense = expenses.find(
      ({ id }) => id === Number(req.params.expenseId),
    );

    if (!expense) {
      return res.status(404).send('Expense not found');
    }

    return res.status(200).json(expense);
  });

  app.patch('/expenses/:expenseId', (req, res) => {
    const expense = expenses.find(
      ({ id }) => id === Number(req.params.expenseId),
    );

    if (!expense) {
      return res.status(404).send('Expense not found');
    }

    if (req.body.userId !== undefined) {
      const user = users.find(({ id }) => id === Number(req.body.userId));

      if (!user) {
        return res.status(400).send('User not found');
      }

      expense.userId = Number(req.body.userId);
    }

    if (req.body.spentAt !== undefined) {
      expense.spentAt = req.body.spentAt;
    }

    if (req.body.title !== undefined) {
      expense.title = req.body.title;
    }

    if (req.body.amount !== undefined) {
      expense.amount = req.body.amount;
    }

    if (req.body.category !== undefined) {
      expense.category = req.body.category;
    }

    if (req.body.note !== undefined) {
      expense.note = req.body.note;
    }

    return res.status(200).json(expense);
  });

  app.delete('/expenses/:expenseId', (req, res) => {
    const expenseIndex = expenses.findIndex(
      ({ id }) => id === Number(req.params.expenseId),
    );

    if (expenseIndex === -1) {
      return res.status(404).send('Expense not found');
    }

    expenses.splice(expenseIndex, 1);

    return res.status(204).send();
  });

  return app;
}

module.exports = {
  createServer,
};
