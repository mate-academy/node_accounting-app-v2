'use strict';

const express = require('express');
const cors = require('cors');

function createServer() {
  const getNewId = (arr) => {
    return arr.length
      ? (arr[arr.length - 1].id + 1)
      : 0;
  };

  const findSmthById = (arr, id) => (
    arr.find(findUser => findUser.id === +id) || null
  );

  let users = [];
  let expenses = [];
  const app = express();

  app.use(cors());

  app.get('/expenses', (req, res) => {
    const { userId, categories, from, to } = req.query;
    // res.send(req.query.userId)
    let filteredExpenses = expenses;

    if (userId) {
      filteredExpenses = filteredExpenses
        .filter(expense => expense.userId === +userId);
    }

    if (categories) {
      const categoriesArr = Array.isArray(categories)
        ? categories
        : [categories];

      filteredExpenses = filteredExpenses
        .filter(expense => categoriesArr.includes(expense.category));
    }

    const fromDate = new Date(from);
    const toDate = new Date(to);

    if (from && !isNaN(fromDate)) {
      // console.log('from');

      filteredExpenses = filteredExpenses
        .filter(expense => {
          // console.log(expense.spentAt - fromDate);
          // console.log(+expense.spentAt, 'expense.spentAt');
          // console.log(+fromDate, 'fromDate');
          // console.log(expense[0])

          return expense.spentAt > fromDate;
        });
    }

    // console.log(filteredExpenses)

    if (to && !isNaN(toDate)) {
      filteredExpenses = filteredExpenses
        .filter(expense => expense.spentAt < toDate);
    }

    res.statusCode = 200;
    // res.send(filteredExpenses);
    res.send(filteredExpenses);
  });

  app.post('/expenses', express.json({ extended: true }), (req, res) => {
    const {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    } = req.body;
    const spentAtDate = new Date(spentAt);

    if (!isFinite(userId) || !isFinite(spentAtDate)
      || typeof title !== 'string' || typeof category !== 'string'
      || typeof note !== 'string' || !isFinite(amount)
      || !findSmthById(users, userId)) {
      res.sendStatus(400);

      return;
    }

    res.statusCode = 201;

    const newExpense = {
      id: getNewId(expenses),
      userId: +userId,
      spentAt: spentAtDate,
      title,
      amount,
      category,
      note,
    };

    expenses.push(newExpense);
    res.send(newExpense);
  });

  app.get('/expenses/:id', (req, res) => {
    const id = req.params.id;

    if (!isFinite(id)) {
      res.sendStatus(400);

      return;
    }

    const expense = findSmthById(expenses, id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    res.send(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);

    if (!isFinite(id)) {
      res.sendStatus(400);

      return;
    }

    const filteredExpenses = expenses
      .filter(filterExpense => filterExpense.id !== id);

    if (filteredExpenses.length === expenses.length) {
      res.sendStatus(404);

      return;
    }

    expenses = filteredExpenses;
    res.sendStatus(204);
  });

  app.patch('/expenses/:id', express.json({ extended: true }), (req, res) => {
    const id = Number(req.params.id);
    const {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    } = req.body;
    const spentAtDate = new Date(spentAt);

    const expense = findSmthById(expenses, id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    if (!Object.keys(req.body).length) {
      res.sendStatus(400);

      return;
    }
    expense.userId = +userId || expense.userId;
    expense.title = title || expense.title;
    expense.amount = amount || expense.amount;
    expense.category = category || expense.category;
    expense.note = note || expense.note;

    expense.spentAt = isFinite(spentAtDate)
      ? spentAtDate
      : expense.spentAt;

    res.statusCode = 200;
    res.send(expense);
  });

  // -------------------------------------
  // -------------------------------------

  app.get('/users', (req, res) => {
    res.statusCode = 200;
    res.send(users);
  });

  app.get('/users/:id', (req, res) => {
    const id = req.params.id;

    if (!isFinite(id)) {
      res.sendStatus(400);

      return;
    }

    const user = findSmthById(users, id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    res.send(user);
  });

  app.post('/users', express.json({ extended: true }), (req, res) => {
    const newUserName = req.body.name;

    if (!newUserName || users.some(user => user.name === newUserName)) {
      res.sendStatus(400);

      return;
    }

    res.statusCode = 201;

    const newUser = {
      id: getNewId(users),
      name: newUserName,
    };

    users.push(newUser);
    res.send(newUser);
  });

  app.delete('/users/:id', (req, res) => {
    const id = Number(req.params.id);

    if (!isFinite(id)) {
      res.sendStatus(400);

      return;
    }

    const filteredUsers = users.filter(filterUser => filterUser.id !== id);

    if (filteredUsers.length === users.length) {
      res.sendStatus(404);

      return;
    }

    users = filteredUsers;
    res.sendStatus(204);
    // console.log(users, 'end of app.delete');
  });

  app.patch('/users/:id', express.json({ extended: true }), (req, res) => {
    const id = Number(req.params.id);
    const newUserName = req.body.name;

    if (!isFinite(id) || !newUserName) {
      res.sendStatus(400);

      return;
    }

    const user = findSmthById(users, id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    user.name = newUserName;
    res.statusCode = 200;
    res.send(user);
  });

  return app;
}

// // delete
// createServer().listen(3000);

module.exports = {
  createServer,
};
