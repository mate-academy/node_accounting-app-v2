'use strict';

let expenses = [];

function uniqueID() {
  return Math.floor(Math.random() * Date.now());
}

function getAllExpenses() {
  return expenses;
}

function initExpenses() {
  expenses = [];
}

function getExpenseById(expenseId) {
  const foundExpens = expenses.find(
    (expense) => expense.id === +expenseId
  );

  return foundExpens || null;
}

function createNewExpense(expenseData) {
  const newExtense = {
    id: uniqueID(),
    ...expenseData,
  };

  expenses.push(newExtense);

  return newExtense;
}

function removeExpenses(expenseId) {
  const filteredExpenses = expenses.filter(
    (expense) => expense.id !== +expenseId
  );

  expenses = filteredExpenses;
}

function updateExpenses({ expenseId, title }) {
  const expense = getExpenseById(expenseId);

  Object.assign(expense, { title });

  return expense;
}

module.exports = {
  getAllExpenses,
  getExpenseById,
  updateExpenses,
  removeExpenses,
  createNewExpense,
  initExpenses,
};
