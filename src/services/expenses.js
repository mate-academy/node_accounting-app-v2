'use strict';

const { createNewId } = require('../helpers/createNewId');

let expenses = [];

function setInitialExpenses() {
  expenses = [];
}

function getAll(searchParams) {
  const { userId, category, from, to } = searchParams;

  return expenses.filter(expense => {
    const isUserIdMatch = userId
      ? expense.userId === +userId
      : true;

    const isCategoriesMatch = category
      ? expense.category === category
      : true;

    const isFromMatch = from
      ? expense.spentAt >= from
      : true;

    const isToMatch = to
      ? expense.spentAt <= to
      : true;

    return isUserIdMatch && isCategoriesMatch && isFromMatch && isToMatch;
  });
};

function addExpense(expenseData) {
  const newExpense = {
    id: createNewId(expenses),
    ...expenseData,
  };

  expenses.push(newExpense);

  return newExpense;
};

function getById(expenseId) {
  const foundExpense = expenses.find(expense => expense.id === +expenseId);

  return foundExpense || null;
};

function removeExpense(expenseId) {
  expenses = expenses.filter(expense => expense.id !== +expenseId);
};

function updateExpense(expenseId, dataToUpdate) {
  const foundExpense = getById(expenseId);

  const updatedExpense = Object.assign(foundExpense, dataToUpdate);

  return updatedExpense;
}

module.exports = {
  setInitialExpenses,
  getAll,
  addExpense,
  getById,
  removeExpense,
  updateExpense,
};
