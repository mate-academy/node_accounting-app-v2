const { resetUsers } = require('./services/users.service.js');
const { resetExpenses } = require('./services/expenses.service.js');
const { userRouter } = require('./api/users.router.js');
const { expenseRoute } = require('./api/expenses.router.js');

const express = require('express');
const cors = require('cors');

function createServer() {
  const app = express();

  resetUsers();
  resetExpenses();

  app.use(cors());
  app.use(express.json());

  app.get('/', (req, res) => {
    res.send('Node js accounting!');
  });

  app.use('/users', userRouter);
  app.use('/expenses', expenseRoute);

  return app;
}

module.exports = {
  createServer,
};
