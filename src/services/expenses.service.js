'use strict';

const { getAllUsers } = require('./user.service');

const expenses = [];

const init = () => {
  expenses.length = 0;
};

const getAllExpenses = (userId, categories, from, to) => {
  return expenses.filter(expense => {
    if (userId && expense.userId !== +userId) {
      return false;
    }

    if (categories && !categories.includes(expense.category)) {
      return false;
    }

    if (from && Date.parse(expense.spentAt) < Date.parse(from)) {
      return false;
    }

    if (to && Date.parse(expense.spentAt) > Date.parse(to)) {
      return false;
    }

    return true;
  });
};

const getOneExpense = (id) => {
  return expenses.find(expense => expense.id === +id);
};

const checkAtleastOneUser = (userId) => {
  const usersForCheck = getAllUsers();

  return usersForCheck.some(user => user.id === userId);
};

const createExpense = (newExpense) => {
  expenses.push(newExpense);
};

const findIndexOneExpense = (checkedExpense) => {
  return expenses.indexOf(checkedExpense);
};

const updateExpense = (checkedExpense, paramsToUpdate) => {
  Object.assign(checkedExpense, { ...paramsToUpdate });
};

const deleteExpense = (expenseUpdateIndex) => {
  expenses.splice(expenseUpdateIndex, 1);
};

module.exports = {
  getAllExpenses,
  getOneExpense,
  checkAtleastOneUser,
  createExpense,
  findIndexOneExpense,
  updateExpense,
  deleteExpense,
  init,
};
