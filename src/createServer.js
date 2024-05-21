/* eslint-disable function-paren-newline */
'use strict';

const express = require('express');

function createServer() {
  const app = express();

  app.use(express.json());

  const users = [];
  const expenses = [];
  let userIdCounter = 1;
  let expenseIdCounter = 1;

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Missing required parameters' });
    }

    const newUser = { id: userIdCounter++, name };

    users.push(newUser);

    res.status(201).json(newUser);
  });

  app.get('/users', (req, res) => {
    res.status(200).json(users);
  });

  app.get('/users/:id', (req, res) => {
    const userGet = users.find((user) => user.id === parseInt(req.params.id));

    if (!userGet) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(userGet);
  });

  app.patch('/users/:id', (req, res) => {
    const { name } = req.body;
    const userPatch = users.find((user) => user.id === parseInt(req.params.id));

    if (!userPatch) {
      return res.status(404).json({ message: 'User not found' });
    }

    userPatch.name = name;
    res.status(200).json(userPatch);
  });

  app.delete('/users/:id', (req, res) => {
    const userIndex = users.findIndex(
      (user) => user.id === parseInt(req.params.id),
    );

    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }

    users.splice(userIndex, 1);
    res.status(204).send();
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId || !spentAt || !title || !amount || !category) {
      return res.status(400).json({ message: 'Missing required parameters' });
    }

    const userPost = users.find((user) => user.id === userId);

    if (!userPost) {
      return res.status(400).json({ message: 'User not found' });
    }

    const newExpense = {
      id: expenseIdCounter++,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(newExpense);
    res.status(201).json(newExpense);
  });

  app.get('/expenses', (req, res) => {
    const { userId, categories, from, to } = req.query;

    const filteredExpenses = expenses.filter((expense) => {
      return (
        (!userId || expense.userId === parseInt(userId)) &&
        (!categories ||
          (Array.isArray(categories) ? categories : [categories]).includes(
            expense.category,
          )) &&
        (!from || new Date(expense.spentAt) >= new Date(from)) &&
        (!to || new Date(expense.spentAt) <= new Date(to))
      );
    });

    res.status(200).json(filteredExpenses);
  });

  app.get('/expenses/:id', (req, res) => {
    const expense = expenses.find(
      (expenc) => expenc.id === parseInt(req.params.id),
    );

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.status(200).json(expense);
  });

  app.patch('/expenses/:id', (req, res) => {
    const { spentAt, title, amount, category, note } = req.body;
    const expense = expenses.find(
      (expens) => expens.id === parseInt(req.params.id),
    );

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    Object.assign(expense, {
      spentAt: spentAt || expense.spentAt,
      title: title || expense.title,
      amount: amount || expense.amount,
      category: category || expense.category,
      note: note || expense.note,
    });

    res.status(200).json(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const expenseIndex = expenses.findIndex(
      (expenc) => expenc.id === parseInt(req.params.id),
    );

    if (expenseIndex === -1) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    expenses.splice(expenseIndex, 1);
    res.status(204).send();
  });

  app.use((req, res) => {
    res.status(404).json({ message: 'Endpoint not found' });
  });

  return app;
}

module.exports = {
  createServer,
};
