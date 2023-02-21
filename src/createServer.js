'use strict';

// const { v4 } = require('uuid');
const express = require('express');

function createServer() {
  const app = express();
  let users = [];

  let expenses = [];

  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.get('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const wantedUser = users.find(user => user.id === Number(userId));

    if (!wantedUser) {
      res.sendStatus(404);

      // eslint-disable-next-line no-useless-return
      return;
    }

    res.send(wantedUser);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const newUser = {
      id: users.length + 1,
      name,
    };

    users.push(newUser);

    res.statusCode = 201;
    res.send(newUser);
  });

  app.patch('/users/:userId', express.json(), (req, res) => {
    const { userId } = req.params;
    const { name } = req.body;
    const wantedUser = users.find(user => user.id === Number(userId));

    if (!wantedUser) {
      res.sendStatus(404);

      // eslint-disable-next-line no-useless-return
      return;
    }

    if (!name) {
      res.sendStatus(400);

      // eslint-disable-next-line no-useless-return
      return;
    }

    Object.assign(wantedUser, { name });

    res.send(wantedUser);
  });

  app.delete('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const filteredUsers = users.filter(user => user.id !== Number(userId));

    if (filteredUsers.length === users.length) {
      res.sendStatus(404);

      return;
    }

    users = filteredUsers;

    res.sendStatus(204);
  });

  app.get('/expenses', (req, res) => {
    // const parts = req.url.split('?');
    // const params = new URLSearchParams(parts[1]);
    // const userId = params.get('userId');
    // const category = params.get('categories');
    // const from = new Date(params.get('from'));
    // const to = new Date(params.get('to'));
    const { userId, category, from, to } = req.query;

    const filteredExpenses = expenses.filter(expense => {
      const isUserIdMatch = userId
        ? expense.userId === Number(userId)
        : true;

      const isCategoriesMatch = category
        ? expense.category === category
        : true;

      const isFromMatch = from
        ? new Date(expense.spentAt).getTime() >= new Date(from).getTime()
        : true;

      const isToMatch = to
        ? new Date(expense.spentAt).getTime() <= new Date(to).getTime()
        : true;

      return isUserIdMatch && isCategoriesMatch && isFromMatch && isToMatch;
    });

    res.send(filteredExpenses);
  });

  app.get('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;

    const wantedExpense = expenses.find(exp => exp.id === Number(expenseId));

    if (!wantedExpense) {
      res.sendStatus(404);

      // eslint-disable-next-line no-useless-return
      return;
    }

    res.send(wantedExpense);
  });

  app.post('/expenses', express.json(), (req, res) => {
    const
      {
        userId,
        spentAt,
        title,
        amount,
        category,
        note,
      } = req.body;

    const wantedUser = users.find(user => user.id === Number(userId));

    if (!wantedUser) {
      res.sendStatus(400);

      return;
    }

    if (!userId || !spentAt || !title || !amount || !category || !note) {
      res.sendStatus(400);

      return;
    }

    const newExpense = {
      id: expenses.length + 1,
      userId,
      spentAt: new Date(spentAt),
      title,
      amount,
      category,
      note,
    };

    expenses.push(newExpense);

    res.statusCode = 201;
    res.send(newExpense);
  });

  app.patch('/expenses/:expenseId', express.json(), (req, res) => {
    const { expenseId } = req.params;
    const wantedExpense = expenses.find(exp => exp.id === Number(expenseId));

    if (!wantedExpense) {
      res.sendStatus(404);

      return;
    }

    const
      {
        spentAt = wantedExpense.spentAt,
        title = wantedExpense.title,
        amount = wantedExpense.amount,
        category = wantedExpense.category,
        note = wantedExpense.note,
      } = req.body;

    if (spentAt || title || amount || category || note) {
      Object.assign(
        wantedExpense,
        {
          spentAt,
          title,
          amount,
          category,
          note,
        }
      );
    } else {
      res.sendStatus(400);

      // eslint-disable-next-line no-useless-return
      return;
    }

    res.send(wantedExpense);
  });

  app.delete('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const wantedExpense = expenses.find(exp => exp.id === Number(expenseId));

    if (!wantedExpense) {
      res.sendStatus(404);

      return;
    }

    const filteredExpenses
      = expenses.filter(exp => exp.id !== Number(expenseId));

    expenses = filteredExpenses;

    res.sendStatus(204);
  });

  return app;
}

module.exports = {
  createServer,
};
