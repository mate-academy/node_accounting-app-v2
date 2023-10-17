'use strict';

let expenses = [];

const getExpenses = () => {
  return expenses;
};

const findExpense = (id) => {
  return expenses.find(exp => exp.id === id) || null;
};

const deleteExpense = (id) => {
  expenses = expenses.filter(expense => expense.id !== id);
};

const createExpense = (expense) => {
  expenses.push(expense);
};

const updateExpense = (expense, body) => {
  Object.assign(expense, body);
};

const clearExpenses = () => {
  expenses.length = 0;
};

const ExpenseServises = {
  getExpenses,
  findExpense,
  deleteExpense,
  createExpense,
  updateExpense,
  clearExpenses,
};

module.exports = {
  ExpenseServises,
};
