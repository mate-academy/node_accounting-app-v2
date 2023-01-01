'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { router: userRouter } = require('./routes/users');
const { router: expensesRouter } = require('./routes/expenses');

function createServer() {
  const app = express();

  app.use(cors());
  app.use(bodyParser.json());
  app.use(userRouter);
  app.use(expensesRouter);

  // app.get('/expenses', expensesController.getAll);
  // app.post('/expenses', express.json(), expensesController.addOne);
  // app.get('/expenses/:expenseId', expensesController.getOne);
  // app.delete('/expenses/:expenseId', expensesController.deleteOne);

  // app.patch(
  //   '/expenses/:expenseId', express.json(), expensesController.updateOne
  // );

  // app.listen(3000);

  return app;
}

// createServer();

module.exports = {
  createServer,
};
