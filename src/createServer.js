'use strict';

const express = require('express');

function createServer() {
  const tempUserDatabase = [];
  const tempExpenseDatabase = [];
  const app = express();

  app.use(express.json());

  app.get('/users', (req, res) => {
    res.send(tempUserDatabase);
  });

  app.get('/expenses', (req, res) => {
    let filteredExpenses = tempExpenseDatabase;

    if (req.query.userId) {
      const targetUserId = +req.query.userId;

      filteredExpenses = filteredExpenses.filter(
        (exp) => exp.userId === targetUserId,
      );
    }

    if (req.query.from) {
      filteredExpenses = filteredExpenses.filter(
        (exp) => new Date(exp.spentAt) >= new Date(req.query.from),
      );
    }

    if (req.query.to) {
      filteredExpenses = filteredExpenses.filter(
        (exp) => new Date(exp.spentAt) <= new Date(req.query.to),
      );
    }

    if (req.query.categories) {
      const categoriesArray = [].concat(req.query.categories);

      filteredExpenses = filteredExpenses.filter((exp) => {
        return categoriesArray.includes(exp.category);
      });
    }

    res.status(200).send(filteredExpenses);
  });

  app.get('/users/:id', (req, res) => {
    const id = +req.params.id;

    const user = tempUserDatabase.find((usr) => usr.id === id);

    if (!user) {
      res.status(404).send('Not found');

      return;
    }

    res.status(200).send(user);
  });

  app.get('/expenses/:id', (req, res) => {
    const id = +req.params.id;

    const expense = tempExpenseDatabase.find((exp) => {
      return exp.id === id;
    });

    if (!expense) {
      res.status(404).send('Not found');

      return;
    }

    res.status(200).send(expense);
  });

  app.post('/users', (req, res) => {
    if (!req.body.name) {
      res.status(400).send('Required parameter is not passed');

      return;
    }

    const newUser = {
      id: Date.now(),
      name: req.body.name,
    };

    tempUserDatabase.push(newUser);

    res.status(201).send(newUser);
  });

  app.post('/expenses', (req, res) => {
    if (!req.body.userId || !req.body.title || !req.body.amount) {
      res.status(400).send('Required parameter is not passed');

      return;
    }

    const userId = +req.body.userId;
    const user = tempUserDatabase.find((usr) => {
      return usr.id === userId;
    });

    if (!user) {
      res.status(400).send('User not found');

      return;
    }

    const newExpense = {
      id: Date.now(),
      userId: +req.body.userId,
      spentAt: req.body.spentAt,
      title: req.body.title,
      amount: req.body.amount,
      category: req.body.category,
      note: req.body.note,
    };

    tempExpenseDatabase.push(newExpense);

    res.status(201).send(newExpense);
  });

  app.delete('/users/:id', (req, res) => {
    const id = +req.params.id;

    const userIndex = tempUserDatabase.findIndex((usr) => {
      return usr.id === id;
    });

    if (userIndex === -1) {
      res.status(404).send('User not found');

      return;
    }

    tempUserDatabase.splice(userIndex, 1);

    res.status(204).send();
  });

  app.delete('/expenses/:id', (req, res) => {
    const id = +req.params.id;

    const expenseIndex = tempExpenseDatabase.findIndex((exp) => {
      return exp.id === id;
    });

    if (expenseIndex === -1) {
      res.status(404).send('Expense not found');

      return;
    }

    tempExpenseDatabase.splice(expenseIndex, 1);

    res.status(204).send();
  });

  app.patch('/users/:id', (req, res) => {
    const id = +req.params.id;
    const newUserName = req.body.name;

    if (!newUserName) {
      res.status(400).send('No data received');

      return;
    }

    const user = tempUserDatabase.find((usr) => {
      return usr.id === id;
    });

    if (!user) {
      res.status(404).send('User not found');

      return;
    }

    user.name = newUserName;

    res.status(200).send(user);
  });

  app.patch('/expenses/:id', (req, res) => {
    const id = +req.params.id;
    const expenseKeys = Object.keys(req.body);
    const allowedUpdates = [
      'userId',
      'spentAt',
      'title',
      'amount',
      'category',
      'note',
    ];

    const expense = tempExpenseDatabase.find((exp) => {
      return exp.id === id;
    });

    if (!expense) {
      res.status(404).send('Expense not found');

      return;
    }

    if (expenseKeys.length === 0) {
      res.status(400).send('No data received');

      return;
    }

    allowedUpdates.forEach((key) => {
      if (req.body[key] !== undefined) {
        expense[key] = req.body[key];
      }
    });

    res.status(200).send(expense);
  });

  return app;
}

module.exports = {
  createServer,
};
