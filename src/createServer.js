'use strict';

const express = require('express');
const { UserController } = require('./controllers/users.js');
const { ExpensesController } = require('./controllers/expenses.js');

function createServer() {
  const app = express();

  app.use(express.json());

  const userController = new UserController();
  const expensesController = new ExpensesController();

  app.post('/users', userController.add.bind(userController));

  app.get('/users', userController.getAll.bind(userController));

  app.get('/users/:id', userController.getOne.bind(userController));

  app.patch('/users/:id', userController.change.bind(userController));

  app.delete('/users/:id', userController.remove.bind(userController));

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

  app.get('/expenses', expensesController.getAll.bind(expensesController));

  app.get('/expenses/:id', expensesController.getOne.bind(expensesController));

  app.patch('/expenses/:id',
    expensesController.change.bind(expensesController));

  app.delete('/expenses/:id',
    expensesController.remove.bind(expensesController));

  return app;
}

module.exports = {
  createServer,
};
