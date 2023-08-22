'use strict';

const { generateId } = require('../utils/generateId');

let expenses = [];

function getAll() {
  return expenses;
}

function getById(id) {
  const foundExpense = expenses.find(expense => expense.id === +id);

  return foundExpense || null;
}

function create({
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) {
  const newExpense = {
    id: generateId(expenses),
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

function update({ id, body }) {
  const foundExpense = getById(id);

  Object.assign(foundExpense, body);

  return foundExpense;
}

function remove(id) {
  expenses = expenses.filter(expense => expense.id !== +id);
}

function deleteAllExpenses() {
  expenses = [];
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  deleteAllExpenses,
};
