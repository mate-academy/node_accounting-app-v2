'use strict';

const express = require('express');
const { generateId } = require('./utils/generateId');

function createServer() {
  const app = express();

  const userList = [];

  const expensesList = [];

  app.get('/users', (_, res) => {
    res.send(userList);
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = userList.find((item) => item.id === Number(id));

    if (!user) {
      res.sendStatus(404);
    }

    res.send(user);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const newUser = {
      id: generateId(userList),
      name,
    };

    res.statusCode = 201;

    userList.push(newUser);
    res.send(newUser);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const userIndex = userList.findIndex((item) => item.id === Number(id));

    if (userIndex === -1) {
      res.sendStatus(404);

      return;
    }

    userList.splice(userIndex, 1);
    res.sendStatus(204);
  });

  app.patch('/users/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const user = userList.find((item) => item.id === Number(id));

    if (!user) {
      res.sendStatus(404);

      return;
    }

    if (!name) {
      res.sendStatus(400);

      return;
    }

    user.name = name;
    res.send(user);
  });

  app.get('/expenses', (req, res) => {
    const { userId, from, to, categories } = req.query;

    if (userId || from || to || categories) {
      const filteredExpenses = expensesList.filter((item) => {
        if (userId && item.userId !== Number(userId)) {
          return false;
        }

        if (from && new Date(item.spentAt) < new Date(from)) {
          return false;
        }

        if (to && new Date(item.spentAt) > new Date(to)) {
          return false;
        }

        if (categories && !categories.split(',').includes(item.category)) {
          return false;
        }

        return true;
      });

      res.send(filteredExpenses);

      return;
    }

    res.send(expensesList);
  });

  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const expense = expensesList.find((item) => item.id === Number(id));

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    res.send(expense);
  });

  app.post('/expenses', express.json(), (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (userList.findIndex((item) => item.id === userId) === -1) {
      res.sendStatus(400);

      return;
    }

    if (!userId || !spentAt || !title || !amount || !category) {
      res.sendStatus(400);

      return;
    }

    const newExpense = {
      id: generateId(expensesList),
      userId,
      spentAt,
      title,
      amount,
      category,
      note: note || '',
    };

    res.statusCode = 201;

    expensesList.push(newExpense);
    res.send(newExpense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const expenseIndex = expensesList.findIndex(
      (item) => item.id === Number(id),
    );

    if (expenseIndex === -1) {
      res.sendStatus(404);

      return;
    }

    expensesList.splice(expenseIndex, 1);
    res.sendStatus(204);
  });

  app.patch('/expenses/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const expense = expensesList.find((item) => item.id === Number(id));

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    if (req.body.userId) {
      // client should not be able to change userId IMO
      res.sendStatus(400);

      return;
    }

    expense.spentAt = req.body.spentAt || expense.spentAt;
    expense.title = req.body.title || expense.title;
    expense.amount = req.body.amount || expense.amount;
    expense.category = req.body.category || expense.category;
    expense.note = req.body.note || expense.note;

    res.send(expense);
  });

  return app;
}

module.exports = {
  createServer,
};
