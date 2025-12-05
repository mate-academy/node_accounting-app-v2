'use strict';

const express = require('express');
const { createUsersController } = require('./modules/users/controller');
const { createExpensesController } = require('./modules/expenses/controller');

function createServer() {
  const app = express();

  app.use(express.json());

  // Armazenamento em memória
  const users = [];
  const userIdSeq = { value: 1 };

  const expenses = [];
  const expenseIdSeq = { value: 1 };

  // Instanciar controladores
  const usersController = createUsersController({ users, userIdSeq });
  const expensesController = createExpensesController({
    expenses,
    users,
    expenseIdSeq,
  });

  // Users

  // POST /users - cria usuário
  app.post('/users', usersController.createUser);

  // GET /users - lista todos usuários
  app.get('/users', usersController.getUsers);

  // GET /users/:id - obtém usuário por id
  app.get('/users/:id', usersController.getUser);

  // PATCH /users/:id - atualiza usuário
  app.patch('/users/:id', usersController.updateUser);

  // DELETE /users/:id - remove usuário
  app.delete('/users/:id', usersController.deleteUser);

  // Expenses

  // POST /expenses - cria despesa
  app.post('/expenses', expensesController.createExpense);

  // GET /expenses - lista despesas com filtros
  app.get('/expenses', expensesController.getExpenses);

  // GET /expenses/:id - obtém despesa por id
  app.get('/expenses/:id', expensesController.getExpense);

  // PATCH /expenses/:id - atualiza despesa
  app.patch('/expenses/:id', expensesController.updateExpense);

  // DELETE /expenses/:id - remove despesa
  app.delete('/expenses/:id', expensesController.deleteExpense);

  return app;
}

module.exports = {
  createServer,
};
