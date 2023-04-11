'use strict';

let expenses = [];

function getInitialValue() {
  expenses = [];

  return expenses;
}

function getAll({ userId, categories, from, to }) {
  if (userId) {
    expenses = expenses.filter(expense => expense.userId === +userId);
  }

  if (categories) {
    expenses = expenses
      .filter(expense => categories.includes(expense.category));
  }

  if (from) {
    expenses = expenses.filter(expense => expense.spentAt > from);
  }

  if (to) {
    expenses = expenses.filter(expense => expense.spentAt < to);
  }

  return expenses;
}

function getById(expenseId) {
  const foundExpense = expenses.find(expense => expense.id === +expenseId);

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
  const maxId = Math.max(expenses.map(expense => expense.id), 0);

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
  expenses = expenses.filter(expense => expense.id !== +expenseId);
}

function update({ expenseId, data }) {
  const expense = getById(expenseId);

  Object.assign(expense, data);

  return expense;
}

module.exports = {
  getInitialValue,
  getAll,
  getById,
  create,
  remove,
  update,
};
