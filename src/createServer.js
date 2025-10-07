const express = require('express');
const usersRoutes = require('./routes/usersRoutes');
const expensesRoutes = require('./routes/expensesRoutes');
const usersService = require('./services/usersService');
const expensesService = require('./services/expensesService');

function createServer() {
  const app = express();

  app.use(express.json());

  if (typeof usersService.reset === 'function') {
    usersService.reset();
  }

  if (typeof expensesService.reset === 'function') {
    expensesService.reset();
  }

  app.use('/users', usersRoutes);
  app.use('/expenses', expensesRoutes);

  app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
  });

  return app;
}

module.exports = { createServer };
