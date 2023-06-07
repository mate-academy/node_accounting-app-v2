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

const changeById = (findExpense, body) => {
  Object.assign(findExpense, body);

  return findExpense;
};

const reset = () => {
  expenses = [];

  return expenses;
};

module.exports = {
  getAll,
  createExpenses,
  findById,
  removeById,
  changeById,
  reset,
};
