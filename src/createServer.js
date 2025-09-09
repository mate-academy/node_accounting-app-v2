'use strict';

const express = require('express');
const cors = require('cors');

function createServer() {
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)

  const app = express();

  let users = [];
  let expenses = [];

  app.use(cors());
  app.use(express.json());

  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find((u) => u.id === +id);

    if (!user) {
      res.sendStatus(404);

      return;
    }
    res.send(user);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const maxId = users.reduce((max, user) => Math.max(max, user.id), 0);
    const newId = maxId + 1;

    const newUser = {
      id: newId,
      name,
    };

    users.push(newUser);

    res.status(201).send(newUser);
  });

  app.patch('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const user = users.find((u) => u.id === +id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    if (name !== undefined) {
      user.name = name;
    }

    res.send(user);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const newUsers = users.filter((u) => u.id !== +id);

    if (newUsers.length === users.length) {
      res.sendStatus(404);

      return;
    }

    users = newUsers;
    res.sendStatus(204);
  });

  app.get('/expenses', (req, res) => {
    let filtered = [...expenses];

    if (req.query.userId) {
      filtered = filtered.filter((e) => e.userId === +req.query.userId);
    }

    if (req.query.from && req.query.to) {
      const fromDate = new Date(req.query.from);
      const toDate = new Date(req.query.to);

      filtered = filtered.filter((e) => {
        const expenseDate = new Date(e.spentAt);

        return expenseDate >= fromDate && expenseDate <= toDate;
      });
    }

    if (req.query.categories) {
      const categories = req.query.categories.split(',');

      filtered = filtered.filter((e) => categories.includes(e.category));
    }

    res.send(filtered);
  });

  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const expense = expenses.find((e) => e.id === +id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }
    res.send(expense);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!title || typeof title !== 'string' || title.trim() === '') {
      res
        .status(400)
        .send({ message: 'Title is required, must be a non-empty string' });

      return;
    }

    if (!category || typeof category !== 'string' || category.trim() === '') {
      res
        .status(400)
        .send({ message: 'Category is required, must be a non-empty string' });

      return;
    }

    const numAmount = Number(amount);

    if (!Number.isFinite(numAmount)) {
      res
        .status(400)
        .send({ message: 'Amount is required and must be a valid number' });

      return;
    }

    if (!spentAt) {
      res.status(400).send({ message: 'SpentAt is required' });

      return;
    }

    const spentAtDate = new Date(spentAt);

    if (isNaN(spentAtDate.getTime())) {
      res.status(400).send({ message: 'SpentAt must be a valid date' });

      return;
    }

    const uid = Number(userId);

    if (!Number.isFinite(uid)) {
      res
        .status(400)
        .send({ message: 'UserId is required and must be a valid number' });

      return;
    }

    const user = users.find((u) => u.id === +userId);

    if (!user) {
      res.sendStatus(400);

      return;
    }

    const maxId = expenses.reduce(
      (max, expense) => Math.max(max, expense.id),
      0,
    );
    const newId = maxId + 1;

    const newExpense = {
      id: newId,
      userId: uid,
      spentAt,
      title,
      amount: numAmount,
      category,
      note,
    };

    expenses.push(newExpense);

    res.status(201).send(newExpense);
  });

  app.patch('/expenses/:id', (req, res) => {
    const { id } = req.params;

    const expense = expenses.find((e) => e.id === +id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    const { userId, spentAt, title, amount, category, note } = req.body;

    if (userId !== undefined) {
      const uid = +userId;

      if (!Number.isFinite(uid)) {
        res.sendStatus(400);

        return;
      }

      const userExists = users.some((u) => u.id === uid);

      if (!userExists) {
        res.sendStatus(400);

        return;
      }
      expense.userId = uid;
    }

    if (spentAt !== undefined) {
      expense.spentAt = spentAt;
    }

    if (title !== undefined) {
      expense.title = title;
    }

    if (amount !== undefined) {
      expense.amount = amount;
    }

    if (category !== undefined) {
      expense.category = category;
    }

    if (note !== undefined) {
      expense.note = note;
    }

    res.send(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const newExpenses = expenses.filter((e) => e.id !== +id);

    if (newExpenses.length === expenses.length) {
      res.sendStatus(404);

      return;
    }

    expenses = newExpenses;
    res.sendStatus(204);
  });

  return app;
}

module.exports = {
  createServer,
};
