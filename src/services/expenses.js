'use strict';

let expenses = [];

function getAll() {
  return expenses;
}

function getById(expenseId) {
  const foundExpense = expenses.find(({ id }) => id === expenseId);

  return foundExpense || null;
}

function create(userId,
  spentAt,
  title,
  amount,
  category,
  note) {
  const maxId = Math.max(...expenses.map(({ id }) => id), 0);
  const newExpense = {
    id: maxId + 1,
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
  expenses = expenses.filter(({ id }) => id !== expenseId);
}

function update(expense,
  spentAt,
  title,
  amount,
  category,
  note,
) {
  Object.assign(expense, {
    spentAt,
    title,
    amount,
    category,
    note,
  });
}

module.exports = {
  getAll, getById, create, remove, update,
};
