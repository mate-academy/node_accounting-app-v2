/* eslint-disable function-paren-newline */
'use strict';

const express = require('express');

function createServer() {
  const app = express();

  app.use(express.json());

  const users = [];
  const expenses = [];
  let userIdCounter = 1;
  let expenseIdCounter = 1;

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Missing required parameters' });
    }

    const newUser = { id: userIdCounter++, name };

    users.push(newUser);

    res.status(201).json(newUser);
  });

  app.get('/users', (req, res) => {
    res.status(200).json(users);
  });

  app.get('/users/:id', (req, res) => {
    const user = users.find((u) => u.id === parseInt(req.params.id));

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  });

  app.patch('/users/:id', (req, res) => {
    const { name } = req.body;
    const user = users.find((u) => u.id === parseInt(req.params.id));

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!name) {
      return res.status(400).json({ message: 'Missing required parameters' });
    }

    user.name = name;
    res.status(200).json(user);
  });

  app.delete('/users/:id', (req, res) => {
    const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));

    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }

    users.splice(userIndex, 1);
    res.status(204).send();
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId || !spentAt || !title || !amount || !category) {
      return res.status(400).json({ message: 'Missing required parameters' });
    }

    const user = users.find((u) => u.id === userId);

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const newExpense = {
      id: expenseIdCounter++,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(newExpense);
    res.status(201).json(newExpense);
  });

  app.get('/expenses', (req, res) => {
    const { userId, categories, from, to } = req.query;

    let filteredExpenses = expenses;

    if (userId) {
      filteredExpenses = filteredExpenses.filter(
        (e) => e.userId === parseInt(userId),
      );
    }

    if (categories) {
      const categoriesArray = Array.isArray(categories)
        ? categories
        : [categories];

      filteredExpenses = filteredExpenses.filter((e) =>
        categoriesArray.includes(e.category),
      );
    }

    if (from) {
      filteredExpenses = filteredExpenses.filter(
        (e) => new Date(e.spentAt) >= new Date(from),
      );
    }

    if (to) {
      filteredExpenses = filteredExpenses.filter(
        (e) => new Date(e.spentAt) <= new Date(to),
      );
    }

    res.status(200).json(filteredExpenses);
  });

  app.get('/expenses/:id', (req, res) => {
    const expense = expenses.find((e) => e.id === parseInt(req.params.id));

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.status(200).json(expense);
  });

  app.patch('/expenses/:id', (req, res) => {
    const { spentAt, title, amount, category, note } = req.body;
    const expense = expenses.find((e) => e.id === parseInt(req.params.id));

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

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

  app.delete('/expenses/:id', (req, res) => {
    const expenseIndex = expenses.findIndex(
      (e) => e.id === parseInt(req.params.id),
    );

    if (expenseIndex === -1) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    expenses.splice(expenseIndex, 1);
    res.status(204).send();
  });

  app.use((req, res) => {
    res.status(404).json({ message: 'Endpoint not found' });
  });

  return app;
}

module.exports = {
  createServer,
};
