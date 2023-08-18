'use strict';

const express = require('express');
const { getNewId } = require('./utils');

function createServer() {
  let expenses = [];
  let users = [];

  const app = express();

  // #region Users Routes
  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.get('/users/:userId', (req, res) => {
    const userId = +req.params.userId;
    const foundUser = users.find(user => user.id === userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.send(foundUser);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const newUser = {
      id: getNewId(users),
      name,
    };

    users.push(newUser);

    res.statusCode = 201;
    res.send(newUser);
  });

  app.patch('/users/:userId', express.json(), (req, res) => {
    const userId = +req.params.userId;
    const foundUser = users.find(user => user.id === userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    for (const key in req.body) {
      if (key === 'id') {
        res.sendStatus(400);

        return;
      }

      foundUser[key] = req.body[key];
    }

    res.send(foundUser);
  });

  app.delete('/users/:userId', (req, res) => {
    const userId = +req.params.userId;
    const foundUser = users.find(user => user.id === userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    users = users.filter(user => user.id !== userId);

    res.sendStatus(204);
  });
  // #endregion

  // #region Expenses Routes
  app.get('/expenses', (req, res) => {
    const userId = +req.query.userId;
    const dateFromStr = req.query.from;
    const dateToStr = req.query.to;
    const categories = req.query.categories;

    let preparedExpenses = expenses;

    if (userId) {
      preparedExpenses = preparedExpenses.filter(
        expense => expense.userId === userId
      );
    }

    if (dateFromStr) {
      const dateFrom = new Date(dateFromStr);

      preparedExpenses = preparedExpenses.filter(expense => {
        const expenseDate = new Date(expense.spentAt);

        return expenseDate >= dateFrom;
      });
    }

    if (dateToStr) {
      const dateTo = new Date(dateToStr);

      preparedExpenses = preparedExpenses.filter(expense => {
        const expenseDate = new Date(expense.spentAt);

        return expenseDate <= dateTo;
      });
    }

    if (categories) {
      preparedExpenses = preparedExpenses.filter(
        expense => expense.category === categories
      );
    }

    res.send(preparedExpenses);
  });

  app.get('/expenses/:expenseId', (req, res) => {
    const expenseId = +req.params.expenseId;
    const foundExpense = expenses.find(
      expense => expense.id === expenseId
    );

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    res.send(foundExpense);
  });

  app.post('/expenses', express.json(), (req, res) => {
    const { title, userId } = req.body;
    const foundUser = users.find(user => user.id === userId);

    if (!title || !foundUser) {
      res.sendStatus(400);

      return;
    }

    const newExpense = {
      id: getNewId(expenses),
      ...req.body,
    };

    expenses.push(newExpense);

    res.statusCode = 201;
    res.send(newExpense);
  });

  app.patch('/expenses/:expenseId', express.json(), (req, res) => {
    const expenseId = +req.params.expenseId;
    const foundExpense = expenses.find(expense => expense.id === expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    for (const key in req.body) {
      if (key === 'id') {
        res.sendStatus(400);

        return;
      }

      foundExpense[key] = req.body[key];
    }

    res.send(foundExpense);
  });

  app.delete('/expenses/:expenseId', (req, res) => {
    const expenseId = +req.params.expenseId;
    const foundExpense = expenses.find(expense => expense.id === expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    expenses = expenses.filter(expense => expense.id !== expenseId);

    res.sendStatus(204);
  });
  // #endregion

  return app;
}

module.exports = {
  createServer,
};
