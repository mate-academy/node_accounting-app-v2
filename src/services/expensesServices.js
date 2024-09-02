'use strict';

let expenses = [];

const getAll = () => expenses;

const createExpense = (newExpense) => {
  expenses.push(newExpense);
};

const findById = (expenseId) => {
  return expenses
    .find(expense => expense.id === Number(expenseId));
};

const removeById = (expenseId) => {
  return expenses
    .filter(expense => expense.id !== Number(expenseId));
};

const updateUsersList = (filteredExpenses) => {
  expenses = filteredExpenses;
};

const changeById = (findExpense, body) => {
  Object.assign(findExpense, body);
};

const reset = () => {
  expenses = [];
};

module.exports = {
  getAll,
  createExpense,
  findById,
  removeById,
  changeById,
  updateUsersList,
  reset,
};
