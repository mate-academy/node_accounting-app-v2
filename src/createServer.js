/* eslint-disable prettier/prettier */
'use strict';

const express = require('express');

function createServer() {
  const users = [];
  const expenses = [];
  let nextUserId = 1;
  let nextExpensesId = 1;

  const app = express();

  app.use(express.json());

  app.get('/users', (req, res) => {
    res.status(200).send(users);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.sendStatus(400);
    }

    const newUser = { id: nextUserId++, name };

    users.push(newUser);
    res.status(201).send(newUser);
  });

  app.get('/users/:id', (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.sendStatus(400);
    }

    const foundUser = users.find((user) => user.id === id);

    if (!foundUser) {
      return res.sendStatus(404);
    }

    res.status(200).send(foundUser);
  });

  app.delete('/users/:id', (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.sendStatus(400);
    }

    const index = users.findIndex((user) => user.id === id);

    if (index === -1) {
      return res.sendStatus(404);
    }

    users.splice(index, 1);
    res.sendStatus(204);
  });

  app.patch('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const { name } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
      return res.sendStatus(400);
    }

    const index = users.findIndex((user) => user.id === id);

    if (index === -1) {
      return res.sendStatus(404);
    }

    if (name) {
      users[index].name = name;
    }
    res.status(200).send(users[index]);
  });

  app.get('/expenses', (req, res) => {
    let filteredExpenses = [...expenses];

    const { userId, categories, from, to } = req.query;

    if (userId !== undefined) {
      filteredExpenses = filteredExpenses.filter(
        (e) => e.userId === Number(userId),
      );
    }

    if (categories !== undefined) {
      const categoryArray = Array.isArray(categories)
        ? categories
        : [categories];

      filteredExpenses = filteredExpenses.filter((e) =>
        categoryArray.includes(e.category));
    }

    if (from !== undefined) {
      filteredExpenses = filteredExpenses.filter(
        (e) => new Date(e.spentAt) >= new Date(from),
      );
    }

    if (to !== undefined) {
      filteredExpenses = filteredExpenses.filter(
        (e) => new Date(e.spentAt) <= new Date(to),
      );
    }

    filteredExpenses.sort((a, b) => a.id - b.id);

    res.status(200).send(filteredExpenses);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!Number.isInteger(userId) || !users.some((u) => u.id === userId)) {
      return res.status(400).send({ message: 'Invalid or missing userId' });
    }

    if (!spentAt || !title || amount === undefined || !category) {
      return res.status(400).send({ message: 'Missing required fields' });
    }

    const newExpense = {
      id: nextExpensesId++,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(newExpense);
    res.status(201).send(newExpense);
  });

  app.get('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.sendStatus(400);
    }

    const foundExpense = expenses.find((e) => e.id === id);

    if (!foundExpense) {
      return res.sendStatus(404);
    }

    res.status(200).send(foundExpense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.sendStatus(400);
    }

    const index = expenses.findIndex((e) => e.id === id);

    if (index === -1) {
      return res.sendStatus(404);
    }

    expenses.splice(index, 1);
    res.sendStatus(204);
  });

  app.patch('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);
    const { spentAt, title, amount, category, note } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
      return res.sendStatus(400);
    }

    const index = expenses.findIndex((e) => e.id === id);

    if (index === -1) {
      return res.sendStatus(404);
    }

    expenses[index] = {
      ...expenses[index],
      ...(spentAt !== undefined && { spentAt }),
      ...(title !== undefined && { title }),
      ...(amount !== undefined && { amount }),
      ...(category !== undefined && { category }),
      ...(note !== undefined && { note }),
    };

    res.status(200).send(expenses[index]);
  });

  return app;
}

module.exports = { createServer };
