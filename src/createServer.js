'use strict';

const express = require('express');

function createServer() {
  const app = express();

  let expenses = [];
  let expenseMaxId = 1;

  let users = [];
  let usersMaxId = 1;

  app.get('/users', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.send(users || []);
  });

  app.get('/users/:userId', express.json(), (req, res) => {
    const { userId } = req.params;
    const foundUser = users.find((user) => user.id === Number(userId));

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.send(foundUser);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const newUser = {
      id: usersMaxId,
      name,
    };

    users.push(newUser);
    usersMaxId++;

    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 201;
    res.send(newUser);
  });

  app.patch('/users/:userId', express.json(), (req, res) => {
    const { userId } = req.params;
    const foundUser = users.find((user) => user.id === Number(userId));

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    const { name } = req.body;

    if (typeof name !== 'string') {
      res.sendStatus(422);

      return;
    }

    Object.assign(foundUser, { name });

    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.send(foundUser);
  });

  app.delete('/users/:userId', express.json(), (req, res) => {
    const { userId } = req.params;
    const foundUser = users.find((user) => user.id === Number(userId));

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    users = users.filter((user) => user.id !== Number(userId));

    res.sendStatus(204);
  });

  app.get('/expenses', express.json(), (req, res) => {
    let foundedExpenses = expenses;

    if (req.query.from && req.query.to) {
      const { from, to } = req.query;

      foundedExpenses = expenses
        .filter((expense) => expense.spentAt < from || expense.spentAt < to);
    } else if (req.query.categories) {
      const { userId, categories } = req.query;

      foundedExpenses = expenses
        .filter((expense) => (
          (expense.category === categories)
          && (expense.userId === Number(userId))
        ));
    } else if (req.query.userId) {
      const { userId } = req.query;

      foundedExpenses = expenses
        .filter(expense => expense.userId === Number(userId));
    }

    res.send(foundedExpenses);
  });

  app.post('/expenses', express.json(), (req, res) => {
    const expense = req.body;

    if (
      // eslint-disable-next-line operator-linebreak
      !Object.keys(expense).length ||
      !users.find((user) => user.id === expense.userId)
    ) {
      res.sendStatus(400);

      return;
    }

    const { userId, spentAt, title, amount, category, note } = expense;

    const newExpense = {
      id: expenseMaxId,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(newExpense);

    expenseMaxId++;

    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 201;
    res.send(newExpense);
  });

  app.get('/expenses/:expenseId', express.json(), (req, res) => {
    const { expenseId } = req.params;

    const foundedExpense = expenses
      .find(expense => expense.id === Number(expenseId));

    if (!foundedExpense) {
      res.sendStatus(404);

      return;
    }

    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.send(foundedExpense);
  });

  app.patch('/expenses/:expenseId', express.json(), (req, res) => {
    const { expenseId } = req.params;

    const foundExpense = expenses
      .find((expense) => expense.id === Number(expenseId));

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    const newData = req.body;

    Object.assign(foundExpense, newData);

    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.send(foundExpense);
  });

  app.delete('/expenses/:expenseId', express.json(), (req, res) => {
    const { expenseId } = req.params;
    const foundExpenses = expenses
      .find((expense) => expense.id === Number(expenseId));

    if (!foundExpenses) {
      res.sendStatus(404);

      return;
    }

    expenses = expenses
      .filter((expense) => expense.id !== Number(expenseId));

    res.sendStatus(204);
  });

  return app;
}

module.exports = { createServer };
