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

  app.get('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const foundUser = users.find(user => user.id === Number(userId));

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.send(foundUser);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    // const newUserId = Math.max(...users.map(({ id }) => id)) + 1;
    const newUserId = users.length + 1;

    const newUser = {
      id: newUserId,
      name,
    };

    users.push(newUser);

    res.status(201);
    res.send(newUser);
  });

  app.delete('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const filteredUsers = users.filter(user => user.id !== Number(userId));

    if (filteredUsers.length === users.length) {
      res.sendStatus(404);

      return;
    }

    users = filteredUsers;
    res.sendStatus(204);
  });

  app.patch('/users/:userId', express.json(), (req, res) => {
    const { userId } = req.params;
    const foundUser = users.find(user => user.id === Number(userId));

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

    res.send(foundUser);
  });

  app.get('/expenses', (req, res) => {
    const {
      userId,
      categories,
      from,
      to,
    } = req.query;

    if (userId) {
      expenses = expenses.filter(expense => expense.userId === Number(userId));
    }

    if (categories) {
      expenses = expenses.filter(({ category }) => (
        categories.includes(category)
      ));
    }

    if (from && to) {
      expenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.spentAt);
        const fromDate = new Date(from);
        const toDate = new Date(to);

        return expenseDate < toDate && fromDate <= expenseDate;
      });
    };

    res.send(expenses);
  });

  app.get('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const foundExpens = expenses.find(
      expense => expense.id === Number(expenseId));

    if (!foundExpens) {
      res.sendStatus(404);

      return;
    }

    res.send(foundExpens);
  });

  app.post('/expenses', express.json(), (req, res) => {
    const {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    } = req.body;

    const hasAllData = userId && title && amount && category && note;
    const hasUser = users.map(user => user.id).includes(userId);

    if (!hasUser || !hasAllData) {
      res.sendStatus(400);

      return;
    }

    const newExpenseId = expenses.length + 1;

    const newExpense = {
      id: newExpenseId,
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

  app.delete('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const filteredExpenses = expenses.filter(expense => (
      expense.id !== Number(expenseId)
    ));

    if (filteredExpenses.length === expenses.length) {
      res.sendStatus(404);

      return;
    }

    expenses = filteredExpenses;
    res.sendStatus(204);
  });

  app.patch('/expenses/:expenseId', express.json(), (req, res) => {
    const { expenseId } = req.params;

    const foundExpense = expenses.find(expense => (
      expense.id.toString() === expenseId
    ));

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    Object.assign(foundExpense, req.body);

    res.send(foundExpense);
  });

  return app;
}

module.exports = {
  createServer,
};
