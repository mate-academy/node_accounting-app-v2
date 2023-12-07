/* eslint-disable no-unused-vars */
'use strict';

const express = require('express');

function createServer() {
  const NOT_FOUND_CODE = 404;
  const NOT_FOUND_MESSAGE = 'Page not found';
  const BAD_REQUEST_MESSAGE = 'Bad reques';
  const BAD_REQUEST_CODE = 400;

  const app = express();
  let users = [];
  let expenses = [];

  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.post('/users', express.json(), (req, res) => {
    const getName = req.body.name ? req.body.name.trim() : undefined;
    const createId = users.length
      ? Math.max(...users.map((user) => user.id)) + 1
      : 0;

    if (!getName) {
      res.status(BAD_REQUEST_CODE).send(BAD_REQUEST_MESSAGE);

      return;
    }

    const newUser = {
      id: createId,
      name: getName,
    };

    users.push(newUser);
    res.status(201);
    res.send(newUser);
  });

  app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    const getUser = users.find((user) => user.id === +id);

    if (!getUser) {
      res.status(NOT_FOUND_CODE).json(NOT_FOUND_MESSAGE);

      return;
    }

    res.send(getUser);
  });

  app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    const newUser = users.filter((user) => user.id !== +id);

    const chackId = users.find((user) => user.id === +id);

    if (!chackId) {
      res.status(NOT_FOUND_CODE).json(NOT_FOUND_MESSAGE);

      return;
    }
    users = newUser;
    res.sendStatus(204);
  });

  app.patch('/users/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const getUser = users.find((user) => user.id === +id);

    if (!getUser) {
      res.status(NOT_FOUND_CODE).json(NOT_FOUND_MESSAGE);

      return;
    }
    getUser.name = name;

    res.send(getUser);
  });

  app.get('/expenses', (req, res) => {
    const { userId, categories, from, to } = req.query;

    let newExpense = expenses;

    if (userId) {
      newExpense = expenses.filter((expense) => expense.userId === +userId);

      if (newExpense.length === 0) {
        res.status(NOT_FOUND_CODE).json(NOT_FOUND_MESSAGE);

        return;
      }
    }

    if (categories) {
      newExpense = newExpense.filter((item) =>
        categories.includes(item.category),
      );
    }

    if (from && to) {
      newExpense = newExpense.filter(
        (item) =>
          new Date(item.spentAt) <= new Date(to)
          && new Date(item.spentAt) >= new Date(from),
      );
    }
    res.send(newExpense);
  });

  app.post('/expenses', express.json(), (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;
    const hasUser = users.find((user) => user.id === +userId);
    const createId = expenses.length
      ? Math.max(...expenses.map((expens) => expens.id)) + 1
      : 0;

    if (!hasUser || !spentAt || !title || !amount || !category || !note) {
      res.status(BAD_REQUEST_CODE).send(BAD_REQUEST_MESSAGE);

      return;
    }

    const newExpens = {
      id: createId,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(newExpens);
    res.status(201);
    res.send(newExpens);
  });

  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;

    const getExpenses = expenses.find((expens) => expens.id === +id);

    if (!getExpenses) {
      res.status(NOT_FOUND_CODE).send(NOT_FOUND_MESSAGE);

      return;
    }
    res.send(getExpenses);
  });

  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const findExpens = expenses.filter((expens) => expens.id !== +id);

    const chackId = expenses.find((expens) => expens.id === +id);

    if (!chackId) {
      res.status(NOT_FOUND_CODE).send(NOT_FOUND_MESSAGE);

      return;
    }

    expenses = findExpens;
    res.sendStatus(204);
  });

  app.patch('/expenses/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const { spentAt, title, amount, category, note, userId } = req.body;
    const findExpens = expenses.find((expens) => expens.id === +id);

    if (
      (spentAt && typeof spentAt !== 'string')
      || (title && typeof title !== 'string')
      || (amount && typeof amount !== 'number')
      || (note && typeof note !== 'string')
    ) {
      res.status(BAD_REQUEST_CODE).send(BAD_REQUEST_MESSAGE);
    }

    if (!findExpens) {
      res.status(NOT_FOUND_CODE).send(NOT_FOUND_MESSAGE);

      return;
    }

    Object.assign(findExpens, {
      id: findExpens.id,
      spentAt: findExpens.spentAt,
      title,
      amount: findExpens.amount,
      category: findExpens.category,
      note: findExpens.note,
    });
    res.send(findExpens);
  });

  return app;
}

module.exports = {
  createServer,
};
