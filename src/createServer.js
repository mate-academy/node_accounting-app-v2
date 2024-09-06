'use strict';

const express = require('express');
const cors = require('cors');

function createServer() {
  const app = express();
  let users = [];
  let expenses = [];

  app.use(express.json());
  app.use(cors());

  app.get('/users', async (req, res) => {
    if (!users.length) {
      return res.send([]);
    }
    await res.send(users);
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;

    const user = users.find((person) => person.id === +id);

    if (user) {
      return res.status(200).send(user);
    } else {
      return res.sendStatus(404);
    }
  });

  app.post('/users', async (req, res) => {
    const { name } = req.body;

    const user = {
      id: 5,
      name,
    };

    if (!name) {
      return res.sendStatus(400);
    }

    users.push(user);

    await res.status(201).send(user);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    let newUsers = [];

    newUsers = users.filter((person) => person.id !== +id);

    if (newUsers.length === users.length) {
      return res.sendStatus(404);
    }

    users = newUsers;

    return res.status(204).send(users);
  });

  app.patch('/users/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const stock = users.find((person) => person.id === +id);

    if (!stock) {
      return res.sendStatus(404);
    }

    const { name } = req.body;

    const userId = users.indexOf(stock);

    users[userId] = {
      id: +id,
      name,
    };

    res.status(200).send(users[userId]);
  });

  app.get('/expenses', (req, res) => {
    const { userId, from, to, categories } = req.query;

    if (categories && userId) {
      const expense = expenses.filter(
        (item) => item.userId === +userId && item.category === categories,
      );

      return res.status(200).send(expense);
    }

    if (userId && !categories) {
      const expense = [];

      expense.push(expenses.find((item) => item.userId === +userId));

      return res.status(200).send(expense);
    }

    if (from && to) {
      const expense = expenses.filter(
        (item) => item.spentAt >= from && item.spentAt <= to,
      );

      return res.status(200).send(expense);
    }

    return res.status(200).send(expenses);
  });

  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;

    const expense = expenses.find((item) => item.id === +id);

    if (expense) {
      return res.status(200).send(expense);
    } else {
      return res.sendStatus(404);
    }
  });

  app.post('/expenses', async (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    const expenseData = {
      id: 8,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    const getUser = users.find((person) => person.id === userId);

    if (!getUser) {
      return res.sendStatus(400);
    }

    expenses.push(expenseData);

    await res.status(201).send(expenseData);
  });

  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;
    let newExpense = [];

    newExpense = expenses.filter((item) => item.id !== +id);

    if (newExpense.length === expenses.length) {
      return res.sendStatus(404);
    }

    expenses = newExpense;

    return res.status(204).send(expenses);
  });

  app.patch('/expenses/:id', express.json(), (req, res) => {
    const { id } = req.params;

    const stock = expenses.find((item) => item.id === +id);

    if (!stock) {
      return res.sendStatus(404);
    }

    const { title } = req.body;

    const expenseId = expenses.indexOf(stock);

    expenses[expenseId] = {
      ...expenses[expenseId],
      title,
    };

    res.status(200).send(expenses[expenseId]);
  });

  return app;
}

module.exports = {
  createServer,
};
