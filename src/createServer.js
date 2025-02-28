'use strict';

const express = require('express');

function createServer() {
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)

  const app = express();

  // #region TEST

  // let users = [
  //   { id: 0, name: 'string' },
  //   { id: 1, name: 'node' },
  //   { id: 2, name: 'js' },
  // ];

  // let expenses = [
  //   {
  //     id: 0,
  //     userId: 0,
  //     spentAt: '2025-02-28T11:20:54.620Z',
  //     title: 'first expense',
  //     amount: 0,
  //     category: 'string',
  //     note: 'string',
  //   },
  //   {
  //     id: 1,
  //     userId: 1,
  //     spentAt: '2025-02-28T11:20:54.620Z',
  //     title: 'first expense',
  //     amount: 0,
  //     category: 'number',
  //     note: 'string',
  //   },
  //   {
  //     id: 2,
  //     userId: 1,
  //     spentAt: '2025-02-28T11:20:54.620Z',
  //     title: 'first expense',
  //     amount: 0,
  //     category: 'string',
  //     note: 'string',
  //   },
  // ];

  // #endregion

  let users = [];
  let expenses = [];

  // #region GET all users
  app.get('/users', (req, res) => {
    res.send(users);
  });

  // #endregion
  // #region GET user by ID
  app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const currentUser = users.find((user) => user.id === +id);

    if (!currentUser) {
      res.sendStatus(404);

      return;
    }

    res.send(currentUser);
  });

  // #endregion
  // #region POST user
  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);
    }

    const newId =
      users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 0;

    const newUser = {
      id: newId,
      name,
    };

    users.push(newUser);
    res.statusCode = 201;
    res.send(newUser);
  });

  // #endregion
  // #region PATCH user
  app.patch('/users/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const currentUser = users.find((user) => user.id === +id);

    if (!currentUser) {
      res.sendStatus(404);

      return;
    }

    if (typeof name !== 'string') {
      res.sendStatus(422);

      return;
    }

    Object.assign(currentUser, { name });

    res.send(currentUser);
  });

  // #endregion
  // #region DELETE user
  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    const newUsers = users.filter((user) => user.id !== +id);

    if (newUsers.length === users.length) {
      res.sendStatus(404);

      return;
    }

    users = newUsers;
    res.sendStatus(204);
  });
  // #endregion

  // #region GET all expenses
  app.get('/expenses', express.json(), (req, res) => {
    const { userId, categories, from, to } = req.query;

    let filtExp = expenses;

    if (userId) {
      filtExp = filtExp.filter((exp) => exp.userId === +userId);
    }

    if (categories) {
      filtExp = filtExp.filter((expense) => expense.category === categories);
    }

    if (from) {
      filtExp = filtExp.filter(
        (exp) => new Date(exp.spentAt) >= new Date(from),
      );
    }

    if (to) {
      filtExp = filtExp.filter((exp) => new Date(exp.spentAt) <= new Date(to));
    }

    res.send(filtExp);
  });

  // #endregion
  // #region GET expenses by ID
  app.get('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const currentExpence = expenses.find(
      (expense) => expense.id === +expenseId,
    );

    if (!currentExpence) {
      res.sendStatus(404);

      return;
    }

    res.send(currentExpence);
  });

  // #endregion
  // #region POST expenses
  app.post('/expenses', express.json(), (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    const currentUser = users.find((user) => user.id === +userId);

    if (!currentUser) {
      res.sendStatus(400);

      return;
    }

    if (
      userId === undefined ||
      !spentAt ||
      !title ||
      amount === undefined ||
      !category ||
      !note
    ) {
      res.sendStatus(400);

      return;
    }

    const spentAtDate = new Date(spentAt);

    if (isNaN(spentAtDate)) {
      res.status(400).send('Invalid spentAt date');

      return;
    }

    const newId =
      expenses.length > 0
        ? Math.max(...expenses.map((expense) => expense.id)) + 1
        : 0;

    const newExpence = {
      id: newId,
      userId,
      spentAt: spentAtDate,
      title,
      amount,
      category,
      note,
    };

    expenses.push(newExpence);
    res.statusCode = 201;
    res.send(newExpence);
  });

  // #endregion
  // #region PATCH expenses
  app.patch('/expenses/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const { spentAt, title, amount, category, note } = req.body;

    const currentExpence = expenses.find((exp) => exp.id === +id);

    if (!currentExpence) {
      res.sendStatus(404);

      return;
    }

    if (
      (title && typeof title !== 'string') ||
      (amount && (typeof amount !== 'number' || isNaN(amount))) ||
      (category && typeof category !== 'string') ||
      (note && typeof note !== 'string') ||
      (spentAt && typeof spentAt !== 'string')
    ) {
      res.sendStatus(422);

      return;
    }

    if (title !== undefined) {
      Object.assign(currentExpence, { title });
    }

    if (amount !== undefined) {
      Object.assign(currentExpence, { amount });
    }

    if (category !== undefined) {
      Object.assign(currentExpence, { category });
    }

    if (note !== undefined) {
      Object.assign(currentExpence, { note });
    }

    if (spentAt !== undefined) {
      const spentAtDate = new Date(spentAt);

      Object.assign(currentExpence, { spentAt: spentAtDate });
    }

    res.send(currentExpence);
  });

  // #endregion
  // #region DELETE expenses
  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;

    const newExpenses = expenses.filter((exp) => exp.id !== +id);

    if (newExpenses.length === expenses.length) {
      res.sendStatus(404);

      return;
    }

    expenses = newExpenses;
    res.sendStatus(204);
  });
  // #endregion

  return app;
}

module.exports = {
  createServer,
};

// if (!userId) {
//   res.sendStatus(404);

//   return;
// }

// if (!category || !Array.isArray(category)) {
//   res.sendStatus(404);

//   return;
// }

// if (!from || isNaN(new Date(from).getTime())) {
//   res.sendStatus(404);

//   return;
// }

// if (!to || isNaN(new Date(to).getTime())) {
//   res.sendStatus(404);

//   return;
// }

// const filteredExpenses = expenses.filter(
//   (expense) =>
//     expense.userId === +userId &&
//     category.includes(expense.category) &&
//     new Date(expense.spentAt) >= new Date(from) &&
//     new Date(expense.spentAt) <= new Date(to),
// );
// res.send(filteredExpenses);
// res.send(expenses);
