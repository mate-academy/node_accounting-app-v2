'use strict';

const express = require('express');

function createServer() {
  let users = [];
  let expenses = [];
  let nextUserId = 1;
  let nextExpenseId = 1;

  const app = express();

  app.get('/users', (req, res) => {
    return res.json(users);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send('User name is required');
    }

    const newUser = {
      id: nextUserId,
      name,
    };

    nextUserId += 1;

    users.push(newUser);

    return res.status(201).json(newUser);
  });

  app.get('/users/:userId', (req, res) => {
    const userId = parseInt(req.params.userId, 10);

    if (isNaN(userId)) {
      return res.status(400).send('Invalid user ID');
    }

    const user = users.find((u) => u.id === userId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    return res.json(user);
  });

  app.delete('/users/:userId', (req, res) => {
    const userId = parseInt(req.params.userId, 10);

    if (isNaN(userId)) {
      return res.status(400).send('Invalid user ID');
    }

    const user = users.find((u) => u.id === userId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    users = users.filter((u) => u.id !== userId);

    return res.sendStatus(204);
  });

  app.patch('/users/:userId', express.json(), (req, res) => {
    const userId = parseInt(req.params.userId, 10);

    if (isNaN(userId)) {
      return res.status(400).send('Invalid user ID');
    }

    const user = users.find((u) => u.id === userId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    const { name } = req.body;

    if (name !== undefined) {
      user.name = name;
    }

    return res.json(user);
  });

  // Expenses endpoints

  app.get('/expenses', (req, res) => {
    const { userId, categories, from, to } = req.query;
    let filteredExp = expenses;
    const catArr = [];

    if (userId) {
      const uid = parseInt(userId, 10);

      if (isNaN(uid)) {
        return res.status(400).send('Invalid user ID');
      }

      filteredExp = filteredExp.filter((e) => e.userId === uid);
    }

    if (typeof categories === 'string') {
      catArr.push(categories);
    }

    if (Array.isArray(categories)) {
      catArr.push(...categories);
    }

    if (catArr.length > 0) {
      filteredExp = filteredExp.filter((e) => catArr.includes(e.category));
    }

    if (from) {
      const fromDate = new Date(from);

      if (isNaN(fromDate.getTime())) {
        return res.status(400).send('Invalid from date');
      }

      filteredExp = filteredExp.filter((e) => new Date(e.spentAt) >= fromDate);
    }

    if (to) {
      const toDate = new Date(to);

      if (isNaN(toDate.getTime())) {
        return res.status(400).send('Invalid to date');
      }

      filteredExp = filteredExp.filter((e) => new Date(e.spentAt) <= toDate);
    }

    return res.json(filteredExp);
  });

  app.post('/expenses', express.json(), (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId || !spentAt || !title || !amount || !category) {
      return res.status(400).send('Missing required expense fields');
    }

    const userExists = users.some((user) => user.id === userId);

    if (!userExists) {
      return res.status(400).send('User does not exist');
    }

    const newExpense = {
      id: nextExpenseId,
      userId,
      spentAt,
      title,
      amount,
      category,
      note: note || undefined,
    };

    nextExpenseId += 1;

    expenses.push(newExpense);

    return res.status(201).json(newExpense);
  });

  app.get('/expenses/:expenseId', (req, res) => {
    const expenseId = parseInt(req.params.expenseId, 10);

    if (isNaN(expenseId)) {
      return res.status(400).send('Invalid expense ID');
    }

    const expense = expenses.find((e) => e.id === expenseId);

    if (!expense) {
      return res.status(404).send('Expense not found');
    }

    return res.json(expense);
  });

  app.patch('/expenses/:expenseId', express.json(), (req, res) => {
    const expenseId = parseInt(req.params.expenseId, 10);

    if (isNaN(expenseId)) {
      return res.status(400).send('Invalid expense ID');
    }

    const expense = expenses.find((e) => e.id === expenseId);

    if (!expense) {
      return res.status(404).send('Expense not found');
    }

    const { userId, spentAt, title, amount, category, note } = req.body;

    if (userId !== undefined) {
      const userExists = users.some((user) => user.id === userId);

      if (!userExists) {
        return res.status(400).send('User does not exist');
      }

      expense.userId = userId;
    }

    if (spentAt !== undefined) {
      expense.spentAt = spentAt;
    }

    if (title !== undefined) {
      expense.title = title;
    }

    if (amount !== undefined) {
      expense.amount = amount;
    }

    if (category !== undefined) {
      expense.category = category;
    }

    if (note !== undefined) {
      expense.note = note;
    }

    return res.json(expense);
  });

  app.delete('/expenses/:expenseId', (req, res) => {
    const expenseId = parseInt(req.params.expenseId, 10);

    if (isNaN(expenseId)) {
      return res.status(400).send('Invalid expense ID');
    }

    const expense = expenses.find((e) => e.id === expenseId);

    if (!expense) {
      return res.status(404).send('Expense not found');
    }

    expenses = expenses.filter((e) => e.id !== expenseId);

    return res.sendStatus(204);
  });

  return app;
}

module.exports = {
  createServer,
};
