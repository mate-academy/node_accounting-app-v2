'use strict';

const express = require('express');

function createServer() {
  const app = express();

  let users = [];

  let expenses = [];

  app.get('/users', (req, res) => {
    if (!users) {
      res.send([]);
    }
    res.statusCode = 200;
    res.send(users);
  });

  app.get('/users/:userId', (req, res) => {
    const { userId } = req.params;

    if (!userId) {
      return res.sendStatus(404);
    }

    const foundUser = users.find(({ id }) => id === Number(userId));

    if (!foundUser) {
      return res.sendStatus(404);
    }

    res.statusCode = 200;
    res.send(foundUser);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.sendStatus(400);
    }

    const user = {
      id: users.length + 1,
      name,
    };

    users.push(user);

    res.statusCode = 201;
    res.send(user);
  });

  app.patch('/users/:id', express.json(), (req, res) => {
    const { id } = req.params;

    if (!id) {
      res.sendStatus(404);
    }

    const foundUser = users.find((user) => user.id === Number(id));

    if (!foundUser.id) {
      return res.sendStatus(404);
    }

    const { name } = req.body;

    Object.assign(foundUser, { name });

    res.send(foundUser);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const foundUser = users.find((user) => user.id === Number(id));

    if (!foundUser) {
      return res.sendStatus(404);
    }

    users = users.filter((user) => user.id !== Number(id));
    res.statusCode = 204;
    res.send(foundUser);
  });

  /* ---------------------------------------------- */

  app.get('/expenses', (req, res) => {
    const { userId, categories, from, to } = req.query;

    if (userId) {
      expenses = expenses
        .filter((expense) => expense.userId === Number(userId));
    }

    if (categories) {
      expenses = expenses
        .filter((expense) => expense.category === categories);
    }

    if (from && to) {
      expenses = expenses.filter(({ spentAt }) => {
        const date = new Date(spentAt);
        const fromDate = new Date(from);
        const toDate = new Date(to);

        return toDate > date && fromDate <= date;
      });
    }

    res.statusCode = 200;
    res.send(expenses);
  });

  app.get('/expenses/:expensesId', (req, res) => {
    const { expensesId } = req.params;

    if (!expensesId) {
      return res.sendStatus(404);
    }

    const foundExpense = expenses
      .find((expense) => expense.id === Number(expensesId));

    if (!foundExpense) {
      return res.sendStatus(404);
    }

    res.statusCode = 200;
    res.send(foundExpense);
  });

  app.post('/expenses', express.json(), (req, res) => {
    const { title, amount, spentAt, category, userId, note } = req.body;

    const userFound = users.find((user) => user.id === Number(userId));

    if (!userFound || !title) {
      return res.sendStatus(400);
    }

    const lastId = users[users.length - 1].id;

    const item = {
      id: lastId + 1 || 0,
      title,
      amount: amount || 0,
      spentAt: spentAt || new Date(Date.now()).toISOString(),
      category: category || '',
      userId: userFound.id,
      note: note || '',
    };

    expenses.push(item);

    res.statusCode = 201;
    res.send(item);
  });

  app.patch('/expenses/:expensesId', express.json(), (req, res) => {
    const { expensesId } = req.params;

    if (!expensesId) {
      return res.sendStatus(400);
    }

    const foundItem = expenses.find((item) => item.id === Number(expensesId));

    if (!foundItem) {
      return res.sendStatus(404);
    }

    Object.assign(foundItem, req.body);

    res.statusCode = 200;
    res.send(foundItem);
  });

  app.delete('/expenses/:expensesId', (req, res) => {
    const { expensesId } = req.params;
    const foundItem = expenses.find((user) => user.id === Number(expensesId));

    if (!foundItem) {
      return res.sendStatus(404);
    }

    expenses = expenses.filter((user) => user.id !== Number(expensesId));
    res.statusCode = 204;
    res.send(foundItem);
  });

  return app;
}

module.exports = {
  createServer,
};
