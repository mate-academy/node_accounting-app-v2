'use strict';

const express = require('express');

function createServer() {
  const app = express();

  app.use(express.json());

  // ===== In-memory collections =====
  const users = [];
  const expenses = [];

  // ===== Helpers =====
  const findById = (collection, id) =>
    collection.find((item) => item.id === Number(id));

  const findIndexById = (collection, id) =>
    collection.findIndex((item) => item.id === Number(id));

  const isValidISODate = (value) => {
    const d = new Date(value);

    return !Number.isNaN(d.getTime()) && typeof value === 'string';
  };

  const validateExpense = ({ title, amount, category, spentAt, userId }) => {
    if (
      !title ||
      amount === undefined ||
      !category ||
      !spentAt ||
      userId === undefined
    ) {
      return 'Parâmetros obrigatórios ausentes';
    }

    if (typeof title !== 'string' || typeof category !== 'string') {
      return 'Parâmetros inválidos';
    }

    if (typeof amount !== 'number') {
      return 'Parâmetros inválidos';
    }

    if (!isValidISODate(spentAt)) {
      return 'Parâmetros inválidos';
    }

    return null;
  };

  // ===== Users =====
  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send('Parâmetro obrigatório ausente: name');
    }

    const user = { id: users.length + 1, name };

    users.push(user);
    res.status(201).json(user);
  });

  app.get('/users', (req, res) => res.json(users));

  app.get('/users/:id', (req, res) => {
    const user = findById(users, req.params.id);

    if (!user) {
      return res.status(404).send('Usuário não encontrado');
    }
    res.json(user);
  });

  app.put('/users/:id', (req, res) => {
    const user = findById(users, req.params.id);

    if (!user) {
      return res.status(404).send('Usuário não encontrado');
    }

    const { name } = req.body;

    if (!name) {
      return res.status(400).send('Parâmetro obrigatório ausente: name');
    }

    user.name = name;
    res.json(user);
  });

  app.patch('/users/:id', (req, res) => {
    const user = findById(users, req.params.id);

    if (!user) {
      return res.status(404).send('Usuário não encontrado');
    }

    if (req.body.name) {
      user.name = req.body.name;
    }
    res.json(user);
  });

  app.delete('/users/:id', (req, res) => {
    const index = findIndexById(users, req.params.id);

    if (index === -1) {
      return res.status(404).send('Usuário não encontrado');
    }

    users.splice(index, 1);
    res.status(204).send();
  });

  // ===== Expenses =====
  app.post('/expenses', (req, res) => {
    const error = validateExpense(req.body);

    if (error) {
      return res.status(400).send(error);
    }

    const user = findById(users, req.body.userId);

    if (!user) {
      return res.status(400).send('Usuário não encontrado');
    }

    const expense = { id: expenses.length + 1, ...req.body };

    expenses.push(expense);
    res.status(201).json(expense);
  });

  app.get('/expenses', (req, res) => {
    let result = expenses;

    if (req.query.userId) {
      const userId = Number(req.query.userId);

      result = result.filter((e) => e.userId === userId);
    }

    if (req.query.categories || req.query.category) {
      const categoryParam = req.query.categories || req.query.category;
      const category = String(categoryParam).toLowerCase();

      result = result.filter(
        (e) => String(e.category).toLowerCase() === category,
      );
    }

    if (req.query.from && req.query.to) {
      const from = new Date(req.query.from);
      const to = new Date(req.query.to);

      result = result.filter((e) => {
        const date = new Date(e.spentAt);

        return date >= from && date <= to;
      });
    }

    res.json(result);
  });

  app.get('/expenses/:id', (req, res) => {
    const expense = findById(expenses, req.params.id);

    if (!expense) {
      return res.status(404).send('Despesa não encontrada');
    }
    res.json(expense);
  });

  app.put('/expenses/:id', (req, res) => {
    const expense = findById(expenses, req.params.id);

    if (!expense) {
      return res.status(404).send('Despesa não encontrada');
    }

    const error = validateExpense(req.body);

    if (error) {
      return res.status(400).send(error);
    }

    const user = findById(users, req.body.userId);

    if (!user) {
      return res.status(400).send('Usuário não encontrado');
    }

    Object.assign(expense, req.body);
    res.json(expense);
  });

  app.patch('/expenses/:id', (req, res) => {
    const expense = findById(expenses, req.params.id);

    if (!expense) {
      return res.status(404).send('Despesa não encontrada');
    }

    if (req.body.userId !== undefined) {
      const user = findById(users, req.body.userId);

      if (!user) {
        return res.status(400).send('Usuário não encontrado');
      }
    }

    if (req.body.spentAt !== undefined && !isValidISODate(req.body.spentAt)) {
      return res.status(400).send('Parâmetros inválidos');
    }

    Object.assign(expense, req.body);
    res.json(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const index = findIndexById(expenses, req.params.id);

    if (index === -1) {
      return res.status(404).send('Despesa não encontrada');
    }

    expenses.splice(index, 1);
    res.status(204).send();
  });

  return app;
}

module.exports = { createServer };
