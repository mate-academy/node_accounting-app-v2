'use strict';

const express = require('express');

function createServer() {
  const app = express();

  app.use(express.json());

  let data = [];
  let data2 = [];

  function findUser(req, res, next) {
    const userId = Number(req.params.id);
    const user = data.find((currentUser) => currentUser.id === userId);

    if (!user) {
      return res.status(404).json({ error: 'User not Found' });
    }
    req.user = user;
    next();
  }

  function findExpense(req, res, next) {
    const expenseId = Number(req.params.id);
    const expense = data2.find(
      (currentExpense) => currentExpense.id === expenseId,
    );

    if (!expense) {
      return res.status(404).json({ error: 'Expense not Found' });
    }
    req.expense = expense;
    next();
  }

  app.get('/users', (req, res) => res.json(data));

  app.post('/users', (req, res) => {
    if (!req.body.name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const newUser = { id: Date.now(), ...req.body };

    data.push(newUser);
    res.status(201).json(newUser);
  });

  app.get('/users/:id', findUser, (req, res) => res.json(req.user));

  app.delete('/users/:id', findUser, (req, res) => {
    data = data.filter((user) => user.id !== req.user.id);

    res.status(204).send();
  });

  app.patch('/users/:id', findUser, (req, res) => {
    Object.assign(req.user, req.body);

    res.status(200).json(req.user);
  });

  const requestProperties = [
    'userId',
    'spentAt',
    'title',
    'amount',
    'category',
    'note',
  ];

  app.get('/expenses', (req, res) => {
    const { userId, from, to, categories } = req.query;

    let filteredExpenses = data2;

    if (userId) {
      filteredExpenses = filteredExpenses.filter(
        (expense) => expense.userId === Number(userId),
      );
    }

    if (categories) {
      filteredExpenses = filteredExpenses.filter(
        (expense) =>
          expense.category.toLowerCase() === categories.toLowerCase(),
      );
    }

    if (from && to) {
      const fromDate = new Date(from);
      const toDate = new Date(to);

      filteredExpenses = filteredExpenses.filter((expense) => {
        const spentAtDate = new Date(expense.spentAt);

        return spentAtDate >= fromDate && spentAtDate <= toDate;
      });
    }

    return res.json(filteredExpenses);
  });

  app.post('/expenses', (req, res) => {
    const hasAllFields = requestProperties.every((property) => {
      return req.body.hasOwnProperty(property);
    });

    const isUserExist = data.some(
      (user) => user.id === Number(req.body.userId),
    );

    if (!hasAllFields || !isUserExist) {
      return res
        .status(400)
        .json({ error: 'No required fields or user not exist' });
    }

    const newExpenses = { id: Date.now(), ...req.body };

    data2.push(newExpenses);

    return res.status(201).json(newExpenses);
  });

  app.get('/expenses/:id', findExpense, (req, res) => res.json(req.expense));

  app.delete('/expenses/:id', findExpense, (req, res) => {
    data2 = data2.filter((expense) => expense.id !== req.expense.id);

    res.status(204).send();
  });

  app.patch('/expenses/:id', findExpense, (req, res) => {
    Object.assign(req.expense, req.body);

    res.status(200).json(req.expense);
  });

  return app;
}

module.exports = {
  createServer,
};
