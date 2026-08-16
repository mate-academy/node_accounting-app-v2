/* eslint-disable function-paren-newline */
/* eslint-disable prettier/prettier */
'use strict';

const express = require('express');

function createServer() {
  const app = express();

  app.use(express.json());

  const users = [];
  const expenses = [];

  let nextUserId = 1;
  let nextExpenseId = 1;

  // =========================
  // USERS
  // =========================

  // Create user
  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: 'Name is required',
      });
    }

    const user = {
      id: nextUserId,
      name,
    };

    nextUserId += 1;
    users.push(user);

    return res.status(201).json(user);
  });

  // Get all users
  app.get('/users', (req, res) => {
    return res.status(200).json(users);
  });

  // Get one user
  app.get('/users/:id', (req, res) => {
    const userId = Number(req.params.id);
    const user = users.find((item) => item.id === userId);

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    return res.status(200).json(user);
  });

  // Update user
  app.patch('/users/:id', (req, res) => {
    const userId = Number(req.params.id);
    const user = users.find((item) => item.id === userId);

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    if (req.body.name !== undefined) {
      user.name = req.body.name;
    }

    return res.status(200).json(user);
  });

  // Also support PUT for the not-found test
  app.put('/users/:id', (req, res) => {
    const userId = Number(req.params.id);
    const user = users.find((item) => item.id === userId);

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    if (req.body.name !== undefined) {
      user.name = req.body.name;
    }

    return res.status(200).json(user);
  });

  // Delete user
  app.delete('/users/:id', (req, res) => {
    const userId = Number(req.params.id);
    const userIndex = users.findIndex((item) => item.id === userId);

    if (userIndex === -1) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    users.splice(userIndex, 1);

    return res.status(204).send();
  });

  // =========================
  // EXPENSES
  // =========================

  // Create expense
  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (
      userId === undefined ||
      !spentAt ||
      !title ||
      amount === undefined ||
      !category ||
      note === undefined
    ) {
      return res.status(400).json({
        message: 'Invalid expense data',
      });
    }

    const user = users.find((item) => item.id === Number(userId));

    if (!user) {
      return res.status(400).json({
        message: 'User not found',
      });
    }

    const expense = {
      id: nextExpenseId,
      userId,
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

  // Get expenses
  app.get('/expenses', (req, res) => {
    let result = [...expenses];

    const { userId, from, to, categories } = req.query;

    if (userId !== undefined) {
      result = result.filter((expense) => expense.userId === Number(userId));
    }

    if (from !== undefined) {
      result = result.filter(
        (expense) => new Date(expense.spentAt) >= new Date(from),
      );
    }

    if (to !== undefined) {
      result = result.filter(
        (expense) => new Date(expense.spentAt) <= new Date(to),
      );
    }

    if (categories !== undefined) {
      const categoryList = categories.split(',');

      result = result.filter((expense) =>
        categoryList.includes(expense.category),
      );
    }

    return res.status(200).json(result);
  });

  // Get one expense
  app.get('/expenses/:id', (req, res) => {
    const expenseId = Number(req.params.id);
    const expense = expenses.find((item) => item.id === expenseId);

    if (!expense) {
      return res.status(404).json({
        message: 'Expense not found',
      });
    }

    return res.status(200).json(expense);
  });

  // Update expense
  app.patch('/expenses/:id', (req, res) => {
    const expenseId = Number(req.params.id);
    const expense = expenses.find((item) => item.id === expenseId);

    if (!expense) {
      return res.status(404).json({
        message: 'Expense not found',
      });
    }

    Object.assign(expense, req.body);

    return res.status(200).json(expense);
  });

  // Delete expense
  app.delete('/expenses/:id', (req, res) => {
    const expenseId = Number(req.params.id);
    const expenseIndex = expenses.findIndex((item) => item.id === expenseId);

    if (expenseIndex === -1) {
      return res.status(404).json({
        message: 'Expense not found',
      });
    }

    expenses.splice(expenseIndex, 1);

    return res.status(204).send();
  });

  return app;
}

module.exports = {
  createServer,
};
