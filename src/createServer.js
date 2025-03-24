const express = require('express');
const bodyParser = require('body-parser');

// Destructure the router from the exported object
const { router: usersRouter } = require('./routes/users');
const expensesRouter = require('./routes/expenses');

function createServer() {
  const app = express();

  app.use(bodyParser.json());
  app.use('/users', usersRouter); // Now using the correct router
  app.use('/expenses', expensesRouter);

  app.get('/', (req, res) => {
    res.json({ message: 'Hello World' });
  });

  return app;
}

module.exports = { createServer };
