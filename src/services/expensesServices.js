'use strict';

let expenses = [];

const getAll = () => expenses;

const createExpenses = (newExpense) => {
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

const changeAll = (filteredExpenses) => {
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
  createExpenses,
  findById,
  removeById,
  changeById,
  changeAll,
  reset,
};
