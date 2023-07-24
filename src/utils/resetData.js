'use strict';

const resetAllUsers = (users) => {
  users.length = 0;

  return users;
};

const resetAllExpenses = (expenses) => {
  expenses.length = 0;

  return expenses;
};

module.exports = {
  resetAllUsers,
  resetAllExpenses,
};
