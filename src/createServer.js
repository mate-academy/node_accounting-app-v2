'use strict';

const express = require('express');
const cors = require('cors');

const userController = require('./controller/user.controller');
const expensesController = require('./controller/expenses.controller');



function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/users', userController.get);

  app.get('/users/:id', userController.getOne);

  app.patch('/users/:id', express.json(), userController.update);

  app.post('/users', express.json(), userController.create);

  app.delete('/users/:id', userController.remove);

  // app.get('/expenses', express.json(), (req, res) => {
  //   res.send(expenses);
  // })

  app.get('/expenses/:id', express.json(), expensesController.get);

  return app;
}

module.exports = {
  createServer,
};
