'use strict';

const { v4 } = require('uuid');

let expenses = [];

function getAll(getQuery) {
  const { userId, category, from, to } = getQuery;

  let expensesCopy = expenses;

  if (userId) {
    expensesCopy = expensesCopy.filter(item => item.userId === userId);
  }

  if (category) {
    expensesCopy = expensesCopy.filter(item => item.category === category);
  }

  if (from) {
    expensesCopy = expensesCopy.filter(item => item.spentAt >= from);
  }

  if (to) {
    expensesCopy = expensesCopy.filter(item => item.spentAt <= to);
  }

  return expensesCopy;
}

function getById(userId) {
  return expenses.find((user) => user.id === userId) || null;
}

function addNew({ userId, title, amount, category, note }) {
  const newUser = {
    id: v4(),
    userId,
    title: title || '',
    amount: amount || 0,
    category: category || '',
    note: note || '',
    spentAt: new Date(),
  };

  expenses.push(newUser);

  return newUser;
}

function remove(expensesId) {
  expenses = expenses.filter((user) => user.id !== expensesId);
}

function change({ expensesId, userId, title, amount, category, note }) {
  const cangeExpenses = expenses
    .find((expensesItem) => expensesItem.id === expensesId);

  cangeExpenses.userId = userId;
  cangeExpenses.title = title;
  cangeExpenses.amount = amount;
  cangeExpenses.category = category;
  cangeExpenses.note = note;
}

module.exports = {
  getAll,
  getById,
  addNew,
  remove,
  change,
};
