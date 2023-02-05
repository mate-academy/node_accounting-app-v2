'use strict';

const { generateNewId } = require('../utils/generateNewId');

let expenses = [];

function init() {
  expenses = [];
}

function getAll(userId, category, from, to) {
  return expenses.filter(expense => {
    if (userId && expense.userId !== +userId) {
      return false;
    }

    if (from && Date.parse(expense.spentAt) < Date.parse(from)) {
      return false;
    }

    if (to && Date.parse(expense.spentAt) > Date.parse(to)) {
      return false;
    }

    if (category && !category.includes(expense.category)) {
      return false;
    }

    return true;
  });
}

function getById(expenseId) {
  const foundExpense = expenses.find(expense => expense.id === +expenseId);

  return foundExpense || null;
}

function create(userId, spentAt, title, amount, category, note) {
  const newExpense = {
    id: generateNewId(expenses),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpense);

  return newExpense;
}

function remove(expenseId) {
  expenses = expenses.filter(expense => expense.id !== +expenseId);
}

function update({ id, data }) {
  const expense = getById(id);

  Object.assign(expense, data);

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
