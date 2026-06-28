'use strict';

const cors = require('cors');
const express = require('express');

function createServer() {
  const app = express();

  let users = [];
  let expenses = [];
  let nextUserId = 1;
  let nextExpenseId = 1;

  const findUserById = (id) => users.find((user) => user.id === Number(id));

  const findExpenseById = (id) =>
    expenses.find((expense) => expense.id === Number(id));

  const isMissing = (value) => value === undefined || value === null;

  const hasRequiredExpenseFields = (expense) => {
    const requiredFields = ['userId', 'spentAt', 'title', 'amount', 'category'];

    return requiredFields.every((field) => !isMissing(expense[field]));
  };

  app.use(cors());
  app.use(express.json());

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.status(400).send({ message: 'Name is required' });

      return;
    }

    const user = {
      id: nextUserId,
      name,
    };

    nextUserId += 1;
    users.push(user);

    res.status(201).send(user);
  });

  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.get('/users/:id', (req, res) => {
    const user = findUserById(req.params.id);

    if (!user) {
      res.status(404).send({ message: 'User not found' });

      return;
    }

    res.send(user);
  });

  app.patch('/users/:id', (req, res) => {
    const user = findUserById(req.params.id);

    if (!user) {
      res.status(404).send({ message: 'User not found' });

      return;
    }

    const { name } = req.body;

    if (!name) {
      res.status(400).send({ message: 'Name is required' });

      return;
    }

    user.name = name;

    res.send(user);
  });

  app.delete('/users/:id', (req, res) => {
    const user = findUserById(req.params.id);

    if (!user) {
      res.status(404).send({ message: 'User not found' });

      return;
    }

    users = users.filter((currentUser) => currentUser.id !== user.id);
    expenses = expenses.filter((expense) => expense.userId !== user.id);

    res.sendStatus(204);
  });

  app.post('/expenses', (req, res) => {
    const expenseData = req.body;

    if (!hasRequiredExpenseFields(expenseData)) {
      res.status(400).send({ message: 'Required expense field is missing' });

      return;
    }

    if (!findUserById(expenseData.userId)) {
      res.status(400).send({ message: 'User not found' });

      return;
    }

    const expense = {
      id: nextExpenseId,
      ...expenseData,
    };

    nextExpenseId += 1;
    expenses.push(expense);

    res.status(201).send(expense);
  });

  app.get('/expenses', (req, res) => {
    const { userId, from, to, categories } = req.query;
    const categoryList = categories ? categories.split(',') : [];
    const fromTime = from ? Date.parse(from) : null;
    const toTime = to ? Date.parse(to) : null;

    const filteredExpenses = expenses.filter((expense) => {
      const spentAtTime = Date.parse(expense.spentAt);

      if (userId && expense.userId !== Number(userId)) {
        return false;
      }

      if (fromTime && spentAtTime < fromTime) {
        return false;
      }

      if (toTime && spentAtTime > toTime) {
        return false;
      }

      if (categoryList.length > 0 && !categoryList.includes(expense.category)) {
        return false;
      }

      return true;
    });

    res.send(filteredExpenses);
  });

  app.get('/expenses/:id', (req, res) => {
    const expense = findExpenseById(req.params.id);

    if (!expense) {
      res.status(404).send({ message: 'Expense not found' });

      return;
    }

    res.send(expense);
  });

  app.patch('/expenses/:id', (req, res) => {
    const expense = findExpenseById(req.params.id);

    if (!expense) {
      res.status(404).send({ message: 'Expense not found' });

      return;
    }

    const { userId } = req.body;

    if (!isMissing(userId) && !findUserById(userId)) {
      res.status(400).send({ message: 'User not found' });

      return;
    }

    Object.assign(expense, req.body);

    res.send(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const expense = findExpenseById(req.params.id);

    if (!expense) {
      res.status(404).send({ message: 'Expense not found' });

      return;
    }

    expenses = expenses.filter(
      (currentExpense) => currentExpense.id !== expense.id,
    );

    res.sendStatus(204);
  });

  return app;
}

module.exports = {
  createServer,
};
