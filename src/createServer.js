'use strict';

const express = require('express');

function createServer() {
  let users = [];
  let expenses = [];

  let nextUserId = 1;
  let nextExpenseId = 1;

  const app = express();

  app.get('/users', (req, res, next) => {
    res.statusCode = 200;
    res.send(users);
  });

  app.post('/users', express.json(), (req, res, next) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const user = {
      name,
      id: nextUserId,
    };

    nextUserId++;
    users.push(user);

    res.statusCode = 201;
    res.send(user);
  });

  app.get('/users/:id', (req, res, next) => {
    const { id } = req.params;
    const userId = Number(id);

    if (Number.isNaN(userId)) {
      res.sendStatus(400);

      return;
    }

    const user = users.find((u) => u.id === userId) || null;

    if (!user) {
      res.sendStatus(404);

      return;
    }

    res.send(user);
  });

  app.delete('/users/:id', (req, res, next) => {
    const { id } = req.params;

    if (!users.find((u) => u.id === +id)) {
      res.sendStatus(404);

      return;
    }

    users = users.filter((u) => u.id !== +id);
    res.sendStatus(204);
  });

  app.patch('/users/:id', express.json(), (req, res, next) => {
    const { id } = req.params;
    const userId = Number(id);
    const { name } = req.body;

    if (Number.isNaN(userId) || !name) {
      res.sendStatus(400);

      return;
    }

    const user = users.find((u) => u.id === userId);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    Object.assign(user, { name });

    res.send(user);
  });

  app.get('/expenses', (req, res, next) => {
    const { userId, categories, from, to } = req.query;
    let result = expenses;

    if (userId != null) {
      const uid = Number(userId);

      if (Number.isNaN(uid)) {
        return res.sendStatus(400);
      }
      result = result.filter((e) => e.userId === uid);
    }

    if (categories != null) {
      const cats = Array.isArray(categories) ? categories : [categories];

      result = result.filter((e) => cats.includes(e.category));
    }

    if (from != null) {
      const fromTs = Date.parse(from);

      if (Number.isNaN(fromTs)) {
        return res.sendStatus(400);
      }
      result = result.filter((e) => Date.parse(e.spentAt) >= fromTs);
    }

    if (to != null) {
      const toTs = Date.parse(to);

      if (Number.isNaN(toTs)) {
        return res.sendStatus(400);
      }
      result = result.filter((e) => Date.parse(e.spentAt) <= toTs);
    }

    res.send(result);
  });

  app.post('/expenses', express.json(), (req, res, next) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (
      userId == null ||
      spentAt == null ||
      title == null ||
      amount == null ||
      category == null
    ) {
      return res.sendStatus(400);
    }

    if (!users.find((u) => u.id === +userId)) {
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

    nextExpenseId++;
    expenses.push(expense);
    res.statusCode = 201;
    res.send(expense);
  });

  app.get('/expenses/:id', (req, res, next) => {
    const { id } = req.params;
    const expenseId = Number(id);

    if (Number.isNaN(expenseId)) {
      res.sendStatus(400);

      return;
    }

    const expense = expenses.find((exp) => exp.id === expenseId);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    res.send(expense);
  });

  app.delete('/expenses/:id', (req, res, next) => {
    const { id } = req.params;

    if (!expenses.find((exp) => exp.id === +id)) {
      res.sendStatus(404);

      return;
    }

    expenses = expenses.filter((exp) => exp.id !== +id);
    res.sendStatus(204);
  });

  app.patch('/expenses/:id', express.json(), (req, res, next) => {
    const { id } = req.params;
    const { spentAt, title, amount, category, note } = req.body;
    const expenseId = Number(id);

    if (Number.isNaN(expenseId)) {
      res.sendStatus(400);

      return;
    }

    const expense = expenses.find((exp) => exp.id === expenseId);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    if (spentAt != null) {
      expense.spentAt = spentAt;
    }

    if (title != null) {
      expense.title = title;
    }

    if (amount != null) {
      expense.amount = amount;
    }

    if (category != null) {
      expense.category = category;
    }

    if (note != null) {
      expense.note = note;
    }

    res.send(expense);
  });

  return app;
}

module.exports = {
  createServer,
};
