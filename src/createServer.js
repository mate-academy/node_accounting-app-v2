'use strict';

const express = require('express');

function createServer() {
  const app = express();

  let users = [];
  let expenses = [];

  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;

    const user = users.find((person) => person.id === +id);

    if (!user) {
      res.sendStatus(404);

      return;
    }
    res.send(user);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const user = { name, id: users.length + 1 };

    users.push(user);
    res.status(201).send(user);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    const newUsers = users.filter((person) => person.id !== +id);

    if (newUsers.length === users.length) {
      res.sendStatus(404);

      return;
    }
    users = newUsers;

    res.sendStatus(204);
  });

  app.patch('/users/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const user = users.find((person) => person.id === +id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    Object.assign(user, { name, id: +id });

    res.send(user);
  });

  app.get('/expenses', (req, res) => {
    const { userId, categories, from, to } = req.query;

    let newExpenses = expenses;

    if (userId) {
      newExpenses = newExpenses.filter((exp) => exp.userId === +userId);
    }

    if (categories) {
      newExpenses = newExpenses.filter(
        (exp) => categories.includes(exp.category),
        // eslint-disable-next-line function-paren-newline
      );
    }

    if (from && to) {
      newExpenses = newExpenses.filter(
        (exp) => exp.spentAt > from && exp.spentAt < to,
      );
    }

    res.send(newExpenses);
  });

  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;

    const expense = expenses.find((exp) => exp.id === +id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }
    res.send(expense);
  });

  app.post('/expenses', express.json(), (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (
      !userId ||
      !spentAt ||
      !title ||
      !amount ||
      !category ||
      !note ||
      !users.some((user) => user.id === +userId)
    ) {
      res.sendStatus(400);

      return;
    }

    const expense = {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
      id: expenses.length + 1,
    };

    expenses.push(expense);
    res.status(201).send(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;

    const newExpenses = expenses.filter((exp) => exp.id !== +id);

    if (newExpenses.length === expenses.length) {
      res.sendStatus(404);

      return;
    }
    expenses = newExpenses;

    res.sendStatus(204);
  });

  app.patch('/expenses/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const { spentAt, title, amount, category, note } = req.body;

    const expense = expenses.find((exp) => exp.id === +id);

    if (!expense) {
      res.sendStatus(404);

      return;
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

    res.send(expense);
  });

  return app;
}

module.exports = {
  createServer,
};
