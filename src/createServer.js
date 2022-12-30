'use strict';

const express = require('express');
const { UserController } = require('./controllers/users.js');
const { ExpensesController } = require('./controllers/expenses.js');

function createServer() {
  const app = express();

  app.use(express.json());

  const userController = new UserController();
  const expensesController = new ExpensesController();

  app.post('/users', userController.add);

  app.get('/users', userController.getAll);

  app.get('/users/:id', userController.getOne);

  app.patch('/users/:id', userController.change);

  app.delete('/users/:id', userController.remove);

  app.post('/expenses', (req, res) => {
    const { userId } = req.body;
    const foundUser = userController.usersService.getUserById(userId);

    if (!foundUser) {
      res.sendStatus(400);

      return;
    }

    const newExpense = expensesController.expensesService.create(req.body);

    res.status(201);
    res.send(newExpense);
  });

  app.get('/expenses', expensesController.getAll);

  app.get('/expenses/:id', expensesController.getOne);

  app.patch('/expenses/:id', expensesController.change);

  app.delete('/expenses/:id', expensesController.remove);

  return app;
}

module.exports = {
  createServer,
};
