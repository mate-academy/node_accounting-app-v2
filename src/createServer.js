'use strict';

const express = require('express');
const cors = require('cors');
const usersService = require('./services/users.js');
const expensesService = require('./services/expenses.js');

function createServer() {
  usersService.resetUsers();
  expensesService.resetExpenses();

  const app = express();

  app.use(cors());

  app.get('/users', (req, res) => {
    res.statusCode = 200;
    res.send(usersService.getAll());
  });

  app.get('/users/:id', (req, res) => {
    const id = req.params.id;

    if (!isFinite(id)) {
      res.sendStatus(400);

      return;
    }

    const user = usersService.findUserById(id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    res.send(user);
  });

  app.post('/users', express.json({ extended: true }), (req, res) => {
    const newUserName = req.body.name;

    if (!newUserName || usersService.getAll()
      .some(user => user.name === newUserName)) {
      res.sendStatus(400);

      return;
    }

    res.statusCode = 201;

    const newUser = usersService.create(newUserName);

    res.send(newUser);
  });

  app.delete('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const foundedUser = usersService.findUserById(id);

    if (!foundedUser) {
      res.sendStatus(404);

      return;
    }
    usersService.remove(id);

    res.sendStatus(204);
  });

  app.patch('/users/:id', express.json({ extended: true }), (req, res) => {
    const id = Number(req.params.id);
    const newUserName = req.body.name;

    if (!isFinite(id) || !newUserName) {
      res.sendStatus(400);

      return;
    }

    const user = usersService.findUserById(id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    user.name = newUserName;
    res.statusCode = 200;
    res.send(user);
  });

  app.get('/expenses', (req, res) => {
    res.statusCode = 200;
    res.send(expensesService.getAll(req.query));
  });

  app.post('/expenses', express.json({ extended: true }), (req, res) => {
    const {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    } = req.body;
    const spentAtDate = new Date(spentAt);

    // console.log(typeof note !== 'string' || !isFinite(amount)
    // || !usersService.findUserById(userId));

    if (!isFinite(userId) || !isFinite(spentAtDate)
      || typeof title !== 'string' || typeof category !== 'string'
      || typeof note !== 'string' || !isFinite(amount)
      || !usersService.findUserById(userId)) {
      res.sendStatus(400);

      return;
    }

    res.statusCode = 201;

    const newExpense = {
      userId: +userId,
      spentAt: spentAtDate,
      title,
      amount,
      category,
      note,
    };

    const createdExppense = expensesService.create(newExpense);

    res.send(createdExppense);
  });

  app.get('/expenses/:id', (req, res) => {
    const id = req.params.id;

    if (!isFinite(id)) {
      res.sendStatus(400);

      return;
    }

    const expense = expensesService.findExpensesById(id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    res.send(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);
    const foundedExpenses = expensesService.findExpensesById(id);

    if (!foundedExpenses) {
      res.sendStatus(404);

      return;
    }
    expensesService.remove(id);
    res.sendStatus(204);
  });

  app.patch('/expenses/:id', express.json({ extended: true }), (req, res) => {
    const id = Number(req.params.id);

    const expense = expensesService.findExpensesById(id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    if (!Object.keys(req.body).length) {
      res.sendStatus(400);

      return;
    }
    expensesService.update(req.body, expense);

    res.statusCode = 200;
    res.send(expense);
  });

  return app;
}

module.exports = {
  createServer,
};
