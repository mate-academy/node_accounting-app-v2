'use strict';

function createServer() {
  const express = require('express');
  const fs = require('fs');
  const path = require('path');

  // Paths:
  const publicDirPath = path.join(__dirname, 'public');
  // Port:
  // const PORT = process.env.PORT || 5000;
  // App setup:
  const app = express();
  const usersController = require('./usersAPI/users-controller');
  const expensesController = require('./expensesAPI/expenses-controller');

  // Middleware:
  app.use(express.json());

  // ======= API Home page:
  app.get('/', (req, res) => {
    const indexHTMLPath = path.join(publicDirPath, 'index.html');

    res.end(fs.readFileSync(indexHTMLPath));
  });

  // ======= USERS API:
  // GET ALL:
  app.get('/users', usersController.getAllUsers);

  // GET ONE:
  app.get('/users/:userID', usersController.getOneUsers);

  // POST ONE:
  app.post('/users', usersController.createOneUser);

  // PATCH ONE:
  app.patch('/users/:userID', usersController.updateUser);

  // DELETE ONE:
  app.delete('/users/:userID', usersController.deleteUser);

  // ======= EXPENSES API:
  // GET ALL:
  app.get('/expenses', expensesController.getAllExpenses);

  // GET ONE:
  app.get('/expenses/:userID', expensesController.getOneExpense);

  // POST ONE:
  app.post('/expenses', expensesController.createExpense);

  // PATCH ONE:
  app.patch('/expenses/:expenseId', expensesController.updateExpense);

  // DELETE ONE:
  app.delete('/expenses/:expenseId', expensesController.deleteExpense);

  return app;
}

// Server init:
// createServer().listen(PORT);

module.exports = {
  createServer,
};
