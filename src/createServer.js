'use strict';

const express = require('express');
const { getMaxId } = require('./utils/helpers');
const Controller = require('./controller/controller.js');
let users = [];

let expenses = [];

const handleDate = (spentAt, from, to) => {
  return {
    expenseDate: new Date(spentAt),
    fromDate: new Date(from),
    toDate: new Date(to),
  };
};

function createServer() {
  const app = express();

  app.use(express.json());

  app.get('/users', Controller.getAllUsers);

  app.post('/users', Controller.createUser);

  app.get('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const foundUser = users.find(user => user.id === Number(userId));

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.send(foundUser);
  });

  app.delete('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const filteredUsers = users.filter(user => user.id !== Number(userId));

    if (users.length === filteredUsers.length) {
      res.sendStatus(404);

      return;
    }

    users = filteredUsers;
    res.sendStatus(204);
  });

  app.patch('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const foundUser = users.find(user => user.id === Number(userId));

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    const { name } = req.body;

    Object.assign(foundUser, { name });
    res.send(foundUser);
  });

  app.get('/', Controller.hello);

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId || !spentAt || !title || !amount || !category || !note) {
      res.sendStatus(400);

      return;
    }

    const foundUser = users.find(user => user.id === Number(userId));

    if (!foundUser) {
      res.sendStatus(400);

      return;
    }

    const newExpense = {
      id: getMaxId(expenses),
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(newExpense);
    res.status(201).send(newExpense);
  });

  app.get('/expenses', (req, res) => {
    let filteredExpenses = expenses;
    const { userId, categories, from, to } = req.query;

    if (userId) {
      filteredExpenses = filteredExpenses
        .filter(expense => expense.userId === Number(userId));
    }

    if (categories) {
      filteredExpenses = filteredExpenses
        .filter(expense => categories.includes(expense.category));
    }

    if (from && to) {
      filteredExpenses = filteredExpenses.filter(expense => {
        const {
          expenseDate,
          toDate,
          fromDate,
        } = handleDate(expense.spentAt, from, to);

        return expenseDate >= fromDate && expenseDate <= toDate;
      });
    }

    res.send(filteredExpenses);
  });

  app.get('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const foundExpense = expenses
      .find(expense => expense.id === Number(expenseId));

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    res.send(foundExpense);
  });

  app.delete('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const filteredExpenses = expenses
      .filter(expense => expense.id !== Number(expenseId));

    if (filteredExpenses.length === expenses.length) {
      res.sendStatus(404);

      return;
    }

    expenses = filteredExpenses;
    res.sendStatus(204);
  });

  app.patch('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;

    if (!expenseId) {
      res.sendStatus(400);

      return;
    }

    const body = req.body;

    const foundExpense = expenses
      .find(expense => expense.id === Number(expenseId));

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }
    Object.assign(foundExpense, body);
    res.send(foundExpense);
  });

  users = [];
  expenses = [];

  return app;
}

module.exports = {
  createServer,
};
