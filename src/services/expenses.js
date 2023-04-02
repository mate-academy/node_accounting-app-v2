'use strict';

const { generateId } = require('../utils/generateId');

let expenses = [];

function init() {
  expenses = [];
}

function getAll(userId, categories, from, to) {
  return expenses.filter(expense => {
    if (userId && expense.userId !== +userId) {
      return false;
    }

    if (categories && !categories.includes(expense.category)) {
      return false;
    }

    if (from && Date.parse(expense.spentAt) < Date.parse(from)) {
      return false;
    }

    if (to && Date.parse(expense.spentAt) > Date.parse(to)) {
      return false;
    }

    return true;
  });
}

function getById(expenseId) {
  const foundExpense = expenses.find(({ id }) => id === +expenseId);

  return foundExpense || null;
}

function create(expense) {
  const newExpense = {
    id: generateId(expenses),
    ...expense,
  };

  expenses.push(newExpense);

  return newExpense;
}

function remove(expenseId) {
  expenses = expenses.filter(({ id }) => id !== +expenseId);
}

function update({ expenseId, data }) {
  const expense = getById(expenseId);

  Object.assign(expense, data);

  return expense;
}

module.exports = {
  init,
  getAll,
  getById,
  create,
  remove,
  update,
};
