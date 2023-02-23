'use strict';

const { generateId } = require('../helpers/generateId');

let expenses = [];

function setInitialValue() {
  expenses = [];
};

function getAll(searchParams) {
  const { userId, category, from, to } = searchParams;

  return expenses.filter(expense => {
    const isUserIdMatch = userId
      ? expense.userId === Number(userId)
      : true;

    const isCategoryMatch = category
      ? expense.category === category
      : true;

    const isFromMatch = from
      ? expense.spentAt >= from
      : true;

    const isToMatch = to
      ? expense.spentAt <= to
      : true;

    return isUserIdMatch && isCategoryMatch && isFromMatch && isToMatch;
  });
}

function findById(expenseId) {
  const foundExpense = expenses.find(
    expense => expense.id === Number(expenseId));

  return foundExpense || null;
}

function create(expenseData) {
  const newExpense = {
    id: generateId(expenses),
    ...expenseData,
  };

  expenses.push(newExpense);

  return newExpense;
}

function remove(expenseId) {
  expenses = expenses.filter(expense => expense.id !== Number(expenseId));
}

function update(expenseId, dataToUpdate) {
  const expense = findById(expenseId);

  if (!expense) {
    return;
  }

  const updatedExpense = Object.assign(expense, dataToUpdate);

  return updatedExpense;
}

module.exports = {
  setInitialValue,
  getAll,
  findById,
  create,
  remove,
  update,
};
