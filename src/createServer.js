'use strict';

const express = require('express');

function createServer() {
  const app = express();
  let idCount = 0;
  let idExperence = 0;
  let users = [];
  let expenses = [];

  app.get('/users', (req, res) => {
    if (users.length === 0) {
      res.statusCode = 200;
      res.send([]);

      return;
    }
    res.send(users);
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;

    if (!Number.isFinite(Number(id))) {
      res.sendStatus(400);

      return;
    }

    const user = users.find((person) => person.id === +id);

    if (!user) {
      res.sendStatus(404);

      return;
    }
    res.send(user);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (typeof name !== 'string') {
      res.sendStatus(400);

      return;
    }

    const newUser = {
      id: (idCount += 1),
      name: name,
    };

    users.push(newUser);
    res.statusCode = 201;
    res.send(newUser);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    if (!Number.isFinite(Number(id))) {
      res.sendStatus(400);

      return;
    }

    const newUsers = users.filter((person) => person.id !== +id);

    if (newUsers.length === users.length) {
      res.sendStatus(404);

      return;
    }
    users = newUsers;
    res.sendStatus(204);
  });

  app.patch('/users/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!Number.isFinite(Number(id)) || typeof name !== 'string' || name === undefined) {
      res.sendStatus(400);

      return;
    }

    const findUser = users.find((person) => person.id === +id);

    if (!findUser) {
      res.sendStatus(404);

      return;
    }

    Object.assign(findUser, { name });
    res.statusCode = 200;
    res.send(findUser);
  });

  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)
  app.get('/expenses', (req, res) => {
    const { userId, categories, from, to, amount } = req.query;

    let filtered = [...expenses];

    if (userId !== undefined) {
      filtered = filtered.filter((e) => e.userId === Number(userId));
    }

    if (categories !== undefined) {
      const categoryList = Array.isArray(categories)
        ? categories
        : categories.split(',');

      filtered = filtered.filter((e) => categoryList.includes(e.category));
    }

    if (from !== undefined) {
      const fromTime = Date.parse(from);

      filtered = filtered.filter((e) => Date.parse(e.spentAt) >= fromTime);
    }

    if (to !== undefined) {
      const toTime = Date.parse(to);

      filtered = filtered.filter((e) => Date.parse(e.spentAt) <= toTime);
    }

    if (amount !== undefined) {
      filtered = filtered.filter((e) => e.amount === Number(amount));
    }

    res.status(200).send(filtered);
  });

  app.post('/expenses', express.json(), (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;
    const findUser = users.find((person) => person.id === +userId);

    if (
      !findUser ||
      !userId ||
      !spentAt ||
      !title ||
      !amount ||
      !category ||
      !note
    ) {
      res.sendStatus(400);

      return;
    }

    const newExpenses = {
      id: ++idExperence,
      userId: +userId,
      spentAt: spentAt,
      title: title,
      amount: amount,
      category: category,
      note: note,
    };

    expenses.push(newExpenses);
    res.statusCode = 201;
    res.send(newExpenses);
  });

  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;

    if (!Number.isFinite(Number(id))) {
      res.sendStatus(400);

      return;
    }

    const findExpenses = expenses.find((exp) => exp.id === +id);

    if (!findExpenses) {
      res.sendStatus(404);

      return;
    }
    res.send(findExpenses);
  });

  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;

    if (!Number.isFinite(Number(id))) {
      res.sendStatus(400);

      return;
    }

    const newExpenses = expenses.filter((exp) => exp.id !== +id);

    if (newExpenses.length === expenses.length) {
      res.sendStatus(404);

      return;
    }

    expenses = newExpenses;
    res.sendStatus(204);
  });

  app.patch('/expenses/:id', express.json(), (req, res) => {
    const { id } = req.params;

    if (!Number.isFinite(Number(id))) {
      res.sendStatus(400);

      return;
    }

    const { spentAt, title, amount, category, note } = req.body;

    const findExpenses = expenses.find((exp) => exp.id === +id);

    if (findExpenses === undefined) {
      res.sendStatus(404);

      return;
    }

    if (
      spentAt === undefined &&
      title === undefined &&
      amount === undefined &&
      category === undefined &&
      note === undefined
    ) {
      res.sendStatus(400);

      return;
    }

    if (spentAt !== undefined) {
      findExpenses.spentAt = spentAt;
    }

    if (title !== undefined) {
      findExpenses.title = title;
    }

    if (amount !== undefined) {
      findExpenses.amount = amount;
    }

    if (category !== undefined) {
      findExpenses.category = category;
    }

    if (note !== undefined) {
      findExpenses.note = note;
    }

    res.statusCode = 200;
    res.send(findExpenses);
  });

  return app;
}

module.exports = {
  createServer,
};
