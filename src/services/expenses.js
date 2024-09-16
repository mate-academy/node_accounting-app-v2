'use strict';

let expenses = [];
let newExpenceId = 1;

function init() {
  expenses = [];
};

function getAllExpenses() {
  return expenses;
};

function getByExpenseId(expenseId) {
  const foundExpense = expenses
    .find(expense => expense.id === Number(expenseId));

  return foundExpense || null;
}

function createNewExpense(expensesKey) {
  const newExpense = {
    id: newExpenceId++,
    ...expensesKey,
  };

  expenses.push(newExpense);

  return newExpense;
}

function removeExpense(expenseId) {
  expenses = expenses
    .filter(expense => expense.id !== Number(expenseId));
};

function updateExpense(expense, expenseData) {
  Object.assign(expense, expenseData);
};

module.exports = {
  getAllExpenses,
  getByExpenseId,
  createNewExpense,
  removeExpense,
  updateExpense,
  init,
};
