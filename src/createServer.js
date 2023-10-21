/* eslint-disable no-shadow */

'use strict';

const express = require('express');

function createServer(initialUsers = [], initialExpenses = []) {
  const users = [...initialUsers];
  const expenses = [...initialExpenses];
  let userId = 0;
  let expenseId = 0;
  const app = express();

  app.use(express.json());

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send();
    }

    const newUser = {
      id: ++userId,
      name,
    };

    users.push(newUser);
    res.status(201).json(newUser);
  });

  app.get('/users', (req, res) => {
    res.status(200).json(users);
  });

  app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));

    if (!user) {
      return res.status(404).send();
    }
    res.status(200).json(user);
  });

  app.patch('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));

    if (!user) {
      return res.status(404).send({ message: 'Not found' });
    }

    const { name } = req.body;

    if (name) {
      user.name = name;
    }
    res.status(200).json(user);
  });

  app.delete('/users/:id', (req, res) => {
    const index = users.findIndex(u => u.id === parseInt(req.params.id));

    if (index === -1) {
      return res.status(404).send();
    }
    users.splice(index, 1);
    res.status(204).send();
  });

  app.post('/expenses', (req, res) => {
    const {
      userId: newUserId,
      spentAt,
      note,
      title,
      amount,
      category,
    } = req.body;

    const userExists = users.some(u => u.id === newUserId);

    if (!userExists) {
      return res.status(400).send({ message: 'User not found' });
    }

    if (!newUserId || !spentAt || !title || !note || !amount || !category) {
      return res.status(400).send();
    }

    const newExpense = {
      id: ++expenseId,
      userId: newUserId,
      spentAt,
      note,
      title,
      amount,
      category,
    };

    expenses.push(newExpense);
    res.status(201).json(newExpense);
  });

  app.get('/expenses', (req, res) => {
    let filteredExpenses = [...expenses];

    const { userId, categories, from, to } = req.query;

    if (userId) {
      filteredExpenses = filteredExpenses
        .filter(expense => expense.userId === parseInt(userId));
    }

    if (categories) {
      filteredExpenses = filteredExpenses
        .filter(expense => categories.includes(expense.category));
    }

    if (from) {
      const fromDate = new Date(from);

      filteredExpenses = filteredExpenses
        .filter(expense => new Date(expense.spentAt) >= fromDate);
    }

    if (to) {
      const toDate = new Date(to);

      filteredExpenses = filteredExpenses
        .filter(expense => new Date(expense.spentAt) <= toDate);
    }

    res.status(200).json(filteredExpenses);
  });

  app.get('/expenses/:id', (req, res) => {
    const expense = expenses.find(e => e.id === parseInt(req.params.id));

    if (!expense) {
      return res.status(404).send();
    }
    res.status(200).json(expense);
  });

  app.patch('/expenses/:id', (req, res) => {
    const expense = expenses.find(e => e.id === parseInt(req.params.id));

    if (!expense) {
      return res.status(404).send();
    }

    const { spentAt, title, amount, category, note } = req.body;

    if (spentAt) {
      expense.spentAt = spentAt;
    }

    if (title) {
      expense.title = title;
    }

    if (amount) {
      expense.amount = amount;
    }

    if (category) {
      expense.category = category;
    }

    if (note) {
      expense.note = note;
    }

    res.status(200).json(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const index = expenses.findIndex(e => e.id === parseInt(req.params.id));

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
