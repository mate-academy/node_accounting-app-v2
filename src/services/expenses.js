'use strict';

let expenses = [];

function setInitialExpenses() {
  expenses = [];
}

function getExpenses(searchParams) {
  const { userId, categories, from, to } = searchParams;

  const filteredExpenses = expenses.filter(expense => {
    if (userId && expense.userId !== Number(userId)) {
      return false;
    }

    if (categories && expense.category !== categories) {
      return false;
    }

    if (from && expense.spentAt < from) {
      return false;
    }

    if (to && expense.spentAt > to) {
      return false;
    }

    return true;
  });

  return filteredExpenses;
}

function addExpense(expenseData) {
  const expense = {
    id: expenses.length + 1,
    ...expenseData,
  };

  expenses.push(expense);

  return expense;
};

function getExpenseById(expenseId) {
  const expense = expenses.find(({ id }) => id === Number(expenseId));

  return expense || null;
}

function deleteExpense(expenseId) {
  const expenseIndex = expenses.findIndex(({ id }) => id === Number(expenseId));

  if (expenseIndex === -1) {
    return false;
  }

  expenses.splice(expenseIndex, 1);

  return true;
}

function updateExpense(expenseId, expenseData) {
  const expense = getExpenseById(expenseId);

  if (!expense) {
    return null;
  }

  Object.assign(expense, expenseData);

  return expense;
}

module.exports = {
  setInitialExpenses,
  getExpenses,
  addExpense,
  getExpenseById,
  deleteExpense,
  updateExpense,
};
