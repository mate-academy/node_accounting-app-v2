'use strict';

const express = require('express');

function createServer() {
  const app = express();

  // let users = [{
  //   id: 1,
  //   name: 'pastich',
  // }];

  let users = [];

  // const expenses = [{
  //   userId: 1, category: 'pasta',
  // }, {
  //   userId: 100, category: 'oldich',
  // }];

  let expenses = [];

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    const user = {
      id: users.length + 1,
      name,
    };

    if (!name) {
      res.sendStatus(400);

      return;
    }

    users.push(user);
    res.statusCode = 201;
    res.send(user);
  });

  app.get('/users', (req, res) => {
    res.statusCode = 200;
    res.send(users);
  });

  app.get('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const user = users.find(folk => folk.id === +userId);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;
    res.send(user);
  });

  app.delete('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const newUsers = users.filter(folk => folk.id !== +userId);

    if (users.length === newUsers.length) {
      res.sendStatus(404);

      return;
    }

    users = newUsers;

    res.sendStatus(204);
  });

  app.patch('/users/:userId', express.json(), (req, res) => {
    const { userId } = req.params;
    const { name } = req.body;

    const foundUser = users.find(folk => folk.id === +userId);

    if (!name) {
      res.sendStatus(400);

      return;
    }

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    Object.assign(foundUser, { name });
    res.send(foundUser);
  });
  // ////////

  app.post('/expenses', express.json(), (req, res) => {
    const { userId } = req.body;

    const user = users.find(folk => +userId === folk.id);
    const expense = {
      id: expenses.length + 1,
      ...req.body,
    };

    expenses.push(expense);

    if (!user) {
      res.sendStatus(400);

      return;
    }

    res.statusCode = 201;
    res.send(expense);
  });

  app.get('/expenses', (req, res) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);

    const userId = normalizedURL.searchParams.get('userId');
    const category = normalizedURL.searchParams.get('category');
    const fromDate = normalizedURL.searchParams.get('from');
    const toDate = normalizedURL.searchParams.get('to');
    const numberFromDate = new Date(fromDate).getTime();
    const numberToDate = new Date(toDate).getTime();
    let copy = [ ...expenses ];

    if (userId !== null) {
      copy = copy.filter(expense => expense.userId === +userId);
    }

    if (category !== null) {
      copy = copy.filter(expense => expense.category === category);
    }

    if (fromDate !== null && toDate !== null) {
      copy = copy.filter(expense => {
        const expenseDate = new Date(expense.spentAt).getTime();

        return expenseDate < numberToDate && expenseDate > numberFromDate;
      });
    }

    res.statusCode = 200;

    if (category !== null || userId !== null
      || fromDate !== null || toDate !== null) {
      res.send(copy);
    } else {
      res.send(expenses);
    }
  });

  app.get('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const foundExpense = expenses.find(expense => expense.id === +expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;
    res.send(foundExpense);
  });

  app.delete('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const newExpenses = expenses.filter(expense => expense.id !== +expenseId);

    if (users.length === newExpenses.length) {
      res.sendStatus(404);

      return;
    }

    expenses = newExpenses;

    res.sendStatus(204);
  });

  app.patch('/expenses/:expenseId', express.json(), (req, res) => {
    const { expenseId } = req.params;
    const { title } = req.body;

    const foundExpense = expenses.find(expense => expense.id === +expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    if (!title) {
      res.sendStatus(400);

      return;
    }

    Object.assign(foundExpense, { title });
    res.send(foundExpense);
  });

  return app;
}

module.exports = {
  createServer,
};
