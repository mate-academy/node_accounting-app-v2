const expenses = require('../data/expenses');
const users = require('../data/users');

function resetData() {
  expenses.length = 0;
  users.length = 0;
}

module.exports = {
  resetData,
};
