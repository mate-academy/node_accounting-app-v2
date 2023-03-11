'use strict';

const { getNewId } = require('./getNewId');

let expenses = [];

function getAll() {
  return expenses;
};

function getFilteredExpenses({ userId, categories, from, to }) {
  return expenses.length
    ? expenses.filter(expense => {
      const isUserIdMatch = userId
        ? expense.userId === +userId
        : true;

      const isCategoryMatch = categories
        ? categories.includes(expense.category)
        : true;

      const isFromMatch = from
        ? expense.spentAt >= from
        : true;

      const isToMatch = to
        ? expense.spentAt < to
        : true;

      return isUserIdMatch && isCategoryMatch && isFromMatch && isToMatch;
    })
    : [];
}

function findById(expenseId) {
  const foundExpense = expenses.find(expense => expense.id === +expenseId);

  return foundExpense || null;
}

function create(expenseData) {
  const newExpense = {
    id: getNewId(expenses),
    ...expenseData,
  };

  expenses.push(newExpense);

  return newExpense;
}

function remove(expenseId) {
  expenses = expenses.filter(expense => expense.id !== +expenseId);
}

function update(expenseId, expenseInfo) {
  const expense = findById(expenseId);

  Object.assign(expense, { ...expenseInfo });

  return expense;
}

function reset() {
  expenses = [];
};

module.exports = {
  getAll,
  getFilteredExpenses,
  findById,
  create,
  remove,
  update,
  reset,
};
