const { resetExpenses } = require('../services/ExpenseService');
const { resetUsers } = require('../services/userService');

const resetStoredData = () => {
  resetUsers();
  resetExpenses();
};

module.exports = {
  resetStoredData,
};
