'use strict';

let expenses = [];

function getAll() {
  return expenses;
}

function getExpensById(expensId) {
  const foundExpens = expenses.find(expens => expens.id === Number(expensId));

  return foundExpens || null;
}

function create(userId, spentAt, title, amount, category, note) {
  const id = expenses.length
    ? Number(Math.max(...expenses.map((expens) => expens.id)) + 1)
    : 1;

  const newExpens = {
    id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpens);

  return newExpens;
}

function remove(expensId) {
  expenses = expenses.filter(expens => expens.id !== Number(expensId));
}

function update(
  id,
  spentAt,
  title,
  amount,
  category,
  note
) {
  const expens = getExpensById(id);

  Object.assign(expens, {
    spentAt, title, amount, category, note,
  });

  return expens;
}

module.exports = {
  getAll,
  getExpensById,
  create,
  remove,
  update,
};
