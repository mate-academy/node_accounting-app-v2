'use strict';

const express = require('express');
const { userRouter } = require('./routes/users');
// const userController = require('./controllers/users');
const userService = require('./services/users');

function createServer() {
  const app = express();

  userService.emptyUsers();
  app.use('/users', userRouter);
  // app.get('/users', userController.getAll);

  // app.get('/users/:userId', userController.getOne);

  // app.post('/users', express.json(), userController.add);

  // app.patch('/users/:userId', express.json(), userController.update);

  // app.delete('/users/:userId', userController.remove);

  const expenses = [];

  app.get('/expenses', (req, res) => {
    res.send(expenses);
  });

  app.get('/expenses/:expenseId', (req, res) => {
    const expenseId = Number(req.params.expenseId);
    const isValid = !Number.isNaN(expenseId);

    if (!isValid) {
      res.sendStatus(422);

      return;
    }

    const foundExpense = expenses.find(expense => expense.id === expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    res.send(foundExpense);
  });
  app.use(express.json());

  app.post('/expenses', express.json(), (res, req) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    const maxId = expenses.length
      ? Math.max(...expenses.map(user => user.id)) + 1
      : 0;

    const isValidDataType = typeof userId !== 'number'
      || typeof spentAt !== 'string'
      || typeof title !== 'string'
      || typeof amount !== 'number'
      || typeof category !== 'string'
      || typeof note !== 'string';

    const foundUser = userService.getById(userId);

    // const isDataValid = !userId
    //   || !spentAt
    //   || !title
    //   || !amount
    //   || !category;

    // if (isDataValid) {
    //   res.sendStatus(422);

    //   return;
    // };

    if (isValidDataType || !foundUser) {
      res.sendStatus(400);

      return;
    }

    const newExpense = {
      ...req.body,
      id: maxId,
    };

    expenses.push(newExpense);

    res.statusCode = 201;
    res.send(newExpense);
  });

  return app;
}

module.exports = {
  createServer,
};
