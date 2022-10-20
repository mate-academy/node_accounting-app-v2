/* eslint-disable no-console */
'use strict';

const express = require('express');
// const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
// const { query } = require('express');

function createServer() {
  const app = express();
  let users = [];
  let expenses = [];

  app.use(express.json({ extended: true }));
  app.use(cors());

  app.get('/users', (req, res) => {
    if (!users.length) {
      res.send([]);
    } else {
      res.statusCode = 200;
      res.send(users);
    }
  });

  app.get('/users/:userId', (req, res) => {
    const id = parseInt(req.path.slice(1).split('/')[1]);

    const userItem = users.find(user => user.id === id);
    const isUser = users.some(user => user.id === id);

    if (isUser) {
      res.statusCode = 200;
      res.send(userItem);
    } else {
      res.setHeader('Content-Type', /application\/json/);
      res.sendStatus(404);
      res.end();
    }
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;
    const newUser = {
      id: 1,
      name,
    };

    if (!name) {
      res.statusCode = 400;
      res.end();
      users = [];
    } else {
      res.statusCode = 201;
      users.push(newUser);
      res.send(newUser);
      console.log(users);

      return newUser;
    }
  });

  app.patch('/users/:userId', (req, res) => {
    const newName = req.body.name;
    const id = parseInt(req.path.slice(1).split('/')[1]);

    let myUser = {};

    users.map((user) => {
      if (user.id === id) {
        Object.assign(user, { 'name': newName });
        myUser = user;
      } else {
        res.setHeader('Content-Type', /application\/json/);
      }
    });
    res.send(myUser);
  });

  app.delete('/users/:userId', (req, res) => {
    const id = parseInt(req.path.slice(1).split('/')[1]);

    res.statusCode = 404;

    users.map((user, index) => {
      if (user.id === id) {
        users.splice(index, 1);
        res.statusCode = 204;
      }
    });

    res.end();
  });

  // *****************Expanses*****************

  app.get('/expenses', (req, res) => {
    const query = req.query;
    const { userId, category, to, from } = query;

    if (from && to) {
      const expenseDate = expenses.filter(
        expense => expense.spentAt > from
        && expense.spentAt < to
      );

      res.send(expenseDate);
      res.statusCode = 200;

      return;
    }

    if (category) {
      const expenseCategory = expenses.filter(
        expense =>
          expense.userId === +query.userId
          && expense.category === query.category
      );

      res.send(expenseCategory);
      res.statusCode = 200;

      return;
    }

    if (userId) {
      const expenseUserId = expenses.filter(
        expense => expense.userId === +userId
      );

      res.send(expenseUserId);
      res.statusCode = 200;

      return;
    }

    res.statusCode = 200;
    res.send(expenses);
  });

  app.get('/expenses/:expenseId', (req, res) => {
    const id = parseInt(req.path.slice(1).split('/')[1]);

    const expenseItem = expenses.find(expense => expense.id === id);

    console.log(212, expenseItem);

    if (expenseItem) {
      res.statusCode = 200;
      res.send(expenseItem);
    } else {
      res.sendStatus(404);
      res.send();
    }
  });

  app.post('/expenses', (req, res) => {
    const myReq = req.body;
    const newExpense = {
      id: 1,
      title: myReq.title || '',
      userId: myReq.userId || '',
      spentAt: myReq.spentAt || '',
      amount: myReq.amount || '',
      category: myReq.category || '',
      note: myReq.note || '',
    };

    if (!myReq.title) {
      res.sendStatus(400);
      res.end();
    } else {
      if (!users.some(user => user.id === newExpense.userId)) {
        res.sendStatus(400);
      } else {
        res.statusCode = 201;
      }
      expenses.push(newExpense);
      res.send(newExpense);
      console.log(users);

      return newExpense;
    }
  });

  app.patch('/expenses/:userId', (req, res) => {
    const newTitle = req.body.title;
    const id = parseInt(req.path.slice(1).split('/')[1]);
    let isExpense = false;

    let myExpense = {};

    expenses.map((expense) => {
      if (expense.id === id) {
        Object.assign(expense, { 'title': newTitle });
        myExpense = expense;
        isExpense = true;
      }
    });

    if (!isExpense) {
      res.sendStatus(404);

      return;
    } else {
      res.statusCode = 200;
    }

    res.send(myExpense);
  });

  app.delete('/expenses/:userId', (req, res) => {
    const id = parseInt(req.path.slice(1).split('/')[1]);

    res.statusCode = 404;

    expenses.map((expense, index) => {
      if (expense.id === id) {
        expenses.splice(index, 1);
        res.statusCode = 204;
      }
    });

    res.end();
  });

  return app;
}

module.exports = { createServer };
