'use strict';

let expenses = [];

function getExpenses() {
  return expenses;
}

function getExpensesById(expenseId) {
  const foundExpense = expenses.find(expense => expense.id === +expenseId);

  return foundExpense || null;
}

function createExpense(expense, usersArr) {
  const newExpense = {
    id: Math.max(0, ...usersArr.map(({ id }) => id + 1)),
    ...expense,
  };

  expenses.push(newExpense);

  return newExpense;
}

function removeExpense(expenseId) {
  expenses = expenses.filter((expense) => expense.id !== +expenseId);
}

function updateExpense({ id, title }) {
  const expense = getExpensesById(id);

  Object.assign(expense, { title });

  return expense;
}

function initExpenses() {
  expenses = [];
}

module.exports = {
  getExpenses,
  getExpensesById,
  createExpense,
  removeExpense,
  updateExpense,
  initExpenses,
};
