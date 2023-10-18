'use strict';

let expenses = [];

const clearExpenses = () => (expenses = []);

const getAllExpenses = () => {
  return expenses;
};

const getExpenseById = (id) => {
  return expenses.find(expense => expense.id === id);
};

const addExpense = (expense) => {
  expenses.push(expense);

  return expense;
};

const removeExpenseById = (id) => {
  expenses = expenses.filter(expense => expense.id !== id);
};

module.exports = {
  clearExpenses,
  getAllExpenses,
  getExpenseById,
  addExpense,
  removeExpenseById,
};
