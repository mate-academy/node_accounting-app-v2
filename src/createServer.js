'use strict';

const express = require('express');

function createServer() {
  const app = express();

  app.use(express.json());

  const users = [];
  const expenses = [];
  let nextUserId = 1;
  let nextExpenseId = 1;

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.sendStatus(400);
    }

    const user = { id: nextUserId++, name };

    users.push(user);

    return res.status(201).json(user);
  });

  app.get('/users', (req, res) => {
    return res.json(users);
  });

  app.get('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((currentUser) => currentUser.id === id);

    if (!user) {
      return res.sendStatus(404);
    }

    return res.json(user);
  });

  app.patch('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((currentUser) => currentUser.id === id);

    if (!user) {
      return res.sendStatus(404);
    }

    if (!req.body.name) {
      return res.sendStatus(400);
    }

    user.name = req.body.name;

    return res.json(user);
  });

  app.put('/users/:id', (req, res) => {
    return res.sendStatus(404);
  });

  app.delete('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const userIndex = users.findIndex((currentUser) => currentUser.id === id);

    if (userIndex === -1) {
      return res.sendStatus(404);
    }

    users.splice(userIndex, 1);

    return res.sendStatus(204);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId || !spentAt || !title || !amount || !category) {
      return res.sendStatus(400);
    }

    const user = users.find((currentUser) => currentUser.id === userId);

    if (!user) {
      return res.sendStatus(400);
    }

    const expense = {
      id: nextExpenseId++,
      userId,
      spentAt,
      title,
      amount,
      category,
      note: note || '',
    };

    expenses.push(expense);

    return res.status(201).json(expense);
  });

  app.get('/expenses', (req, res) => {
    const { userId, from, to, categories } = req.query;

    let filteredExpenses = [...expenses];

    if (userId) {
      filteredExpenses = filteredExpenses.filter(
        (expense) => expense.userId === Number(userId),
      );
    }

    if (from) {
      filteredExpenses = filteredExpenses.filter(
        (expense) => new Date(expense.spentAt) >= new Date(from),
      );
    }

    if (to) {
      filteredExpenses = filteredExpenses.filter(
        (expense) => new Date(expense.spentAt) <= new Date(to),
      );
    }

    if (categories) {
      const categoriesList = categories.split(',');

      const isExpenseInCategory = (expense) =>
        categoriesList.includes(expense.category);

      filteredExpenses = filteredExpenses.filter(isExpenseInCategory);
    }

    return res.json(filteredExpenses);
  });

  app.get('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);
    const expense = expenses.find((currentExpense) => currentExpense.id === id);

    if (!expense) {
      return res.sendStatus(404);
    }

    return res.json(expense);
  });

  app.patch('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);
    const expense = expenses.find((currentExpense) => currentExpense.id === id);

    if (!expense) {
      return res.sendStatus(404);
    }

    Object.assign(expense, req.body);

    return res.json(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);
    const expenseIndex = expenses.findIndex(
      (currentExpense) => currentExpense.id === id,
    );

    if (expenseIndex === -1) {
      return res.sendStatus(404);
    }

    expenses.splice(expenseIndex, 1);

    return res.sendStatus(204);
  });

  return app;
}

module.exports = {
  createServer,
};
