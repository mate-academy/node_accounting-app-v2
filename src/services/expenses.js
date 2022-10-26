'use strict';

let nextExpenseId = 1;

let expenses = [];

function takeExpenses() {
  return expenses;
};

function clearExpensesArray() {
  expenses = [];
};

function getAllExpenses() {
  return expenses;
}

function filterByData(from, to) {
  const foundExpense = expenses.filter(
    (expense) => expense.spentAt > from
      && expense.spentAt < to
  );

  return foundExpense;
}

function filterByCategory(userId, category) {
  const foundExpense = expenses.filter(
    (expense) => expense.userId === +userId
      && expense.category === category
  );

  return foundExpense;
}

function filterById(userId) {
  const foundExpense = expenses.filter(
    (expense) => expense.userId === +userId
  );

  return foundExpense;
}

function getExpenseById(expenseId) {
  const foundExpense = expenses.find(expense => expense.id === +expenseId);

  return foundExpense || null;
}

function createExpense(body) {
  const newExpense = {
    id: nextExpenseId++,
    ...body,
  };

  expenses.push(newExpense);

  return newExpense;
}

function removeExpense(expenseId) {
  const newExpenses = expenses.filter(expense => expense.id !== +expenseId);

  expenses = newExpenses;

  return newExpenses;
}

function updateExpense(foundExpense, title) {
  Object.assign(foundExpense, { title });
}

module.exports = {
  takeExpenses,
  clearExpensesArray,
  getAllExpenses,
  filterByData,
  filterByCategory,
  filterById,
  getExpenseById,
  createExpense,
  removeExpense,
  updateExpense,
};
