'use strict';

const { getNewId } = require('../utils/utils');

let expenses = [];

function eraseData() {
  expenses = [];
}

function getAll() {
  return expenses;
}

function getById(expenseId) {
  const foundExpense = expenses.find(({ id }) => id === +expenseId);

  return foundExpense || null;
}

function create(
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
) {
  const newExpense = {
    id: getNewId(expenses),
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
  expenses = expenses.filter(({ id }) => id !== +expenseId);
}

function update({
  id,
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) {
  const expense = getById(id);

  Object.assign(expense, {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  return expense;
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  eraseData,
};
