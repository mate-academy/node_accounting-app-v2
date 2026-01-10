'use strict';

const express = require('express');

function createServer() {
  let users = [];
  let expenses = [];
  let uId = 1;
  let eId = 1;

  const app = express();

  app.use(express.json());

  app.get('/users', (req, res) => {
    return res.json(users);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send('Name parameter is required');
    }

    const user = {
      id: uId++,
      name,
    };

    users.push(user);

    return res.status(201).json(user);
  });

  app.get('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((person) => person.id === id);

    if (Number.isNaN(id)) {
      return res.status(400).send('Invalid id');
    }

    if (!user) {
      return res.status(404).send('User with this id does not exist');
    }

    return res.json(user);
  });

  app.delete('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((person) => person.id === id);
    const newUsers = users.filter((person) => person.id !== id);

    if (Number.isNaN(id)) {
      return res.status(400).send('Invalid id');
    }

    if (!user) {
      return res.status(404).send('User with this id does not exist');
    }

    users = newUsers;

    return res.sendStatus(204);
  });

  app.patch('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const { name } = req.body;
    const user = users.find((person) => person.id === id);

    if (Number.isNaN(id)) {
      return res.status(400).send('Invalid id');
    }

    if (!user) {
      return res.status(404).send('User with this id does not exist');
    }

    if (typeof name !== 'string') {
      return res.status(400).send('Incorect data type');
    }

    Object.assign(user, { name });

    return res.status(200).json(user);
  });

  app.get('/expenses', (req, res) => {
    const { userId, categories, from, to } = req.query;
    let filteredExpenses = expenses.slice();

    if (userId !== undefined) {
      filteredExpenses = filteredExpenses.filter(
        (ex) => ex.userId === Number(userId),
      );
    }

    if (from !== undefined || to !== undefined) {
      const fromTs = from ? Date.parse(from) : -Infinity;
      const toTs = to ? Date.parse(to) : Infinity;

      filteredExpenses = filteredExpenses.filter((ex) => {
        const t = Date.parse(ex.spentAt);

        return t >= fromTs && t <= toTs;
      });
    }

    if (categories !== undefined) {
      const categs = String(categories).split(',');

      /* prettier-ignore */
      filteredExpenses = filteredExpenses.filter((ex) =>
        categs.includes(ex.category));
    }

    return res.json(filteredExpenses);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;
    const userExist = users.some((u) => u.id === Number(userId));

    if (!userExist) {
      return res.status(400).send('User not found');
    }

    if (
      userId === undefined ||
      !spentAt ||
      !title ||
      amount === undefined ||
      !category
    ) {
      return res.status(400).send('Missing required parameter');
    }

    const expense = {
      id: eId++,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(expense);

    return res.status(201).json(expense);
  });

  app.get('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);
    const expense = expenses.find((ex) => ex.id === id);

    if (Number.isNaN(id)) {
      return res.status(400).send('Invalid id');
    }

    if (!expense) {
      return res.status(404).send('Expense with this id does not exist');
    }

    return res.json(expense);
  });

  app.patch('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);
    const expense = expenses.find((ex) => ex.id === id);

    if (!expense) {
      return res.status(404).send('Expense with this id does not exist');
    }

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).send('Empty body');
    }

    if (Number.isNaN(id)) {
      return res.status(400).send('Invalid id');
    }

    const check = ['userId', 'spentAt', 'title', 'amount', 'category', 'note'];

    check.forEach((p) => {
      if (req.body[p] !== undefined) {
        expense[p] = p === 'userId' ? Number(req.body[p]) : req.body[p];
      }
    });

    return res.json(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);
    const expense = expenses.find((ex) => ex.id === id);

    if (Number.isNaN(id)) {
      return res.status(400).send('Invalid id');
    }

    if (!expense) {
      return res.status(404).send('Expense with this id does not exist');
    }

    expenses = expenses.filter((ex) => ex.id !== id);

    return res.status(204).send();
  });

  return app;
}

module.exports = {
  createServer,
};
