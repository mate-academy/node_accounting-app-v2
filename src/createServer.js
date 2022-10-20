'use strict';

const express = require('express');

function createServer() {
  const app = express();

  let expenses = [];
  let users = [];

  app.post('/expenses', express.json(), (req, res) => {
    const {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    } = req.body;

    if (!title || !users.some(user => user.id === userId)) {
      res.sendStatus(400);

      return;
    }

    const newExpense = {
      userId,
      spentAt,
      title,
      amount,
      category,
      id: Math.floor(Math.random() * 10),
      note,
    };

    expenses.push(newExpense);

    res.statusCode = 201;

    res.send(newExpense);
  });

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

    users.push(newUser);

    res.statusCode = 201;
    res.send(newUser);
  });

  return app;
}

module.exports = {
  createServer,
};
