'use strict';

const { generateIntId } = require('../utils/generateId');

let expenses = [];

function init() {
  expenses = [];
}

function getAll(userId, category, from, to) {
  let foundExpenses = expenses;

  if (userId) {
    foundExpenses = foundExpenses
      .filter(expense => expense.userId === +userId);
  }

  if (category) {
    foundExpenses = foundExpenses
      .filter(expense => category.includes(expense.category));
  }

  if (from) {
    foundExpenses = foundExpenses
      .filter(expense => Date.parse(expense.spentAt) >= Date.parse(from));
  }

  if (to) {
    foundExpenses = foundExpenses
      .filter(expense => Date.parse(expense.spentAt) <= Date.parse(to));
  }

  return foundExpenses;
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
