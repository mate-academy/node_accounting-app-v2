'use strict';

const { generateId } = require('../helpers/generateId');

let expenses = [];

function setInitialExpenses() {
  expenses = [];
};

function getAllExpenses(searchParams) {
  const { userId, category, from, to } = searchParams;

  return expenses.filter(expense => {
    const isUserIdMatch = userId
      ? expense.userId === Number(userId)
      : true;

    const areCategoriesMatch = category
      ? expense.category === category
      : true;

    const isFromMatch = from
      ? expense.spentAt >= from
      : true;

    const isToMatch = to
      ? expense.spentAt <= to
      : true;

    return isUserIdMatch && areCategoriesMatch && isFromMatch && isToMatch;
  });
}

function getExpenseById(expenseId) {
  const foundExpense = expenses
    .find(expense => expense.id === Number(expenseId));

  return foundExpense || null;
};

function createExpense(expenseData) {
  const newExpense = {
    id: generateId(expenses),
    ...expenseData,
  };

  expenses.push(newExpense);

  return newExpense;
};

function removeExpense(expenseId) {
  expenses = expenses.filter(expense => expense.id !== Number(expenseId));
};

function updateExpense(expenseId, expenseData) {
  const expense = getExpenseById(expenseId);

  Object.assign(expense, { ...expenseData });

  return expense;
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  removeExpense,
  updateExpense,
  setInitialExpenses,
};
