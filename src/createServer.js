const express = require('express');

function createServer() {
  const app = express();

  app.use(express.json());

  const users = [];
  let expenses = [];
  let userIdSeq = 1;
  let expenseIdSeq = 1;

  // USERS

  app.get('/users', (req, res) => {
    res.status(200).json(users);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send();
    }

    const user = {
      id: userIdSeq++,
      name,
    };

    users.push(user);

    res.status(201).json(user);
  });

  app.get('/users/:id', (req, res) => {
    const id = Number(req.params.id);

    if (!id) {
      return res.status(400).send();
    }

    const user = users.find((u) => u.id === id);

    if (!user) {
      return res.status(404).send();
    }

    res.status(200).json(user);
  });

  app.patch('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const { name } = req.body;

    if (!id || !name) {
      return res.status(400).send();
    }

    const user = users.find((u) => u.id === id);

    if (!user) {
      return res.status(404).send();
    }

    user.name = name;

    res.status(200).json(user);
  });

  app.delete('/users/:id', (req, res) => {
    const id = Number(req.params.id);

    const index = users.findIndex((u) => u.id === id);

    if (index === -1) {
      return res.status(404).send();
    }

    users.splice(index, 1);
    expenses = expenses.filter((e) => e.userId !== id);

    res.status(204).send();
  });

  // EXPENSES

  app.get('/expenses', (req, res) => {
    let result = [...expenses];

    const { userId, categories, from, to } = req.query;

    if (userId) {
      result = result.filter((e) => e.userId === Number(userId));
    }

    if (categories) {
      const list = Array.isArray(categories) ? categories : [categories];

      result = result.filter((e) => list.includes(e.category));
    }

    if (from) {
      result = result.filter((e) => new Date(e.spentAt) >= new Date(from));
    }

    if (to) {
      result = result.filter((e) => new Date(e.spentAt) <= new Date(to));
    }

    res.status(200).json(result);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId || !spentAt || !title || amount === undefined || !category) {
      return res.status(400).send();
    }

    const userExists = users.some((u) => u.id === userId);

    if (!userExists) {
      return res.status(400).send();
    }

    const expense = {
      id: expenseIdSeq++,
      userId,
      spentAt,
      title,
      amount,
      category,
      ...(note && { note }),
    };

    expenses.push(expense);

    res.status(201).json(expense);
  });

  app.get('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);

    if (!id) {
      return res.status(400).send();
    }

    const expense = expenses.find((e) => e.id === id);

    if (!expense) {
      return res.status(404).send();
    }

    res.status(200).json(expense);
  });

  app.patch('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);

    if (!id) {
      return res.status(400).send();
    }

    const expense = expenses.find((e) => e.id === id);

    if (!expense) {
      return res.status(404).send();
    }

    Object.assign(expense, req.body);

    res.status(200).json(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);

    const index = expenses.findIndex((e) => e.id === id);

    if (index === -1) {
      return res.status(404).send();
    }

    expenses.splice(index, 1);

    res.status(204).send();
  });

  return app;
}

module.exports = {
  createServer,
};
