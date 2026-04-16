'use strict';

const express = require('express');
const cors = require('cors');

let users = [];
let expenses = [];

function createServer() {
  users = [];
  expenses = [];

  const app = express();

  app.use(express.json());
  app.use(cors());

  app.get('/users', (req, res) => {
    res.json(users);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const user = { id: users.length + 1, name };

    users.push(user);

    res.statusCode = 201;

    res.send(user);
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;

    const user = users.find((userId) => userId.id === Number(id));

    if (!user) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;

    res.send(user);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    const userForDelete = users.find((user) => user.id === Number(id));

    if (!userForDelete) {
      res.sendStatus(404);

      return;
    }

    const newUsers = users.filter((userId) => userId.id !== Number(id));

    users = newUsers;

    res.sendStatus(204);
  });

  app.patch('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const userForUpdate = users.find((user) => user.id === Number(id));

    if (!userForUpdate) {
      res.sendStatus(404);

      return;
    }

    if (!name) {
      res.sendStatus(400);

      return;
    }

    userForUpdate.name = name;

    res.statusCode = 200;

    res.send(userForUpdate);
  });

  app.get('/expenses', (req, res) => {
    let result = expenses;

    if (req.query.userId) {
      const userId = Number(req.query.userId);

      result = result.filter((expense) => expense.userId === userId);
    }

    if (req.query.categories) {
      result = result.filter(
        (expense) => expense.category === req.query.categories,
      );
    }

    if (req.query.from) {
      const fromDate = new Date(req.query.from);

      result = result.filter(
        (expense) => new Date(expense.spentAt) >= fromDate,
      );
    }

    if (req.query.to) {
      const toDate = new Date(req.query.to);

      result = result.filter((expense) => new Date(expense.spentAt) <= toDate);
    }

    return res.send(result);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (userId == null || title == null || amount == null || category == null) {
      res.sendStatus(400);

      return;
    }

    const userExist = users.find((user) => user.id === Number(userId));

    if (!userExist) {
      res.sendStatus(400);

      return;
    }

    const expense = {
      id: expenses.length + 1,
      userId: Number(userId),
      spentAt: spentAt || new Date().toISOString(),
      title: title,
      amount: amount,
      category: category,
      note: note,
    };

    expenses.push(expense);

    res.statusCode = 201;

    res.send(expense);
  });

  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;

    const expenseById = expenses.find((expense) => expense.id === Number(id));

    if (!expenseById) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;

    res.send(expenseById);
  });

  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;

    const expenseForDelete = expenses.find(
      (expense) => expense.id === Number(id),
    );

    if (!expenseForDelete) {
      res.sendStatus(404);

      return;
    }

    const newListOfExpenses = expenses.filter(
      (expense) => expense.id !== Number(id),
    );

    expenses = newListOfExpenses;

    res.sendStatus(204);
  });

  app.patch('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const { spentAt, title, amount, category, note } = req.body;

    const expenseForUpdate = expenses.find(
      (expense) => expense.id === Number(id),
    );

    if (!expenseForUpdate) {
      res.sendStatus(404);

      return;
    }

    if (spentAt !== undefined) {
      expenseForUpdate.spentAt = spentAt;
    }

    if (title !== undefined) {
      expenseForUpdate.title = title;
    }

    if (amount !== undefined) {
      expenseForUpdate.amount = amount;
    }

    if (category !== undefined) {
      expenseForUpdate.category = category;
    }

    if (note !== undefined) {
      expenseForUpdate.note = note;
    }

    res.statusCode = 200;

    res.send(expenseForUpdate);
  });
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)

  return app;
}

module.exports = {
  createServer,
};
