'use strict';

const express = require('express');

function createServer() {
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)
  let users = [];
  let expenses = [];

  let nextUserId = 1;
  let nextExpenseId = 1;

  const app = express();

  app.use(express.json());

  app.get('/users', (req, res) => {
    res.json(users);
  });

  app.get('/expenses', (req, res) => {
    const { userId, categories, from, to } = req.query;
    let filterredExpenses = expenses;

    if (userId) {
      filterredExpenses = filterredExpenses.filter(
        (expense) => expense.userId === +userId,
      );
    }

    if (categories) {
      filterredExpenses = filterredExpenses.filter((e) => {
        return categories.includes(e.category);
      });
    }

    if (from && to) {
      filterredExpenses = filterredExpenses.filter(
        (expense) => expense.spentAt >= from && expense.spentAt <= to,
      );
    }

    res.json(filterredExpenses);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: 'Name is required',
      });
    }

    const user = {
      id: nextUserId++,
      name,
    };

    users.push(user);
    res.status(201).json(user);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId || !spentAt || !title || !amount || !category) {
      return res.status(400).json({
        message: 'Not full information was send!',
      });
    }

    const user = users.find((person) => person.id === +userId);

    if (!user) {
      return res.status(400).json({
        message: 'Not found user with such id',
      });
    }

    const newExpenses = {
      id: nextExpenseId++,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(newExpenses);
    res.status(201).json(newExpenses);
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;

    const user = users.find((person) => person.id === +id);

    if (!user) {
      return res.status(404).json({
        message: 'No such user with current id!',
      });
    }

    res.json(user);
  });

  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;

    const expense = expenses.find((exp) => exp.id === +id);

    if (!expense) {
      return res.status(404).json({
        message: 'No such expense with current id!',
      });
    }

    res.json(expense);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find((person) => person.id === +id);

    if (!user) {
      return res.status(404).json({
        message: 'No such user with current id!',
      });
    }

    users = users.filter((person) => person.id !== +id);

    res.sendStatus(204);
  });

  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const expense = expenses.find((exp) => exp.id === +id);

    if (!expense) {
      return res.status(404).json({
        message: 'No such expense with current id!',
      });
    }

    expenses = expenses.filter((exp) => exp.id !== +id);

    res.sendStatus(204);
  });

  app.patch('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const user = users.find((person) => person.id === +id);

    if (!user) {
      return res.status(404).json({
        message: 'No such user with current id!',
      });
    }

    if (!name) {
      return res.status(400).json({
        message: 'No updates arrive',
      });
    }

    user.name = name;

    res.status(200).json(user);
  });

  app.patch('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;
    const expense = expenses.find((exp) => exp.id === +id);

    if (!expense) {
      return res.status(404).json({
        message: 'No such expense with current id!',
      });
    }

    if (userId in req.body || id in req.body) {
      return res.status(400).json({
        message: 'Unavailable type of data!',
      });
    }

    Object.assign(expense, req.body);

    res.status(200).json(expense);
  });

  return app;
}

module.exports = {
  createServer,
};
