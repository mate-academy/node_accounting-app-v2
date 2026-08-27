'use strict';

const express = require('express');

function createServer() {
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)
  const app = express();
  const users = [];
  const expenses = [];
  let nextUserId = 1;
  let nextExpenseId = 1;

  app.use(express.json());

  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.get('/users/:id', (req, res) => {
    const userId = Number(req.params.id);

    if (!userId) {
      return res.status(400).send({
        message: 'User id is required',
      });
    }

    const user = users.find((us) => us.id === userId);

    if (!user) {
      return res.status(404).send({
        message: 'User does not exist',
      });
    }

    return res.status(200).send(user);
  });

  app.post('/users', (req, res) => {
    const userName = req.body.name;

    if (!userName) {
      return res.status(400).send({
        message: 'User name is required',
      });
    }

    const newUser = {
      id: nextUserId,
      name: userName,
    };

    users.push(newUser);
    nextUserId++;
    res.status(201).send(newUser);
  });

  app.delete('/users/:id', (req, res) => {
    const userId = Number(req.params.id);

    if (!userId) {
      return res.status(400).send({ message: 'User id is required' });
    }

    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
      return res.status(404).send({ message: 'User does not exist' });
    }

    users.splice(userIndex, 1);

    return res.status(204).end();
  });

  app.patch('/users/:id', (req, res) => {
    const userId = Number(req.params.id);
    const userName = req.body.name;

    if (!userId) {
      return res.status(400).send({
        message: 'User id is required',
      });
    }

    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
      return res.status(404).send({
        message: 'User does not exist',
      });
    }

    if (!userName) {
      return res.status(400).send({
        message: 'User name is required',
      });
    }

    users[userIndex].name = userName;

    return res.status(200).send(users[userIndex]);
  });

  app.get('/expenses', (req, res) => {
    const { userId, categories, from, to } = req.query;

    let result = expenses;

    if (userId) {
      result = result.filter((expense) => expense.userId === Number(userId));
    }

    if (categories) {
      const categoryList = Array.isArray(categories)
        ? categories
        : [categories];

      const isCategoryIncluded = (expense) =>
        categoryList.includes(expense.category);

      result = result.filter(isCategoryIncluded);
    }

    if (from) {
      result = result.filter(
        (expense) => new Date(expense.spentAt) >= new Date(from),
      );
    }

    if (to) {
      result = result.filter(
        (expense) => new Date(expense.spentAt) <= new Date(to),
      );
    }

    return res.status(200).send(result);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId) {
      return res.status(400).send({
        message: 'User id is required',
      });
    }

    if (!spentAt) {
      return res.status(400).send({
        message: 'Spent at is required',
      });
    }

    if (!title) {
      return res.status(400).send({
        message: 'Title is required',
      });
    }

    if (!amount) {
      return res.status(400).send({
        message: 'Amount is required',
      });
    }

    const user = users.find((us) => us.id === userId);

    if (!user) {
      return res.status(400).send({
        message: 'User does not exist',
      });
    }

    const newExpense = {
      id: nextExpenseId,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(newExpense);
    nextExpenseId++;

    return res.status(201).send(newExpense);
  });

  app.get('/expenses/:id', (req, res) => {
    const expenseId = Number(req.params.id);

    if (!expenseId) {
      return res.status(400).send({
        message: 'Expense id is required',
      });
    }

    const expense = expenses.find((ex) => ex.id === expenseId);

    if (!expense) {
      return res.status(404).send({
        message: 'Expense does not exist',
      });
    }

    return res.status(200).send(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const expenseId = Number(req.params.id);

    if (!expenseId) {
      return res.status(400).send({
        message: 'Expense id is required',
      });
    }

    const expenseIndex = expenses.findIndex((ex) => ex.id === expenseId);

    if (expenseIndex === -1) {
      return res.status(404).send({ message: 'Expense does not exist' });
    }

    expenses.splice(expenseIndex, 1);

    return res.status(204).end();
  });

  app.patch('/expenses/:id', (req, res) => {
    const expenseId = Number(req.params.id);

    if (!expenseId) {
      return res.status(400).send({
        message: 'Expense id is required',
      });
    }

    const expenseIndex = expenses.findIndex(
      (expense) => expense.id === expenseId,
    );

    if (expenseIndex === -1) {
      return res.status(404).send({
        message: 'Expense does not exist',
      });
    }

    expenses[expenseIndex] = {
      ...expenses[expenseIndex],
      ...req.body,
    };

    return res.status(200).send(expenses[expenseIndex]);
  });

  return app;
}

module.exports = {
  createServer,
};
