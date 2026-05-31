'use strict';

const express = require('express');
const cors = require('cors');

function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  const users = [];
  const expenses = [];

  let nextUserId = 1;
  let nextExpenseId = 1;

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const user = {
      id: nextUserId,
      name,
    };

    nextUserId += 1;
    users.push(user);

    res.status(201).json(user);
  });

  app.get('/users', (req, res) => {
    res.json(users);
  });

  app.get('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((currentUser) => currentUser.id === id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    res.json(user);
  });

  app.patch('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((currentUser) => currentUser.id === id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    user.name = name;

    res.json(user);
  });

  app.delete('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const userIndex = users.findIndex((currentUser) => currentUser.id === id);

    if (userIndex === -1) {
      res.sendStatus(404);

      return;
    }

    users.splice(userIndex, 1);

    res.sendStatus(204);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (
      userId === undefined ||
      !spentAt ||
      !title ||
      amount === undefined ||
      !category
    ) {
      res.sendStatus(400);

      return;
    }

    const user = users.find((currentUser) => currentUser.id === userId);

    if (!user) {
      res.sendStatus(400);

      return;
    }

    const expense = {
      id: nextExpenseId,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    nextExpenseId += 1;
    expenses.push(expense);

    res.status(201).json(expense);
  });

  app.get('/expenses', (req, res) => {
    const { userId, from, to, categories } = req.query;

    let filteredExpenses = [...expenses];

    if (userId) {
      filteredExpenses = filteredExpenses.filter(
        (expense) => expense.userId === Number(userId),
      );
    }

    if (from) {
      filteredExpenses = filteredExpenses.filter(
        (expense) => new Date(expense.spentAt) >= new Date(from),
      );
    }

    if (to) {
      filteredExpenses = filteredExpenses.filter(
        (expense) => new Date(expense.spentAt) <= new Date(to),
      );
    }

    if (categories) {
      const categoryList = []
        .concat(categories)
        .flatMap((category) => category.split(','));

      filteredExpenses = filteredExpenses.filter((expense) => {
        return categoryList.includes(expense.category);
      });
    }

    res.json(filteredExpenses);
  });

  app.get('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);
    const expense = expenses.find((currentExpense) => currentExpense.id === id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    res.json(expense);
  });

  app.patch('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);
    const expense = expenses.find((currentExpense) => currentExpense.id === id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    const { userId, spentAt, title, amount, category, note } = req.body;

    if (userId !== undefined) {
      const user = users.find((currentUser) => currentUser.id === userId);

      if (!user) {
        res.sendStatus(400);

        return;
      }

      expense.userId = userId;
    }

    if (spentAt !== undefined) {
      expense.spentAt = spentAt;
    }

    if (title !== undefined) {
      expense.title = title;
    }

    if (amount !== undefined) {
      expense.amount = amount;
    }

    if (category !== undefined) {
      expense.category = category;
    }

    if (note !== undefined) {
      expense.note = note;
    }

    res.json(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);
    const expenseIndex = expenses.findIndex(
      (currentExpense) => currentExpense.id === id,
    );

    if (expenseIndex === -1) {
      res.sendStatus(404);

      return;
    }

    expenses.splice(expenseIndex, 1);

    res.sendStatus(204);
  });

  return app;
}

module.exports = {
  createServer,
};
