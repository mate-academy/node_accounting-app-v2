'use strict';

const express = require('express');

function createServer() {
  let expenses = [];
  let users = [];

  const app = express();

  app.use(express.json());

  // expenses routing

  app.get('/expenses', (req, res) => {
    const { userId, from, to, categories } = req.query;

    let copyExpenses = [...expenses];

    if (+userId) {
      copyExpenses = copyExpenses.filter(expense => expense.userId === +userId);
    }

    if (from) {
      copyExpenses = copyExpenses.filter(expense => expense.spentAt >= from);
    }

    if (to) {
      copyExpenses = copyExpenses.filter(expense => expense.spentAt <= to);
    }

    if (categories) {
      copyExpenses
        = copyExpenses.filter(expense => categories.includes(expense.category));
    }

    res.send(copyExpenses);
  });

  app.get('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;

    const foundExpense
      = expenses.find(expense => expense.id === Number(expenseId));

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    global.console.log('expenseId:', expenseId);

    res.send(foundExpense);
  });

  app.post('/expenses', (req, res) => {
    const {
      amount,
      category,
      note,
      spentAt,
      title,
      userId,
    } = req.body;

    const foundUser = users.find(user => user.id === Number(userId));

    if (!amount || !category || !note || !spentAt || !title || !foundUser) {
      res.sendStatus(400);

      return;
    }

    const id = expenses.length > 0
      ? Math.max(...expenses.map(expense => expense.id)) + 1
      : 1;

    const newExpense = {
      id,
      amount,
      category,
      note,
      spentAt,
      title,
      userId: Number(userId),
    };

    expenses.push(newExpense);

    res.status(201);
    res.send(newExpense);
  });

  app.delete('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const foundExpense = expenses.find(expense => expense.id === +expenseId);

    if (!foundExpense) {
      return res.sendStatus(404);
    }

    expenses = expenses.filter(expense => expense.id !== +expenseId);

    res.sendStatus(204);
  });

  app.patch('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const {
      amount,
      category,
      note,
      spentAt,
      title,
    } = req.body;
    const foundExpense = expenses.find(expense => expense.id === +expenseId);

    if (!foundExpense) {
      return res.sendStatus(404);
    }

    Object.assign(foundExpense, {
      amount: amount || foundExpense.amount,
      category: category || foundExpense.category,
      note: note || foundExpense.note,
      spentAt: spentAt || foundExpense.spentAt,
      title: title || foundExpense.title,
    });

    res.send(foundExpense);
  });

  // user routing

  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.get('/users/:userId', (req, res) => {
    const { userId } = req.params;

    const foundUser = users.find(user => user.id === Number(userId));

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.send(foundUser);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const id = users.length > 0
      ? Math.max(...users.map(user => user.id)) + 1
      : 1;

    const newUser = {
      id,
      name,
    };

    users.push(newUser);

    res.status(201);
    res.send(newUser);
  });

  app.delete('/users/:userId', (req, res) => {
    const { userId } = req.params;

    const foundUser = users.find(user => user.id === +userId);

    if (!foundUser) {
      return res.sendStatus(404);
    }

    users = users.filter(user => user.id !== +userId);

    res.sendStatus(204);
  });

  app.patch('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const { name } = req.body;
    const foundUser = users.find(user => user.id === +userId);

    if (!foundUser) {
      return res.sendStatus(404);
    }

    if (!name) {
      return res.sendStatus(400);
    }

    Object.assign(foundUser, { name });

    res.send(foundUser);
  });

  return app;
}

module.exports = {
  createServer,
};
