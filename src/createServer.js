'use strict';

const express = require('express');

function createServer() {
  const app = express();

  let nextUserId = 1;
  let nextExpenseId = 1;
  let users = [];
  let expenses = [];

  app.use(express.json());
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)

  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (typeof name !== 'string') {
      res.sendStatus(400);

      return;
    }

    const user = {
      id: nextUserId++,
      name,
    };

    users.push(user);

    return res.status(201).send(user);
  });

  app.get('/users/:id', (req, res) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      res.sendStatus(400);

      return;
    }

    const user = users.find((item) => item.id === Number(id));

    if (!user) {
      res.sendStatus(404);

      return;
    }
    res.send(user);
  });

  app.patch('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const { name } = req.body;

    if (Number.isNaN(id)) {
      return res.sendStatus(400);
    }

    const user = users.find((item) => item.id === Number(id));

    if (!user) {
      res.sendStatus(404);

      return;
    }

    if (typeof name !== 'string') {
      res.sendStatus(400);

      return;
    }

    Object.assign(user, { name });

    res.send(user);
  });

  app.delete('/users/:id', (req, res) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      res.sendStatus(400);

      return;
    }

    const newUsers = users.filter((item) => item.id !== id);

    if (newUsers.length === users.length) {
      res.sendStatus(404);

      return;
    }

    users = newUsers;
    res.sendStatus(204);
  });

  app.get('/expenses', (req, res) => {
    const { userId, categories, from, to } = req.query;

    let filteredExpenses = [...expenses];

    if (userId !== undefined) {
      const parsedUserId = Number(userId);

      if (Number.isNaN(parsedUserId)) {
        res.sendStatus(400);

        return;
      }

      filteredExpenses = filteredExpenses.filter(
        (expense) => expense.userId === parsedUserId,
      );
    }

    if (categories !== undefined) {
      const categoriesArray = Array.isArray(categories)
        ? categories
        : [categories];

      filteredExpenses = filteredExpenses.filter((expense) => {
        return categoriesArray.includes(expense.category);
      });
    }

    if (from !== undefined) {
      const fromDate = new Date(from);

      if (Number.isNaN(fromDate.getTime())) {
        res.sendStatus(400);

        return;
      }

      filteredExpenses = filteredExpenses.filter(
        (expense) => new Date(expense.spentAt) >= fromDate,
      );
    }

    if (to !== undefined) {
      const toDate = new Date(to);

      if (Number.isNaN(toDate.getTime())) {
        res.sendStatus(400);

        return;
      }

      filteredExpenses = filteredExpenses.filter(
        (expense) => new Date(expense.spentAt) <= toDate,
      );
    }

    res.send(filteredExpenses);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (
      userId === undefined ||
      typeof spentAt !== 'string' ||
      typeof title !== 'string' ||
      amount === undefined ||
      typeof category !== 'string'
    ) {
      res.sendStatus(400);

      return;
    }

    const userExists = users.some((user) => user.id === userId);

    if (!userExists) {
      res.sendStatus(400);

      return;
    }

    const expense = {
      id: nextExpenseId++,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(expense);

    return res.status(201).send(expense);
  });

  app.get('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      res.sendStatus(400);

      return;
    }

    const expense = expenses.find((item) => item.id === id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }
    res.send(expense);
  });

  app.patch('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);
    const { spentAt, title, amount, category, note } = req.body;

    if (Number.isNaN(id)) {
      res.sendStatus(400);

      return;
    }

    const expense = expenses.find((item) => item.id === id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    const hasNoFields =
      spentAt === undefined &&
      title === undefined &&
      amount === undefined &&
      category === undefined &&
      note === undefined;

    if (hasNoFields) {
      res.sendStatus(400);

      return;
    }

    if (spentAt !== undefined && typeof spentAt !== 'string') {
      res.sendStatus(400);

      return;
    }

    if (title !== undefined && typeof title !== 'string') {
      res.sendStatus(400);

      return;
    }

    if (amount !== undefined && typeof amount !== 'number') {
      res.sendStatus(400);

      return;
    }

    if (category !== undefined && typeof category !== 'string') {
      res.sendStatus(400);

      return;
    }

    if (note !== undefined && note !== null && typeof note !== 'string') {
      res.sendStatus(400);

      return;
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

    res.send(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      res.sendStatus(400);

      return;
    }

    const newExpenses = expenses.filter((item) => item.id !== id);

    if (newExpenses.length === expenses.length) {
      res.sendStatus(404);

      return;
    }

    expenses = newExpenses;
    res.sendStatus(204);
  });

  return app;
}

module.exports = {
  createServer,
};
