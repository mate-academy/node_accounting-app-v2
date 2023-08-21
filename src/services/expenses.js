'use strict';

function getMaxId(array) {
  const ids = array.map(user => user.id);

  return Math.max(...ids);
}

let expenses = [];

function getAll() {
  return expenses;
}

function getById(expenseId) {
  const foundExpense = expenses.find(expense => expense.id === +expenseId);

  return foundExpense || null;
}

function create(userId, spentAt, title, amount, category, note) {
  const newExpense = {
    id: getMaxId(expenses) + 1,
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

function update({ id, ...updatedFields }) {
  const expense = getById(id);

  if (!expense) {
    return;
  }

  Object.assign(expense, { ...updatedFields });

  return expense;
}

function clearExpenses() {
  expenses = [];
}

module.exports = {
  getAll, getById, create, remove, update, clearExpenses,
};
