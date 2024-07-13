'use strict';

const express = require('express');

function getHighestId(array) {
  return array.reduce(
    (acc, currentObject) => (currentObject.id > acc ? currentObject.id : acc),
    array[0]?.id || -1,
  );
}

function createServer() {
  const app = express();

  const users = [];
  const expenses = [];

  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (typeof name !== 'string') {
      res.sendStatus(400);

      return;
    }

    const newId = getHighestId(users) + 1;

    const newUser = { id: newId, name };

    users.push(newUser);

    res.statusCode = 201;
    res.send(newUser);
  });

  app.get('/users/:userId', express.json(), (req, res) => {
    const userId = +req.params.userId;

    const searchedUser = users.find((user) => user.id === userId);

    if (!searchedUser) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;
    res.send(searchedUser);
  });

  app.delete('/users/:userId', express.json(), (req, res) => {
    const userId = +req.params.userId;

    const searchedUserIndex = users.findIndex((user) => user.id === userId);

    if (searchedUserIndex === -1) {
      res.sendStatus(404);

      return;
    }

    users.splice(searchedUserIndex, 1);
    res.sendStatus(204);
  });

  app.patch('/users/:userId', express.json(), (req, res) => {
    const userId = +req.params.userId;
    const { name } = req.body;

    const searchedUser = users.find((user) => user.id === userId);

    if (searchedUser === -1) {
      res.sendStatus(404);

      return;
    }

    if (typeof name !== 'string') {
      res.sendStatus(400);
    }

    Object.assign(searchedUser, { name });

    res.statusCode = 200;
    res.send(searchedUser);
  });

  app.get('/expenses', express.json(), (req, res) => {
    const { userId, categories, from, to } = req.query;

    if (!userId && !categories && !from && !to) {
      res.send(expenses);

      return;
    }

    let expensesToSend = [];

    if (userId) {
      expensesToSend = expensesToSend.concat(
        expenses.filter((expense) => expense.userId === +userId),
      );
    }

    if (categories) {
      if (userId) {
        expensesToSend = expensesToSend.filter(
          (expense) => expense.category === categories,
        );
      } else {
        expensesToSend = expenses.filter(
          (expense) => expense.category === categories,
        );
      }
    }

    if (from && to) {
      if (userId || categories) {
        expensesToSend.filter(
          (expense) =>
            new Date(expense.spentAt) > new Date(from) &&
            new Date(expense.spentAt) < new Date(to),
        );
      } else {
        expensesToSend = expenses.filter(
          (expense) =>
            new Date(expense.spentAt) > new Date(from) &&
            new Date(expense.spentAt) < new Date(to),
        );
      }
    }

    res.statusCode = 200;
    res.send(expensesToSend);
  });

  app.post('/expenses', express.json(), (req, res) => {
    const { userId } = req.body;

    if (typeof userId !== 'number') {
      res.sendStatus(400);

      return;
    }

    if (!users.some((user) => user.id === userId)) {
      res.sendStatus(400);

      return;
    }

    const newId = getHighestId(expenses) + 1;

    const newExpense = { ...req.body, id: newId };

    expenses.push(newExpense);

    res.statusCode = 201;
    res.send(newExpense);
  });

  app.get('/expenses/:expenseId', express.json(), (req, res) => {
    const { expenseId } = req.params;

    if (expenseId === undefined) {
      res.sendStatus(400);

      return;
    }

    const searchedExpense = expenses.find(
      (expense) => expense.id === +expenseId,
    );

    if (!searchedExpense) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;
    res.send(searchedExpense);
  });

  app.delete('/expenses/:expenseId', express.json(), (req, res) => {
    const { expenseId } = req.params;

    if (expenseId === undefined) {
      res.sendStatus(404);

      return;
    }

    const searchedExpenseIndex = expenses.findIndex(
      (expense) => expense.id === +expenseId,
    );

    if (searchedExpenseIndex === -1) {
      res.sendStatus(404);

      return;
    }

    expenses.splice(searchedExpenseIndex, 1);

    res.sendStatus(204);
  });

  app.patch('/expenses/:expenseId', express.json(), (req, res) => {
    const { expenseId } = req.params;

    if (expenseId === undefined) {
      res.sendStatus(400);

      return;
    }

    const searchedExpense = expenses.find(
      (expense) => expense.id === +expenseId,
    );

    if (!searchedExpense) {
      res.sendStatus(404);

      return;
    }

    const newExpenseData = req.body;

    Object.assign(searchedExpense, newExpenseData);

    res.statusCode = 200;
    res.send(searchedExpense);
  });

  return app;
}

module.exports = {
  createServer,
};
