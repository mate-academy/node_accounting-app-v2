'use strict';

const newId = () => {
  let counter = 1;

  return () => counter++;
};

const getId = newId();

let expenses = [];

function clear() {
  expenses = [];
}

function getAll(getQuery) {
  const { userId, category, from, to } = getQuery;

  let expensesCopy = expenses;

  if (userId) {
    expensesCopy = expensesCopy.filter(item => +item.userId === +userId);
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

function getById(expenseId) {
  return expenses.find((expense) => expense.id === +expenseId) || null;
}

function addNew({ userId, title, amount, category, note, spentAt }) {
  const newExpenses = {
    id: getId(),
    userId,
    title: title || '',
    amount: amount || 0,
    category: category || '',
    note: note || '',
    spentAt,
  };

  expenses.push(newExpenses);

  return newExpenses;
}

function remove(expensesId) {
  expenses = expenses.filter((user) => user.id !== +expensesId);
}

function change(expensesId, newParams) {
  const cangeExpenses = expenses
    .find((expensesItem) => expensesItem.id === +expensesId);

  Object.assign(cangeExpenses, newParams);

  return cangeExpenses;
}

module.exports = {
  getAll,
  getById,
  addNew,
  remove,
  clear,
  change,
};
