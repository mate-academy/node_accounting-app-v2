'use strict';

const express = require('express');

function createServer() {
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)
  const app = express();
  let users = [];
  let expenses = [];

  app.get('/users', (req, res) =>
    res.send(users)
  );

  app.post('/users', express.json(), (req, res) => {
    if (!req.body.name) {
      res.sendStatus(400);

      return;
    }

    const maxId = Math.max(...users.map(user => user.id));

    const newUser = {
      id: maxId > 0 ? maxId + 1 : 1,
      name: req.body.name,
    };

    users.push(newUser);

    res.statusCode = 201;
    res.send(newUser);
  }
  );

  app.get('/users/:userId', (req, res) => {
    const { userId } = req.params;

    const foundUser = users.find(user => user.id === +userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.send(foundUser);
  }
  );

  app.delete('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const foundUser = users.find(user => user.id === +userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    users = users.filter(user => user.id !== +userId);

    res.sendStatus(204);
  }
  );

  app.patch('/users/:userId', express.json(), (req, res) => {
    const { userId } = req.params;
    const { name } = req.body;
    const foundUser = users.find(user => user.id === +userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    Object.assign(foundUser, { name });

    res.send(foundUser);
  });

  app.get('/expenses', express.json(), (req, res) => {
    const {
      userId,
      category,
      from,
      to,
    } = req.query;

    if (userId) {
      expenses = [expenses.find(expense => expense.userId === +userId)];
    }

    if (from && to) {
      expenses = expenses.filter(
        expense => expense.spentAt >= from && expense.spentAt <= to,
      );
    }

    if (category) {
      expenses = expenses.filter(expense => expense.category === category);
    }

    res.send(expenses);
  });

  app.post('/expenses', express.json(), (req, res) => {
    const query = req.body;
    const isUser = users.find(user => user.id === query.userId);

    if (!isUser) {
      res.sendStatus(400);

      return;
    }

    const maxId = Math.max(...expenses.map(exp => exp.id));

    const newExp = {
      id: maxId > 0 ? maxId + 1 : 1,
      ...query,
    };

    expenses.push(newExp);

    res.statusCode = 201;
    res.send(newExp);
  }
  );

  app.get('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const foundExpense = expenses
      .find(expense => expense.id === Number(expenseId));

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    res.send(foundExpense);
  });

  app.delete('/expenses/:expenseId', express.json(), (req, res) => {
    const { expenseId } = req.params;

    const foundExpense = expenses.find(expense => expense.id === +expenseId);
    const filteredExpenses = expenses.filter(
      expense => expense.id !== +expenseId
    );

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    expenses = filteredExpenses;

    res.sendStatus(204);
  });

  app.patch('/expenses/:expenseId', express.json(), (req, res) => {
    const { expenseId } = req.params;
    const { title } = req.body;

    let foundExpense = expenses.find(expense => expense.id === +expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    foundExpense = {
      ...foundExpense,
      title,
    };

    res.send(foundExpense);
  });

  return app;
}

module.exports = {
  createServer,
};
