/* eslint-disable prettier/prettier */
'use strict';

const express = require('express');
const cors = require('cors');

function createServer() {
  let users = [];

  let expenses = [];
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;

    if (isNaN(+id)) {
      res.sendStatus(400);

      return;
    }

    const result = users.find((user) => +user.id === +id);

    if (!result) {
      res.sendStatus(404);

      return;
    }

    res.send(result);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const newUser = {
      id: Date.now(),
      name: name,
    };

    users.push(newUser);

    return res.status(201).send(newUser);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    if (isNaN(+id)) {
      res.sendStatus(400);

      return;
    }

    if (!users.find((user) => +user.id === +id)) {
      res.sendStatus(404);

      return;
    }

    const filteredUsers = users.filter((user) => +user.id !== +id);

    users = filteredUsers;

    res.sendStatus(204);
  });

  app.patch('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (isNaN(+id)) {
      res.sendStatus(400);

      return;
    }

    if (!name || typeof name !== 'string') {
      res.sendStatus(400);

      return;
    }

    const currentUser = users.find((user) => +user.id === +id);

    if (!currentUser) {
      res.sendStatus(404);

      return;
    }

    Object.assign(currentUser, { name });
    res.send(currentUser);
  });

  app.get('/expenses', (req, res) => {
    const { userId, from, to, categories } = req.query;
    let filtered = expenses;

    if (userId) {
      filtered = filtered.filter((expense) => +expense.userId === +userId);
    }

    if (from && to) {
      const fromTimestamp = new Date(from).getTime();
      const toTimestamp = new Date(to).getTime();

      filtered = filtered.filter(
        (expense) =>
          new Date(expense.spentAt).getTime() >= fromTimestamp &&
          new Date(expense.spentAt).getTime() <= toTimestamp,
      );
    }

    if (categories) {
      filtered = filtered.filter((expense) => expense.category === categories);
    }

    res.send(filtered);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!title || !userId) {
      res.sendStatus(400);

      return;
    }

    if (!users.find((user) => +user.id === +userId)) {
      res.sendStatus(400);

      return;
    }

    if (
      typeof spentAt !== 'string' ||
      typeof title !== 'string' ||
      typeof category !== 'string' ||
      typeof note !== 'string' ||
      typeof amount !== 'number'
    ) {
      res.status(400).send('Unprocessable Entity');

      return;
    }

    const currentExpense = {
      id: Date.now(),
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(currentExpense);
    res.statusCode = 201;
    res.send(currentExpense);
  });

  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;

    if (isNaN(+id)) {
      res.sendStatus(400);

      return;
    }

    const result = expenses.find((expense) => +expense.id === +id);

    if (!result) {
      res.sendStatus(404);

      return;
    }

    res.send(result);
  });

  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;

    if (isNaN(+id)) {
      res.sendStatus(400);

      return;
    }

    const expenseToDelete = expenses.find((expense) => +expense.id === +id);

    if (!expenseToDelete) {
      return res.sendStatus(404);
    }

    expenses = expenses.filter((expense) => +expense.id !== +id);

    res.sendStatus(204);
  });

  app.patch('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const { spentAt, title, amount, category, note } = req.body;

    const currentExpense = expenses.find((expense) => +expense.id === +id);

    if (!currentExpense) {
      return res.sendStatus(404);
    }

    currentExpense.spentAt = spentAt ?? currentExpense.spentAt;
    currentExpense.title = title ?? currentExpense.title;
    currentExpense.amount = amount ?? currentExpense.amount;
    currentExpense.category = category ?? currentExpense.category;
    currentExpense.note = note ?? currentExpense.note;

    res.send(currentExpense);
  });

  return app;
}

module.exports = {
  createServer,
};
