'use strict';

const express = require('express');
const userServise = require('./services/users.js');

const expenseServise = require('./services/expenses.js');
const expenseRouter = require('./routers/expenseRouter.js');

function createServer() {
  const app = express();

  app.use('/expenses', express.json(), expenseRouter);
  expenseServise.init();

  userServise.init();

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const newUser = {
      id: Math.floor(Math.random() * 10),
      name,
    };

    userServise.add(newUser);

    res.statusCode = 201;
    res.send(newUser);
  });

  app.get('/users', express.json(), (req, res) => {
    const users = userServise.getAll();

    res.statusCode = 200;

    if (!users) {
      res.send([]);

      return;
    }

    res.send(users);
  });

  app.get('/users/:id', express.json(), (req, res) => {
    const userId = Number(req.params.id);

    if (typeof userId !== 'number') {
      res.sendStatus(400);

      return;
    }

    const foundUser = userServise.findById(userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;

    res.send(foundUser);
  });

  app.patch('/users/:id', express.json(), (req, res) => {
    const userId = Number(req.params.id);

    if (typeof userId !== 'number') {
      res.sendStatus(400);

      return;
    }

    const foundUser = userServise.findById(userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    userServise.update(foundUser, { ...req.body });

    res.statusCode = 200;

    res.send(foundUser);
  });

  app.delete('/users/:id', express.json(), (req, res) => {
    const userId = Number(req.params.id);

    const foundUser = userServise.findById(userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    userServise.remove(foundUser.id);
    res.sendStatus(204);
  });

  return app;
}

module.exports = {
  createServer,
};
