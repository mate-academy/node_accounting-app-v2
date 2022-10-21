'use strict';

const express = require('express');
const cors = require('cors');

function createServer() {
  const app = express();

  app.use(cors());

  /* users */

  let users = [];

  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const newUser = {
      id: users.length ? [...users.sort((a, b) => b.id - a.id)][0].id + 1 : 1,
      name,
    };

    users.push(newUser);

    res.statusCode = 201;
    res.send(newUser);
  });

  app.get('/users/:userId', express.json(), (req, res) => {
    const { userId } = req.params;
    const foundUser = users.find(user => user.id === +userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.send(foundUser);
  });

  app.delete('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const filteredUsers = users.filter(user => user.id !== +userId);

    if (filteredUsers.length === users.length) {
      res.sendStatus(404);

      return;
    }

    users = filteredUsers;
    res.statusCode = 204;
    res.send(users);
  });

  app.patch('/users/:userId', express.json(), (req, res) => {
    const { userId } = req.params;
    const foundUser = users.find(user => user.id === +userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    Object.assign(foundUser, req.body);

    res.send(foundUser);
  });

  /* expenses */

  let expenses = [];

  app.get('/expenses', (req, res) => {
    const { from, to, category, userId } = req.query;
    const user = users.find(us => us.id === +userId);

    if (user) {
      let filterExpenses = expenses
        .filter(expense => expense.userId === +userId);

      if (category) {
        filterExpenses = filterExpenses
          .filter(expense => expense.category === category);
      }

      expenses = filterExpenses;
    }

    if (from && to) {
      const filterExpenses = expenses
        .filter(expense => expense.spentAt > from && expense.spentAt < to);

      expenses = filterExpenses;
    }

    res.send(expenses);
  });

  app.post('/expenses', express.json(), (req, res) => {
    const { title, amount, category, note, userId, spentAt } = req.body;
    const user = users.find(us => us.id === +userId);

    if (!user || !title) {
      res.sendStatus(400);

      return;
    }

    const newExpense = {
      title,
      amount,
      category,
      note,
      userId,
      id: expenses.length
        ? [...expenses.sort((a, b) => b.id - a.id)][0].id + 1
        : 1,
      spentAt,
    };

    expenses.push(newExpense);

    res.statusCode = 201;
    res.send(newExpense);
  });

  app.get('/expenses/:expensesId', express.json(), (req, res) => {
    const { expensesId } = req.params;
    const foundExpense = expenses
      .find(expense => expense.userId === +expensesId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;
    res.send(foundExpense);
  });

  app.delete('/expenses/:expensesId', (req, res) => {
    const { expensesId } = req.params;
    const filterExpenses = expenses
      .filter(expense => expense.id !== +expensesId);

    if (filterExpenses.length === expenses.length) {
      res.sendStatus(404);

      return;
    }

    expenses = filterExpenses;
    res.statusCode = 204;
    res.send(expenses);
  });

  app.patch('/expenses/:expensesId', express.json(), (req, res) => {
    const { expensesId } = req.params;
    const foundExpense = expenses.find(expense => expense.id === +expensesId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    Object.assign(foundExpense, req.body);

    res.send(foundExpense);
  });

  return app;
}

module.exports = {
  createServer,
};
