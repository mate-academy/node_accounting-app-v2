/* eslint-disable no-console */
'use strict';

const express = require('express');

function createServer() {
  const app = express();

  app.use(express.json());

  const users = [];
  const expenses = [];

  const findUserById = (userId) => users.find(
    user => user.id === userId);
  const findExpenseById = (expenseId) => expenses.find(
    expense => expense.id === expenseId);

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId || !spentAt || !title || !amount || !category || !note) {
      res.status(400).send({ message: 'Required parameter(s) missing' });

      return;
    }

    const user = findUserById(userId);

    if (!user) {
      res.status(400).send({ message: 'User not found' });

      return;
    }

    const expense = {
      id: expenses.length + 1,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(expense);
    res.status(201).send(expense);
  });

  app.get('/expenses', (req, res) => {
    const { from, to, categories } = req.query;
    const userId = parseInt(req.query.userId);

    let filteredExpenses = expenses;

    if (userId) {
      filteredExpenses = filteredExpenses.filter(
        expense => expense.userId === userId);
    }

    if (categories) {
      const categoryList = categories.split(',');

      filteredExpenses = filteredExpenses.filter(
        expense => categoryList.includes(expense.category));
    }

    if (from && to) {
      filteredExpenses = filteredExpenses.filter(expense =>
        new Date(expense.spentAt)
        >= new Date(from) && new Date(expense.spentAt) <= new Date(to)
      );
    }

    res.status(200).send(filteredExpenses);
  });

  app.get('/expenses/:id', (req, res) => {
    const expenseId = parseInt(req.params.id);
    const expense = findExpenseById(expenseId);

    if (!expense) {
      res.status(404).send({ message: 'Expense not found' });
    }

    res.status(200).send(expense);
  });

  app.patch('/expenses/:id', (req, res) => {
    const expenseId = parseInt(req.params.id);
    const expense = findExpenseById(expenseId);

    if (!expense) {
      res.status(404).send({ message: 'Expense not found' });

      return;
    }

    const { title, amount, category, note } = req.body;

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

    res.status(200).send(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const expenseId = parseInt(req.params.id);
    const index = expenses.findIndex(expense => expense.id === expenseId);

    if (index === -1) {
      return res.status(404).send({ message: 'Expense not found' });
    }

    expenses.splice(index, 1);
    res.status(204).end();
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.status(400).send({ message: 'Required parameter(s) missing' });

      return;
    }

    const user = {
      id: users.length + 1,
      name,
    };

    users.push(user);

    res.status(201).send(user);
  });

  app.get('/users', (req, res) => {
    res.status(200).send(users);
  });

  app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = findUserById(userId);

    if (!user) {
      res.status(404).send({ message: 'User not found' });

      return;
    }

    res.status(200).send(user);
  });

  app.patch('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = findUserById(userId);
    const { name } = req.body;

    if (!user) {
      res.status(404).send({ message: 'User not found' });

      return;
    }

    if (typeof name !== 'string') {
      res.sendStatus(422);

      return;
    }

    Object.assign(user, { name });

    res.status(200).send(user);
  });

  app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const index = users.findIndex(user => user.id === userId);

    if (index === -1) {
      res.status(404).send({ message: 'User not found' });

      return;
    }

    users.splice(index, 1);
    res.status(204).end();
  });

  return app;
}

module.exports = {
  createServer,
};
