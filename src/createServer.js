'use strict';

const express = require('express');
const cors = require('cors');

function getNewId(entity) {
  const maxId = Math.max(...entity.map(el => el.id));

  if (maxId) {
    return 1;
  }

  return maxId + 1;
}

function createServer() {
  const app = express();
  let expenses = [];
  let users = [];

  app.use(cors());

  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.get('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const foundUser = users.find(user => user.id === Number(userId));

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }
    res.statusCode = 200;
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

  app.delete('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const foundUser = users.find(user => user.id === Number(userId));

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    users = users.filter(user => user.id !== Number(userId));
    res.sendStatus(204);
  });

  app.patch('/users/:userId', express.json(), (req, res) => {
    const { userId } = req.params;
    const { name } = req.body;
    const foundUser = users.find(user => user.id === Number(userId));

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }
    foundUser.name = name;
    res.send(foundUser);
  });

  app.get('/expenses', (req, res) => {
    const { userId, category, from, to } = req.query;
    // console.log(expenses);
    // console.log(req.query);

    if (!userId && !category && !from && !to) {
      res.send(expenses);

      return;
    }

    if (userId) {
      expenses = expenses
        .filter(exp => exp.userId === Number(userId));
    }

    if (category) {
      expenses = expenses
        .filter(exp => exp.category === category);
    }

    if (from) {
      expenses = expenses
        .filter(exp => exp.spentAt >= from);
    }

    if (to) {
      expenses = expenses
        .filter(exp => exp.spentAt <= to);
    }

    // console.log(expenses);
    // console.log(expensesToShow);

    res.send(expenses);
  });

  app.get('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const foundExpense = expenses
      .find(expense => expense.id === Number(expenseId));
    // console.log(expenses);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    res.send(foundExpense);
  });

  app.post('/expenses', express.json(), (req, res) => {
    const { amount, category, note, spentAt, title, userId } = req.body;

    if (!amount || !category || !note || !spentAt || !title || !userId) {
      res.sendStatus(400);

      return;
    }

    const foundUser = users.find(user => user.id === Number(userId));

    if (!foundUser) {
      res.sendStatus(400);

      return;
    }

    const newExpense = {
      amount,
      category,
      id: getNewId(expenses),
      note,
      spentAt,
      title,
      userId,
    };

    users.push(newExpense);

    res.statusCode = 201;
    res.send(newExpense);
  });

  app.delete('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const foundExp = expenses.find(exp => exp.id === Number(expenseId));

    if (!foundExp) {
      res.sendStatus(404);

      return;
    }

    expenses = expenses.filter(exp => exp.id !== Number(expenseId));
    res.sendStatus(204);
  });

  app.patch('/expenses/:expenseId', express.json(), (req, res) => {
    const { expenseId } = req.params;
    const foundExp = expenses.find(exp => exp.id === Number(expenseId));

    if (!foundExp) {
      res.sendStatus(404);

      return;
    }

    const { amount, category, note, spentAt, title, userId } = req.body;

    if (!amount && !category && !note && !spentAt && !title && !userId) {
      res.sendStatus(400);

      return;
    }

    const updatedExpense = Object.assign(foundExp, req.body);

    res.send(updatedExpense);
  });

  return app;
}

module.exports = {
  createServer,
};
