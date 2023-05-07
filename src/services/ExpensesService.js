'use strict';

const { v4: uuid } = require('uuid');

let expenses = [];

function getAll() {
  return expenses;
}

function getById(expenseId) {
  return expenses.find(({ id }) => id === expenseId) || null;
}

function create(
  expenseId,
  spentAt,
  title,
  amount,
  category,
  note
) {
  const newExpense = {
    id: uuid(),
    expenseId,
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
  expenses = expenses.filter(({ id }) => id !== expenseId);
}

function update({
  id,
  spentAt,
  title,
  amount,
  category,
  note,
}) {
  const expense = getById(id);

  Object.assign(expense, {
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
};
