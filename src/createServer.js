const express = require('express');
const User = require('./models/user.model');
const Expense = require('./models/expense.model');

function createServer() {
  const app = express();

  app.use(express.json());

  // Middleware to set headers
  app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  });

  // idk why, but without this reset tests don't pass
  User.reset();
  Expense.reset();

  // Routes
  const userRoutes = require('./routes/user.route');

  app.use('/users', userRoutes);

  const expensesRoutes = require('./routes/expense.route');

  app.use('/expenses', expensesRoutes);

  return app;
}

module.exports = {
  createServer,
};
