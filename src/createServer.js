'use strict';

const express = require('express');
const cors = require('cors');

function createServer() {
  const app = express();

  app.use(cors());

  let users = [];
  let expenses = [];

  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const newUser = {
      id: users.length + 1,
      name,
    };

    users.push(newUser);

    res.statusCode = 201;
    res.send(newUser);
  });

  app.get('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const foundUser = users.find(user => user.id === +userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.send(foundUser);
  });

  app.delete('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const filteredUsers = users.filter(user => user.id !== +userId);

    if (filteredUsers.length === users.length) {
      res.sendStatus(404);

      return;
    }

    users = filteredUsers;

    res.sendStatus(204);
  });

  app.patch('/users/:userId', express.json(), (req, res) => {
    const { userId } = req.params;
    const foundUser = users.find(user => user.id === +userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    const { name } = req.body;

    if (typeof name !== 'string') {
      res.sendStatus(422);

      return;
    }

    Object.assign(foundUser, { name });

    res.statusCode = 200;

    res.send(foundUser);
  });

  app.get('/expenses', express.json(), (req, res) => {
    const { userId, from, to, categories } = req.query;
    let preparedExpenses = expenses;

    if (userId) {
      preparedExpenses = preparedExpenses
        .filter(expense => expense.userId === +userId);
    }

    if (from) {
      const fromDate = new Date(from);

      preparedExpenses = preparedExpenses.filter(expense =>
        new Date(expense.spentAt) > fromDate
      );
    }

    if (to) {
      const toDate = new Date(to);

      preparedExpenses = preparedExpenses.filter(expense =>
        new Date(expense.spentAt) < toDate
      );
    }

    if (categories) {
      preparedExpenses = preparedExpenses
        .filter(expense => expense.category === categories);
    }

    res.send(preparedExpenses);
  });

  app.post('/expenses', express.json(), (req, res) => {
    const {
      userId, spentAt, title, amount, category, note,
    } = req.body;
    const foundUser = users.find(user => user.id === +userId);

    if (userId && !foundUser) {
      res.sendStatus(400);

      return;
    }

    if (!title) {
      res.sendStatus(400);

      return;
    }

    const newExpense = {
      id: expenses.length + 1,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(newExpense);

    res.statusCode = 201;

    res.send(newExpense);
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

  app.delete('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const filteredExpenses = expenses
      .filter(expense => expense.id !== +expenseId);

    if (filteredExpenses.length === expenses.length) {
      res.sendStatus(404);

      return;
    }

    expenses = filteredExpenses;
    res.sendStatus(204);
  });

  app.patch('/expenses/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const foundExpense = expenses
      .find(expense => expense.id === +id);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    const {
      userId, spentAt, title, amount, category, note,
    } = req.body;

    if (userId && typeof userId === 'number') {
      foundExpense.userId = userId;
    }

    if (spentAt && typeof spentAt === 'string') {
      foundExpense.spentAt = spentAt;
    }

    if (title && typeof title === 'string') {
      foundExpense.title = title;
    }

    if (amount && typeof amount === 'number') {
      foundExpense.amount = amount;
    }

    if (category && typeof category === 'string') {
      foundExpense.category = category;
    }

    if (note && typeof note === 'string') {
      foundExpense.note = note;
    }

    res.sendStatus = 200;

    res.send(foundExpense);
  });

  return app;
};

module.exports = {
  createServer,
};
