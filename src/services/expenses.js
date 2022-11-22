'use strict';

let expenses = [];

const getAllExpenses = () => {
  return expenses;
};

const getExpenseById = (expenseId) => {
  const foundExpense = expenses.find(({ id }) => id === +expenseId);

  return foundExpense || null;
};

const createExpense = (data) => {
  const maxId = Math.max(...expenses.map(({ id }) => id), 0);
  const newExpense = Object.assign({ id: maxId + 1 }, data);

  expenses.push(newExpense);

  return newExpense;
};

const removeExpense = (expenseId) => {
  expenses = expenses.filter(({ id }) => id !== +expenseId);
};

const updateExpense = (userId, data) => {
  const foundExpense = getExpenseById(+userId);

  Object.assign(foundExpense, data);

  return foundExpense;
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  removeExpense,
  updateExpense,
};
