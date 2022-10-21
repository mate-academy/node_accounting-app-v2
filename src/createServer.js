'use strict';

const express = require('express');

function createServer() {
  const app = express();

  const users = [];
  const expenses = [];

  let newUserID = 1;
  let newExpenseID = 1;

  app.use(express.json());

  app.get('/users', (req, res) => {
    res
      .status(200)
      .send(users.length === 0 ? [] : users);
  });

  app.get('/users/:userID', (req, res) => {
    const { userID } = req.params;
    const foundUser = users[userID];

    if (!foundUser) {
      res.sendStatus(404);
      res.send('User is not found');

      return;
    }

    res
      .status(200)
      .send(foundUser);
  });

  app.patch('/users/:userID', (req, res) => {
    const { userID } = req.params;
    const foundUser = users[userID];

    if (!foundUser) {
      res.sendStatus(404);
      res.send('User is not found');

      return;
    }

    foundUser.name = req.body.name;

    res
      .status(200)
      .send(foundUser);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res
        .status(400)
        .send('Name is requierd');
    }

    const newUser = {
      id: newUserID++,
      name,
    };

    users[newUser.id] = newUser;

    res
      .status(201)
      .send(newUser);
  });

  app.delete('/users/:userID', (req, res) => {
    const { userID } = req.params;
    const deleteUser = users[userID];

    if (!deleteUser) {
      res.sendStatus(404);
      res.send('User is not found');

      return;
    }

    users.splice(userID, 1);

    res
      .status(204)
      .send(deleteUser);
  });

  app.get('/expenses', (req, res) => {
    const { userId, category, from, to } = req.query;

    console.log(userId + category + from +to);

    let getExpenses = [...expenses];

    if (userId) {
      getExpenses = [...getExpenses].filter(expense => (
        expense.userId === Number(userId)
      ));
      console.log(getExpenses);

      if (category) {
        getExpenses = [...getExpenses].filter(expense => (
          category.includes(expense.category)
        ));
      }
      console.log(getExpenses);

      res
        .status(200)
        .send(getExpenses);
    }

    if (from && to) {
      getExpenses = [...getExpenses].filter(expense => (
        new Date(from) < new Date(expense.spentAt)
        && new Date(to) > new Date(expense.spentAt)
      ));
    }

    res
      .status(200)
      .send(getExpenses.length === 0 ? [] : getExpenses);
  });

  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const foundExpense = expenses.find(expense => expense.id === +id);

    if (!foundExpense) {
      res.sendStatus(404);
      res.send('Expenses is not found');

      return;
    }

    res
      .status(200)
      .send(foundExpense);
  });

  app.patch('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const newExpense = expenses.find(expense => expense.id === +id);

    if (!newExpense) {
      res
        .status(404)
        .send('Expense is not found');

      return;
    }

    const {
      spentAt,
      title,
      amount,
      category,
      note,
    } = req.body;

    const updateKeys = {
      spentAt,
      title,
      amount,
      category,
      note,
    };

    for (const key in updateKeys) {
      if (!updateKeys[key]) {
        delete updateKeys[key];
      }
    };

    Object.assign(newExpense, updateKeys);

    res
      .status(200)
      .send(newExpense);
  });

  app.post('/expenses', (req, res) => {
    const {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    } = req.body;

    const foundUser = users[Number(userId)];

    if (!foundUser) {
      res
        .status(400)
        .send('Name is not provided');

      return;
    }

    const newExpense = Object.assign({
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    }, { id: newExpenseID++ });

    expenses.push(newExpense);

    res
      .status(201)
      .send(newExpense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const deleteExpense = expenses.find(exp => exp.id === +id);

    expenses.splice(expenses.indexOf(deleteExpense), 1);

    if (!deleteExpense) {
      res.sendStatus(404);
      res.send('Expense is not found');

      return;
    }

    expenses.splice(id, 1);

    res
      .status(204)
      .send(deleteExpense);
  });

  return app;
}

module.exports = {
  createServer,
};
