const { expensesController } = require('./controllers/expenses.controller');
const { usersController } = require('./controllers/users.controller');

const addRouting = (server) => {
  usersController(server);
  expensesController(server);

  return server;
};

module.exports = {
  addRouting,
};
