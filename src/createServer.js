'use strict';

const express = require('express');
const { usersService } = require('./service/users.js');
const { expensesService } = require('./service/expense.js');

function createServer() {
  const app = express();

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    };

    const newUser = usersService.create(name);

    res.statusCode = 201;
    res.send(newUser);
  });

  app.get('/users', express.json(), (req, res) => {
    const users = usersService.getAll();

    if (!users.length) {
      res.send([]);

      return;
    }

    res.send(users);
  });

  app.get('/users/:userId', express.json(), (req, res) => {
    const userId = +req.params.userId;

    if (typeof userId !== 'number') {
      res.sendStatus(400);

      return;
    }

    const foundUser = usersService.getById(userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.sendStatus = 200;
    res.send(foundUser);
  });

  app.patch('/users/:userId', express.json(), (req, res) => {
    const userId = +req.params.userId;
    const { name } = req.body;

    if (typeof userId !== 'number') {
      res.sendStatus(400);

      return;
    }

    const foundUser = usersService.getById(userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    usersService.update({
      id: userId,
      name,
    });

    res.send(foundUser);
  });

  app.delete('/users/:userId', express.json(), (req, res) => {
    const userId = +req.params.userId;

    if (typeof userId !== 'number') {
      res.sendStatus(400);

      return;
    }

    const foundUser = usersService.getById(userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    usersService.remove(userId);
    res.sendStatus(204);
  });

  usersService.init();

  // ------------------------------------------------------
  let nextExpenseId = 1;

  app.post('/expenses', express.json(), (req, res) => {
    const {
      userId,
      title,
    } = req.body;

    if (!usersService.getById(userId) || !title) {
      res.sendStatus(400);

      return;
    }

    const newExpense = {
      ...req.body,
      id: nextExpenseId++,
    };

    expensesService.add(newExpense);

    res.statusCode = 201;
    res.send(newExpense);
  });

  app.get('/expenses', express.json(), (req, res) => {
    const {
      userId,
      category,
      from,
      to,
    } = req.query;

    const expenses = expensesService.getAll();

    if (typeof +userId !== 'number') {
      res.sendStatus(400);

      return;
    };

    if (usersService.getById(+userId)) {
      let userExpenses = expenses.filter(
        expense => expense.userId === +userId
      );

      if (category) {
        userExpenses = userExpenses.filter(
          expense => expense.category === category
        );
      }

      res.send(userExpenses);

      return;
    }

    if (from && to) {
      const expensesBetweenDate = expenses.filter(
        (expense) => expense.spentAt >= from && expense.spentAt <= to);

      res.send(expensesBetweenDate);

      return;
    }

    res.send(expenses);
  });

  app.get('/expenses/:expenseId', express.json(), (req, res) => {
    const expenseId = +req.params.expenseId;

    if (typeof expenseId !== 'number') {
      res.sendStatus(400);

      return;
    }

    const foundExpense = expensesService.findById(expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    res.send(foundExpense);
  });

  app.patch('/expenses/:expenseId', express.json(), (req, res) => {
    const { title } = req.body;
    const expenseId = +req.params.expenseId;

    if (typeof expenseId !== 'number') {
      res.sendStatus(400);

      return;
    }

    const foundExpense = expensesService.findById(expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    const newExpense = expensesService.update(title, foundExpense);

    res.send(newExpense);
  });

  app.delete('/expenses/:expenseId', express.json(), (req, res) => {
    const expenseId = +req.params.expenseId;

    const foundExpense = expensesService.findById(expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    expensesService.remove(+expenseId);

    res.sendStatus(204);
  });

  expensesService.init();

  return app;
}

module.exports = {
  createServer,
};
