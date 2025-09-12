'use strict';

const express = require('express');
const cors = require('cors');

function createServer() {
  let users = [];

  let expenses = [];
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const result = users.find((u) => +u.id === +id);

    if (!result) {
      res.sendStatus(404);

      return;
    }

    if (isNaN(+id)) {
      res.sendStatus(400);

      return;
    }

    res.send(result);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);
    }

    const newUser = {
      id: Date.now(),
      name: name,
    };

    users.push(newUser);
    res.statusCode = 201;
    res.send(newUser);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    if (!users.find((u) => +u.id === +id)) {
      res.sendStatus(404);
    }

    const filteredUsers = users.filter((u) => +u.id !== +id);
    const statusCode = filteredUsers.length === users.length ? 404 : 204;

    users = filteredUsers;

    res.sendStatus(statusCode);
  });

  app.patch('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const currentUser = users.find((u) => +u.id === +id);

    if (!name || !currentUser) {
      res.sendStatus(404);
    }

    if (typeof name !== 'string') {
      res.sendStatus(422);

      return;
    }

    Object.assign(currentUser, { name });
    res.send(currentUser);
  });

  app.get('/expenses', (req, res) => {
    const { userId, from, to, categories } = req.query;
    let filtered = expenses;

    if (userId) {
      filtered = filtered.filter((e) => +e.userId === +userId);
    }

    if (from && to) {
      const fromTimestamp = new Date(from).getTime();
      const toTimestamp = new Date(to).getTime();

      filtered = filtered.filter(
        (e) =>
          new Date(e.spentAt).getTime() >= fromTimestamp &&
          new Date(e.spentAt).getTime() <= toTimestamp,
      );
    }

    if (categories) {
      filtered = filtered.filter((e) => e.category === categories);
    }

    res.send(filtered);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!title) {
      res.sendStatus(400);
    }

    if (!userId) {
      res.sendStatus(404);
    }

    if (!title || !users.find((u) => +u.id === +userId)) {
      res.sendStatus(400);
    }

    if (
      typeof spentAt !== 'string' &&
      typeof title !== 'string' &&
      typeof category !== 'string' &&
      typeof note !== 'string' &&
      typeof amount !== 'number'
    ) {
      res.sendStatus(422);
    }

    const currentExpense = {
      id: Date.now(),
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(currentExpense);
    res.statusCode = 201;
    res.send(currentExpense);
  });

  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const result = expenses.find((e) => +e.id === +id);

    if (!result) {
      res.sendStatus(404);

      return;
    }

    res.send(result);
  });

  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const expenseToDelete = expenses.find((e) => +e.id === +id);

    if (!expenseToDelete) {
      return res.sendStatus(404);
    }

    expenses = expenses.filter((e) => +e.id !== +id);

    res.sendStatus(204);
  });

  app.patch('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const { spentAt, title, amount, category, note } = req.body;

    const currentExpense = expenses.find((e) => +e.id === +id);

    if (!currentExpense) {
      return res.sendStatus(404);
    }

    if (spentAt !== undefined) {
      currentExpense.spentAt = spentAt;
    }

    if (title !== undefined) {
      currentExpense.title = title;
    }

    if (amount !== undefined) {
      currentExpense.amount = amount;
    }

    if (category !== undefined) {
      currentExpense.category = category;
    }

    if (note !== undefined) {
      currentExpense.note = note;
    }

    res.send(currentExpense);
  });

  return app;
}

module.exports = {
  createServer,
};
