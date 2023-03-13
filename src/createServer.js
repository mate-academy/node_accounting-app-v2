'use strict';

const express = require('express');
const cors = require('cors');
// const { v4: uuidv4 } = require('uuid');

function createServer() {
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)
  const app = express();

  let users = [];

  app.use(cors());

  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.get('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const foundUser = users.find(user => user.id === +userId);

    if (!isFinite(+userId)) {
      res.sendStatus(400);

      return;
    }

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.send(foundUser);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const maxId = Math.max(...users.map(user => user.id), 0);
    const newUser = {
      id: maxId + 1,
      name,
    };

    users.push(newUser);
    res.status(201);
    res.send(newUser);
  });

  app.delete('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const filteredUser = users.filter(user => user.id !== +userId);

    if (filteredUser.length === users.length) {
      res.sendStatus(404);

      return;
    }
    users = filteredUser;
    res.sendStatus(204);
  });

  app.patch('/users/:userId', express.json(), (req, res) => {
    const { userId } = req.params;

    if (!isFinite(+userId)) {
      res.sendStatus(400);

      return;
    }

    const foundUser = users.find(user => user.id === +userId);
    const { name } = req.body;

    if (typeof name !== 'string') {
      res.sendStatus(404);

      return;
    }
    Object.assign(foundUser, { name });
    res.send(foundUser);
  });

  let expenses = [];

  const getExpenses = (filterBy) => {
    const { userId, category, from, to } = filterBy;

    let filteredExpenses = expenses;

    if (userId) {
      filteredExpenses = expenses.filter(expense => expense.userId === +userId);
    }

    if (category) {
      filteredExpenses = expenses.filter(expense => (
        expense.category === category
      ));
    }

    if (from) {
      filteredExpenses = expenses.filter(expense => (
        expense.spentAt >= from
      ));
    }

    if (to) {
      filteredExpenses = expenses.filter(expense => (
        expense.spentAt <= to
      ));
    }

    return filteredExpenses;
  };

  app.get('/expenses', (req, res) => {
    const filterParams = req.query;

    res.send(getExpenses(filterParams));
  });

  app.get('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;

    if (!isFinite(+expenseId)) {
      res.sendStatus(400);

      return;
    }

    const findExpenses = expenses.find(expense => (
      expense.id === +expenseId
    ));

    if (!findExpenses) {
      res.sendStatus(404);

      return;
    }

    res.send(findExpenses);
  });

  app.post('/expenses', express.json(), (req, res) => {
    const {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    } = req.body;

    const isUser = users.some(user => user.id === +userId);

    if (!title || !isUser) {
      res.sendStatus(400);

      return;
    }

    const maxId = Math.max(...expenses.map(expense => expense.id), 0);
    const newExpenses = {
      id: maxId + 1,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(newExpenses);
    res.status(201);
    res.send(newExpenses);
  });

  app.delete('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const filteredExpenses = expenses.filter(expense => (
      expense.id !== +expenseId
    ));

    if (filteredExpenses.length === expenses.length) {
      res.sendStatus(404);

      return;
    }
    expenses = filteredExpenses;
    res.sendStatus(204);
  });

  app.patch('/expenses/:expenseId', express.json(), (req, res) => {
    const { expenseId } = req.params;

    if (!isFinite(+expenseId)) {
      res.sendStatus(400);

      return;
    }

    const findExpenses = expenses.find(expense => expense.id === +expenseId);

    if (!findExpenses) {
      res.sendStatus(404);

      return;
    }
    Object.assign(findExpenses, { ...req.body });
    res.send(findExpenses);
  });

  return app;
}

module.exports = {
  createServer,
};
