'use strict';

const express = require('express');
const cors = require('cors');
const usersRouter = require('./routes/users.route.js');
const usersService = require('./services/users.service.js');

function createServer() {
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)

  const app = express();

  let expenses = [];

  app.use(cors());
  app.use('/users', express.json(), usersRouter);

  app.get('/expenses', express.json(), (req, res) => {
    const { userId, categories, from, to } = req.query;

    let result = [...expenses];

    if (userId) {
      result = result.filter((expense) => expense.userId === +userId);
    }

    if (categories) {
      result = result.filter(
        (expense) =>
          expense.category.toLowerCase() === categories.toLowerCase(),
      );
    }

    if (from || to) {
      result = result.filter((expense) => {
        const expenseDate = new Date(expense.spentAt);

        if (from && expenseDate < new Date(from)) {
          return false;
        }

        if (to && expenseDate > new Date(to)) {
          return false;
        }

        return true;
      });
    }

    res.send(result);
  });

  app.post('/expenses', express.json(), (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId || !usersService.getUserById(userId)) {
      res.statusCode = 400;
      res.send('Bad request');

      return;
    }

    if (!spentAt || !title || !amount || !category || !note) {
      res.statusCode = 400;
      res.send('Bad request');

      return;
    }

    const expense = {
      id: expenses.length + 1,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(expense);

    res.statusCode = 201;

    res.send(expense);
  });

  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;

    if (isNaN(Number(id))) {
      res.statusCode = 400;
      res.send('Bad request');

      return;
    }

    const expense = expenses.find((e) => e.id === +id);

    if (!expense) {
      res.statusCode = 404;
      res.send('Not found');

      return;
    }

    res.send(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;

    if (isNaN(Number(id))) {
      res.statusCode = 400;
      res.send('Bad request');

      return;
    }

    const expense = expenses.find((e) => e.id === +id);

    if (!expense) {
      res.statusCode = 404;
      res.send('Not found');

      return;
    }

    expenses = expenses.filter((e) => e.id !== +id);

    res.sendStatus(204);
  });

  app.patch('/expenses/:id', express.json(), (req, res) => {
    const { id } = req.params;

    if (isNaN(Number(id))) {
      res.statusCode = 400;
      res.send('Bad request');

      return;
    }

    const { spentAt, title, amount, category, note } = req.body;

    const expense = expenses.find((e) => e.id === +id);

    if (!expense) {
      res.statusCode = 404;
      res.send('Not found');

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

  return app;
}

module.exports = {
  createServer,
};
