'use strict';

let expenses = [];

function clearExpenses() {
  expenses = [];
}

function getAll(userId, categories, from, to, category) {
  const serchExpenses = expenses.filter(expense => (
    (userId ? expense.userId === +userId : true)
    && (categories ? expense.category === categories : true)
    && (from ? Date.parse(expense.spentAt) >= Date.parse(from) : true)
    && (to ? Date.parse(expense.spentAt) <= Date.parse(to) : true))
  );

  return serchExpenses;
}

function findExpenseById(expenseId) {
  const foundExpense = expenses
    .find(expense => expense.id === Number(expenseId));

  return foundExpense || null;
}

function addExpense(expenseData) {
  const maxID = expenses.length
    ? Math.max(...expenses.map(expense => expense.id))
    : -1;

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
  expenses = expenses.filter(expense => expense.id !== +expenseId);
}

module.exports = {
  getAll,
  findExpenseById,
  addExpense,
  deleteExpenseById,
  patchExpense,
  clearExpenses,
};
