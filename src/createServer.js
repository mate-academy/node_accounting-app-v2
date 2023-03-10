'use strict';

const express = require('express');
const cors = require('cors');

const { router: userRouter } = require('./routes/users.js');

const userService = require('./services/users');

function createServer() {
  userService.getInitial();

  let expenses = [];

  const app = express();

  app.use(cors());
  app.use('/users', userRouter);

  app.get('/expenses', (req, res) => {
    const { userId, categories, from, to } = req.query;
    let filteredExpenses = [...expenses];
    const category = Array.isArray(categories)
      ? categories
      : [categories];

    if (userId) {
      const userIdToNumber = +userId;

      filteredExpenses = filteredExpenses
        .filter(exp => exp.userId === userIdToNumber);
    }

    if (categories) {
      filteredExpenses = filteredExpenses
        .filter(expense => {
          return category.includes(expense.category);
        });
    }

    if (from) {
      filteredExpenses = filteredExpenses
        .filter(expense => {
          return expense.spentAt > from;
        });
    }

    if (to) {
      filteredExpenses = filteredExpenses
        .filter(expense => {
          return expense.spentAt < to;
        });
    }

    res.send(filteredExpenses);
  });

  app.get('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const foundExpense = expenses.find(expense => expense.id === +expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    res.send(foundExpense);
  });

  app.post('/expenses', express.json(), (req, res) => {
    const data = req.body;
    const { name, userId } = req.body;

    if (name === 'undefined') {
      res.sendStatus(400);

      return;
    }

    const foundUser = userService.getOne(userId);

    if (!foundUser) {
      res.sendStatus(400);

      return;
    }

    const newExpense = {
      id: new Date().valueOf(),
      ...data,
    };

    expenses.push(newExpense);
    res.status(201);
    res.send(newExpense);
  });

  app.patch('/expenses/:expenseId', express.json(), (req, res) => {
    const { expenseId } = req.params;
    const foundExpense = expenses.find(expense => expense.id === +expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    const data = req.body;

    Object.assign(foundExpense, data);
    res.send(foundExpense);
  });

  app.delete('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const foundExpense = expenses.find(expense => expense.id === +expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    expenses = expenses.filter(expense => expense.id !== +expenseId);

    res.sendStatus(204);
  });

  return app;
}

module.exports = {
  createServer,
};
