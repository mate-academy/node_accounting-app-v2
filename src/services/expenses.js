'use strict';

let expenses = [];

function getExpenses(userId, category, from, to) {
  if (userId) {
    return expenses.filter(expense => expense.userId === +userId);
  }

  if (category) {
    return expenses.filter(expense => expense.category === category);
  }

  if (from && to) {
    return expenses.filter(
      expense => expense.spentAt <= to
      && expense.spentAt >= from
    );
  }
}

function getExpenseById(expenseId) {
  return expenses.find(expense => expense.id === +expenseId);
}

function removeExpense(expenseId) {
  expenses = expenses.filter(expense => expense.id !== +expenseId);
}

function removeAllExpenses() {
  expenses = [];
}

function addExpense(params) {
  const newExpenses = {
    id: expenses.length + 1,
    ...params,
  };

  return newExpenses;
}

function updateExpense(expenseId, newData) {
  const foundExpends = getExpenseById(expenseId);

  return Object.assign(foundExpends, newData);
}

module.exports = {
  getExpenses,
  getExpenseById,
  removeExpense,
  removeAllExpenses,
  addExpense,
  updateExpense,
};
