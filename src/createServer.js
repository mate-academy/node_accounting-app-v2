'use strict';

const express = require('express');

function createServer() {
  const router = express.Router();
  const app = express();

  let users = [];
  let expenses = [];

  app.use(router);

  router.get('/users', (req, res) => res.send(users));

  router.get('/users/:userId', (req, res) => {
    const { userId } = req.params;

    if (isNaN(+userId)) {
      res.sendStatus(400);

      return;
    }

    const foundUser = users.find(user => user.id === +userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.send(foundUser);
  });

  router.post('/users', express.json(), (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const { name } = req.body;

    if (!name || !name.trim().length || typeof name !== 'string') {
      res.sendStatus(400);

      return;
    }

    const newUser = {
      id: users.length,
      name: name.trim(),
    };

    users.push(newUser);

    res.statusCode = 201;
    res.send(newUser);
  });

  router.delete('/users/:userId', express.json(), (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const { userId } = req.params;

    if (isNaN(+userId)) {
      res.sendStatus(400);

      return;
    }

    const foundUser = users.find(user => user.id === +userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    users = users.filter(user => user.id !== foundUser.id);
    res.sendStatus(204);
  });

  router.patch('/users/:userId', express.json(), (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const { userId } = req.params;

    if (isNaN(+userId)) {
      res.sendStatus(400);

      return;
    }

    const foundUser = users.find(user => user.id === +userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    const { name } = req.body;

    if (!name || !name.trim().length || typeof name !== 'string') {
      res.sendStatus(400);

      return;
    }

    users = users.map(user => user.id === foundUser.id
      ? {
        ...user,
        name,
      } : user
    );

    res.statusCode = 200;
    res.send(users.find(user => user.id === +userId));
  });

  router.get('/expenses', (req, res) => {
    const {
      userId,
      categories,
      from,
      to,
    } = req.query;

    if (!userId && !categories && !from && !to) {
      res.send(expenses);

      return;
    }

    if (userId && userId.length > 0) {
      const foundedUser = users.find(user => user.id === +userId);

      if (!foundedUser) {
        res.sendStatus(404);

        return;
      }

      const foundedExpenses = !categories
        ? expenses.filter(expense => expense.userId === +userId)
        : expenses.filter(expense => expense.category === categories);

      res.statusCode = 200;
      res.send(foundedExpenses);

      return;
    }

    if (from.length > 0 && to.length > 0) {
      const foundedExpenses = expenses.filter(expense => (
        expense.spentAt > from && expense.spentAt <= to
      ));

      res.statusCode = 200;
      res.send(foundedExpenses);
    }

    res.sendStatus(400);
  });

  router.get('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;

    if (isNaN(+expenseId)) {
      res.sendStatus(400);

      return;
    }

    const foundexpense = expenses.find(expense => expense.id === +expenseId);

    if (!foundexpense) {
      res.sendStatus(404);

      return;
    }

    res.send(foundexpense);
  });

  router.post('/expenses', express.json(), (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    if (!req.body) {
      res.sendStatus(400);

      return;
    }

    const {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    } = req.body;

    const foundUser = users.find(user => user.id === +userId);

    if (!foundUser) {
      res.sendStatus(400);

      return;
    }

    const newExpense = {
      id: expenses.length,
      userId: +userId,
      spentAt,
      title,
      amount: +amount,
      category,
      note,
    };

    expenses.push(newExpense);

    res.statusCode = 201;
    res.send(newExpense);
  });

  router.patch('/expenses/:expenseId', express.json(), (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const { expenseId } = req.params;

    if (isNaN(+expenseId)) {
      res.sendStatus(400);

      return;
    }

    const foundExpense = expenses.find(expense => expense.id === +expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    if (!req.body) {
      res.sendStatus(400);

      return;
    }

    const { title } = req.body;

    const newExpense = {
      ...foundExpense,
      title,
    };

    expenses = expenses.map(expense => expense.id === foundExpense.id
      ? newExpense
      : expense);

    res.statusCode = 200;
    res.send(newExpense);
  });

  router.delete('/expenses/:expenseId', express.json(), (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const { expenseId } = req.params;

    if (isNaN(+expenseId)) {
      res.sendStatus(400);

      return;
    }

    const foundExpense = expenses.find(expense => expense.id === +expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    expenses = expenses.filter(expense => expense.id !== foundExpense.id);
    res.sendStatus(204);
  });

  return app;
}

module.exports = {
  createServer,
};
