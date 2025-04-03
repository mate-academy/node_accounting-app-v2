'use strict';

const express = require('express');

function createServer() {
  const app = express();

  app.use(express.json());

  let usersList = [];
  let expensesList = [];

  app.get('/users', (req, res) => {
    res.send(usersList);
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = usersList.find((item) => item.id === Number(id));

    if (!user) {
      res.sendStatus(404);

      return;
    }

    res.send(user);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.sendStatus(400);
    }

    const newId = Math.max(...usersList.map((item) => item.id), 0) + 1;

    const user = {
      name,
      id: newId,
    };

    usersList.push(user);

    res.status(201).send(user);
  });

  app.patch('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const user = usersList.find((item) => item.id === +id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    if (typeof name !== 'string') {
      res.sendStatus(400);

      return;
    }

    user.name = name;

    res.send(user);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    const newUsersList = usersList.filter((user) => user.id !== +id);

    if (newUsersList.length === usersList.length) {
      res.sendStatus(404);

      return;
    }

    usersList = newUsersList;

    res.sendStatus(204);
  });

  app.get('/expenses', (req, res) => {
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

  app.post('/expenses', async (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!Number.isIntiger(userId) || !Number.isInteger(amount)) {
      res.sendStatus(400);

      return;
    }

    const assignedUser = usersList.find((user) => user.id === +userId);

    if (!assignedUser) {
      res.sendStatus(400);

      return;
    }

    const newId = Math.max(...expensesList.map((item) => item.id), 0) + 1;

    const newExpense = {
      id: newId,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expensesList.push(newExpense);

    res.status(201).send(newExpense);
  });

  app.patch('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const { userId, spentAt, title, amount, category, note } = req.body;

    const expense = expensesList.find((item) => item.id === +id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    if (
      (userId && typeof userId !== 'number') ||
      (spentAt && typeof spentAt !== 'string') ||
      (title && typeof title !== 'string') ||
      (amount && typeof amount !== 'number') ||
      (category && typeof category !== 'string') ||
      (note && typeof note !== 'string')
    ) {
      res.sendStatus(400);

      return;
    }

    Object.assign(expense, {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    res.send(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;

    const newExpensesList = expensesList.filter(
      (expense) => expense.id !== +id,
    );

    if (newExpensesList.length === expensesList.length) {
      res.sendStatus(404);

      return;
    }

    expensesList = newExpensesList;

    res.sendStatus(204);
  });

  return app;
}

module.exports = {
  createServer,
};
