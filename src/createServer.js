/* eslint-disable function-paren-newline */
'use strict';

const express = require('express');
const { v4: uuidv4 } = require('uuid');
const generateUniqNumberId = () => {
  const uuid = uuidv4()
    .replace(/[^0-9]/g, '')
    .slice(0, 5);

  return Number(uuid);
};

function createServer() {
  const app = express();

  const INITIAL_DATA = {
    users: [],
    expenses: [],
  };

  app.use(express.json());

  app.use((req, res, next) => {
    res.setHeader('Keep-Alive', 'timeout=300');
    next();
  });

  app.get('/users', (req, res) => {
    res.status(200).send(INITIAL_DATA.users);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name || typeof name !== 'string') {
      return res.sendStatus(400);
    }

    const user = {
      id: generateUniqNumberId(),
      name,
    };

    INITIAL_DATA.users.push(user);
    res.status(201).send(user);
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;

    const currentUser = INITIAL_DATA.users.find(
      (user) => Number(user.id) === Number(id),
    );

    if (!currentUser) {
      return res.sendStatus(404);
    }

    return res.status(200).send(currentUser);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    const userExists = INITIAL_DATA.users.find(
      (user) => Number(user.id) === Number(id),
    );

    if (!userExists) {
      return res.sendStatus(404);
    }

    INITIAL_DATA.users = INITIAL_DATA.users.filter(
      (user) => Number(user.id) !== Number(id),
    );

    return res.sendStatus(204);
  });

  app.patch('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const currentUser = INITIAL_DATA.users.find(
      (user) => Number(user.id) === Number(id),
    );

    if (!currentUser) {
      return res.sendStatus(400);
    }

    if (typeof name !== 'string') {
      return res.sendStatus(422);
    }

    Object.assign(currentUser, { name });

    res.send(currentUser);
  });

  app.get('/expenses', (req, res) => {
    const { userId, from, to, categories } = req.query;

    let filteredExpenses = INITIAL_DATA.expenses;

    if (userId) {
      filteredExpenses = filteredExpenses.filter(
        (expense) => Number(expense.userId) === Number(userId),
      );
    }

    if (from) {
      const fromDate = new Date(from);

      filteredExpenses = filteredExpenses.filter(
        (expense) => new Date(expense.spentAt) >= fromDate,
      );
    }

    if (to) {
      const toDate = new Date(to);

      filteredExpenses = filteredExpenses.filter(
        (expense) => new Date(expense.spentAt) <= toDate,
      );
    }

    if (categories) {
      filteredExpenses = filteredExpenses.filter((expense) =>
        categories.includes(expense.category),
      );
    }

    return res.status(200).send(filteredExpenses);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    const userExists = INITIAL_DATA.users.find(
      (user) => Number(user.id) === Number(userId),
    );

    if (!title || !userExists) {
      return res.sendStatus(400);
    }

    const newExpense = {
      id: generateUniqNumberId(),
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    INITIAL_DATA.expenses.push(newExpense);

    res.status(201).send(newExpense);
  });

  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;

    const currentExpense = INITIAL_DATA.expenses.find(
      (expense) => Number(expense.id) === Number(id),
    );

    if (!currentExpense) {
      return res.sendStatus(404);
    }

    return res.status(200).send(currentExpense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;

    const expenseIndex = INITIAL_DATA.expenses.findIndex(
      (expense) => Number(expense.id) === Number(id),
    );

    if (expenseIndex === -1) {
      return res.sendStatus(404);
    }

    INITIAL_DATA.expenses = INITIAL_DATA.expenses.filter(
      (expense) => Number(expense.id) !== Number(id),
    );

    return res.sendStatus(204);
  });

  app.patch('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const { spentAt, title, amount, category, note } = req.body;
    const currentExpense = INITIAL_DATA.expenses.find(
      (expense) => Number(expense.id) === Number(id),
    );

    if (!currentExpense) {
      res.status(404).send('Not found');
    }

    if (spentAt) {
      currentExpense.spentAt = spentAt;
    }

    if (title) {
      currentExpense.title = title;
    }

    if (amount) {
      currentExpense.amount = amount;
    }

    if (category) {
      currentExpense.category = category;
    }

    if (note) {
      currentExpense.note = note;
    }

    res.send(currentExpense);
  });

  return app;
}

module.exports = {
  createServer,
};
