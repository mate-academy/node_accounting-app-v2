'use strict';

const express = require('express');

function createServer() {
  const app = express();
  let countUserId = 1;
  let countExtendseId = 1;
  let users = [];
  let expenses = [];

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const newUser = {
      id: countUserId++,
      name,
    };

    users.push(newUser);
    res.statusCode = 201;
    res.send(newUser);
  });

  app.get('/users', express.json(), (req, res) => {
    res.statusCode = 200;
    res.send(users);
  });

  app.get('/users/:userId', express.json(), (req, res) => {
    const { userId } = req.params;
    const foundUser = users.find(user => user.id === +userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }
    res.statusCode = 200;
    res.send(foundUser);
  });

  app.patch('/users/:userId', express.json(), (req, res) => {
    const { userId } = req.params;
    const { name } = req.body;
    const foundUser = users.find(user => user.id === +userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }
    Object.assign(foundUser, { name });

    res.statusCode = 200;
    res.send(foundUser);
  });

  app.delete('/users/:userId', express.json(), (req, res) => {
    const { userId } = req.params;
    const filterUser = users.filter(user => (user.id !== +userId));

    if (users.length === filterUser.length) {
      res.sendStatus(404);

      return;
    }

    users = filterUser;
    res.sendStatus(204);
  });

  app.post('/expenses', express.json(), (req, res) => {
    const { spentAt, userId, title, amount, category, note } = req.body;
    const findUser = users.some(user => user.id === +userId);

    if (!findUser) {
      res.sendStatus(400);

      return;
    }

    const newExpense = {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    Object.assign(newExpense, { id: countExtendseId++ });
    expenses.push(newExpense);
    res.statusCode = 201;
    res.send(newExpense);
  });

  app.get('/expenses', express.json(), (req, res) => {
    const {
      userId,
      category,
      from,
      to,
    } = req.query;

    const foundUser = users.some(user =>
      user.id === +userId
    );

    if (foundUser) {
      let filterExpenses = expenses.filter(expense =>
        expense.userId === +userId
      );

      if (category) {
        filterExpenses = filterExpenses.filter(expense =>
          expense.category === category
        );
      }
      res.statusCode = 200;
      res.send(filterExpenses);

      return;
    }

    if (from && to) {
      const filterExpenses = expenses.filter(expense =>
        expense.spentAt >= from && expense.spentAt <= to);

      res.statusCode = 200;
      res.send(filterExpenses);

      return;
    }

    res.statusCode = 200;
    res.send(expenses);
  });

  app.get('/expenses/:expensId', express.json(), (req, res) => {
    const { expensId } = req.params;
    const foundUser = expenses.find(expens => expens.id === +expensId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }
    res.statusCode = 200;
    res.send(foundUser);
  });

  app.delete('/expenses/:expensId', express.json(), (req, res) => {
    const { expensId } = req.params;
    const foundExpens = expenses.find(expens => expens.id === +expensId);
    const filterExpens = expenses.filter(expens => expens.id !== +expensId);

    if (!foundExpens) {
      res.sendStatus(404);

      return;
    }

    expenses = filterExpens;
    res.sendStatus(204);
  });

  app.patch('/expenses/:expensId', express.json(), (req, res) => {
    const { expensId } = req.params;
    const { title } = req.body;
    const foundExpens = expenses
      .find(expens => expens.userId === +expensId);

    if (!foundExpens) {
      res.sendStatus(404);

      return;
    }

    Object.assign(foundExpens, { title });

    res.statusCode = 200;
    res.send(foundExpens);
  });

  return app;
}

module.exports = {
  createServer,
};
