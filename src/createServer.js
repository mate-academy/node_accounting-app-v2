'use strict';

const express = require('express');

const usersRouter = require('./routers/users.router');
const expensesRouter = require('./routers/expenses.router');

const usersService = require('./services/users.service');
const expensesService = require('./services/expenses.service');

function createServer() {
  // Reinicia o estado a cada chamada para manter os testes isolados
  // Isso é importante pois os testes costumam criar o server múltiplas vezes
  usersService.reset();
  expensesService.reset();

  const app = express();

  // Middleware para processar JSON no corpo (body) das requisições
  app.use(express.json());

  // Registra as rotas para os prefixos /users e /expenses
  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
