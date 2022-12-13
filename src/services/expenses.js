'use strict';

const { generateIntId } = require('../utils/generateId');

let expenses = [];

function init() {
  expenses = [];
}

function getAll(userId, category, from, to) {
  return expenses.filter(expense => {
    if (userId && expense.userId !== +userId) {
      return false;
    }

    if (category && !category.includes(expense.category)) {
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
  const foundExpense = expenses.find(expense => expense.id === +expenseId);

  return foundExpense || null;
}

function create(newExpense) {
  newExpense.id = generateIntId();
  expenses.push(newExpense);

  return newExpense;
}

function remove(expenseId) {
  expenses = expenses.filter(expense => expense.id !== +expenseId);
}

function update(expenseId, updateData) {
  const expense = getById(expenseId);

  Object.assign(expense, updateData);

  return expense;
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  init,
};
