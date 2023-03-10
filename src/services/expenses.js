'use strict';

const { createId } = require('../helperFunction/createId');

let expenses = [];

function setInitialExpenses(initialExpenses) {
  expenses = initialExpenses;

  return expenses;
}

function getFilteredExpenses(params) {
  const { userId, categories, from, to } = params;

  return expenses.filter(expense => {
    const isUserIdMatch = userId
      ? expense.userId === +userId
      : true;

    const isCategoryMatch = categories
      ? categories.includes(expense.category)
      : true;

    const isFromMath = from
      ? expense.spentAt >= from
      : true;

    const isToMatch = to
      ? expense.spentAt <= to
      : true;

    return isUserIdMatch && isCategoryMatch && isFromMath && isToMatch;
  });
}

function getExpenseById(expenseId) {
  const foundExpense = expenses.find(expense => expense.id === +expenseId);

  return foundExpense || null;
}

function createExpense(expense) {
  const newExpense = {
    ...expense,
    id: createId(expenses),
  };

  expenses.push(newExpense);

  return newExpense;
}

function deleteExpense(expenseId) {
  expenses = expenses.filter(expense => expense.id !== +expenseId);
}

function updateExpense(expenseId, dataToUpdate) {
  const expenseToUpdate = getExpenseById(expenseId);
  const updatedExpense = Object.assign(expenseToUpdate, dataToUpdate);

  return updatedExpense;
}

module.exports = {
  setInitialExpenses,
  getExpenseById,
  getFilteredExpenses,
  createExpense,
  deleteExpense,
  updateExpense,
};
