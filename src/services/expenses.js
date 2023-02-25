'use strict';

const { generateId } = require('../helpers/idGenerator');

let expenses = [];

function setInitial() {
  expenses = [];

  return expenses;
}

function getAll({ userId, category, from, to }) {
  return expenses.filter(expense => {
    const isUserIdMatch = userId
      ? expense.userId === +userId
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
  return expenses.find(
    expense => expense.id === Number(expenseId)
  ) || null;
}

function create(expenseData) {
  const newId = generateId(expenses);

  const newExpense = {
    ...expenseData,
    id: newId,
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
}

module.exports = {
  setInitial,
  getAll,
  findById,
  create,
  remove,
  update,
};
