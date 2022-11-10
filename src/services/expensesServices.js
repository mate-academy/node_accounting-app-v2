'use strict';

const epxenses = [];
const expensesId = 0;

const existUser = (allUsers, id) => {
  return allUsers.find(user => user.id === id);
};

const expensByCategory = (allExpenses, category) => {
  return allExpenses.filter(expens => expens.category === category);
};

const expensByDate = (allExpenses, from, to) => {
  return allExpenses.filter(expens =>
    expens.spentAt > from
  && expens.spentAt < to);
};

const wantedExpense = (allExpenses, id) => {
  return allExpenses.find(expense => expense.id === +id);
};

const changedExpenseIndex = (allExpenses, id) => {
  return allExpenses.findIndex(obj => obj.id === +id);
};

const deletedExpenseIndex = (allExpenses, id) => {
  return allExpenses.findIndex(obj => obj.id === +id);
};

module.exports = {
  epxenses,
  expensesId,
  existUser,
  expensByCategory,
  expensByDate,
  wantedExpense,
  changedExpenseIndex,
  deletedExpenseIndex,
};
