'use strict';

let expenses = [];

const generateId = (arr) => {
  if (arr.length === 0) {
    return 1;
  }

  const ids = arr.map(item => item.id);
  const max = Math.max(...ids);

  return max + 1;
};

function getAll({ userId, categories, from, to }) {
  if (userId) {
    expenses = expenses.filter(expense => expense.userId === +userId);
  }

  if (categories) {
    expenses = expenses
      .filter(expense => categories.includes(expense.category));
  }

  if (from && to) {
    expenses = expenses
      .filter(expense => expense.spentAt >= from && expense.spentAt <= to);
  }

  return expenses;
}

function getById(expenseId) {
  const foundExpense = expenses.find(expense => expense.id === +expenseId);

  return foundExpense || null;
}

function create({ userId, spentAt, title, amount, category, note }) {
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

function remove(expenseId) {
  expenses = expenses.filter(expense => expense.id !== +expenseId);
}

function update(id, body) {
  const expense = getById(id);

  Object.assign(expense, body);

  return expense;
}

function deleteAll() {
  expenses = [];
}

module.exports = {
  getAll, getById, create, remove, update, deleteAll,
};
