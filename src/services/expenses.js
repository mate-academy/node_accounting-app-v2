'use strict';

let expenses = [];

function getAll() {
  return expenses;
}

function findExpenseById(expenseId) {
  const foundExpense = expenses
    .find(expense => expense.id === Number(expenseId));

  return foundExpense || null;
}

function addExpense(expenseData) {
  const maxID = expenses.length
    ? Math.max(...expenses.map(expense => expense.id))
    : 0;

  const newExpense = {
    id: maxID + 1,
    ...expenseData,
  };

  expenses.push(newExpense);

  return newExpense;
}

function patchExpense(foundExpense, expenseData) {
  Object.assign(foundExpense, expenseData);

  return foundExpense;
}

function deleteExpenseById(expenseId) {
  expenses = expenses.filter(expense => expense.id !== Number(expenseId));
}

module.exports = {
  getAll,
  findExpenseById,
  addExpense,
  deleteExpenseById,
  patchExpense,
};
