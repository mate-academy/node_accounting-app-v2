const userService = require('./../services/user.service');
const expenseService = require('./../services/expense.service');

const resetData = () => {
  userService.reset();
  expenseService.reset();
};

module.exports = {
  resetData,
};
