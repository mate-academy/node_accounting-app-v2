'use strict';

const getId = require('../helpers/maxId').getId;

let expenses = [];

function setInitialExpensees() {
  expenses = [];
}

function getAll(params) {
  const { userId, category, from, to } = params;

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

function getExpenseById(expenseId) {
  const wantedExpense = expenses.find(exp => exp.id === Number(expenseId));

  return wantedExpense || null;
}

function createExpense(data) {
  const newExpense = {
    id: getId(expenses),
    ...data,
  };

  expenses.push(newExpense);

  return newExpense;
}

function patchExpense(expenseId, dataToUpdate) {
  const wantedExpense = getExpenseById(expenseId);

  const updatedExpense = Object.assign(wantedExpense, dataToUpdate);

  return updatedExpense;
}

function deleteExpense(expenseId) {
  expenses = expenses.filter(exp => exp.id !== Number(expenseId));
}

module.exports = {
  setInitialExpensees,
  getAll,
  getExpenseById,
  createExpense,
  patchExpense,
  deleteExpense,
};
