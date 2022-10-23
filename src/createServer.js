'use strict';

const express = require('express');
// const cors = require('cors');

function createServer() {
  const app = express();

  app.use(express.json());
  // app.use(cors());

  let users = [];

  let nextUserId = 1;

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);
    }

    const newUser = {
      id: nextUserId++,
      name,
    };

    users.push(newUser);
    res.statusCode = 201;
    res.send(newUser);
  });

  app.get('/users', (req, res) => {
    if (!users.length) {
      res.statusCode = 200;
      res.send([]);
    }
    res.send(users);
  });

  const findById = (itemsArray, id) => {
    return itemsArray.find(item => item.id === +id);
  };

  const filterById = (itemsArray, value) => {
    return itemsArray.filter(item => item.id !== +value);
  };

  app.get('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const findUser = findById(users, userId);

    if (!findUser) {
      res.sendStatus(404);

      return;
    }

    res.sendStatus = 200;
    res.send(findUser);
  });

  app.delete('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const filteredUsers = filterById(users, userId);

    if (users.length === filteredUsers.length) {
      res.sendStatus(404);

      return;
    }

    users = filteredUsers;
    res.sendStatus(204);
  });

  app.patch('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const findUser = findById(users, userId);

    if (!findUser) {
      res.sendStatus(404);

      return;
    };

    const { name } = req.body;

    Object.assign(findUser, { name });
    res.send(findUser);
  });

  let expenses = [];
  let nextExpensessId = 1;

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!users.some(user => user.id === userId)) {
      res.sendStatus(400);

      return;
    }

    const newExpensess = {
      id: nextExpensessId++,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(newExpensess);

    res.statusCode = 201;
    res.send(newExpensess);
  });

  app.get('/expenses', (req, res) => {
    const { userId, category, from, to } = req.query;

    if (findById(users, userId)) {
      let userExpenses = expenses.filter(
        expense => expense.userId === +userId
      );

      if (category) {
        userExpenses = userExpenses.filter(
          expense => expense.category === category
        );
      }
      res.send(userExpenses);
    }

    if (from && to) {
      const expensesByDate = expenses.filter(
        (expense) => expense.spentAt >= from && expense.spentAt <= to
      );

      res.send(expensesByDate);
    }
    res.send(expenses);
  });

  app.get('/expenses/:expensesId', (req, res) => {
    const { expensesId } = req.params;
    const foundExpense = findById(expenses, expensesId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    res.sendStatus = 200;
    res.send(foundExpense);
  });

  app.delete('/expenses/:expensesId', (req, res) => {
    const { expensesId } = req.params;
    const fieredExpensess = filterById(expenses, expensesId);

    if (users.length === fieredExpensess.length) {
      res.sendStatus(404);

      return;
    }

    expenses = fieredExpensess;
    res.sendStatus(204);
  });

  app.patch('/expenses/:expensesId', (req, res) => {
    const { expensesId } = req.params;
    const findExpense = findById(expenses, expensesId);

    if (!findExpense) {
      res.sendStatus(404);

      return;
    };

    const { title } = req.body;

    Object.assign(findExpense, { title });
    res.send(findExpense);
  });

  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)
  return app;
}

module.exports = {
  createServer,
};
