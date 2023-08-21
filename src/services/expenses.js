'use strict';

const { nextId } = require('../utils/nextId');

let expenses = [];

function getFiltered({ userId, from, to, categories }) {
  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = filteredExpenses.filter(
      expense => expense.userId === +userId
    );
  }

  if (categories) {
    filteredExpenses = filteredExpenses.filter(
      expense => expense.category === categories
    );
  }

  if (from) {
    const dateFrom = new Date(from);

    filteredExpenses = filteredExpenses.filter(expense => {
      const spentDate = new Date(expense.spentAt);

      return dateFrom <= spentDate;
    });
  }

  if (to) {
    const dateFrom = new Date(to);

    filteredExpenses = filteredExpenses.filter(expense => {
      const spentDate = new Date(expense.spentAt);

      return dateFrom >= spentDate;
    });
  }

  return filteredExpenses;
}

function getById(expenseId) {
  const foundExpense = expenses.find(({ id }) => id === expenseId);

  return foundExpense || null;
}

function remove(expenseId) {
  expenses = expenses.filter(({ id }) => id !== expenseId);
}

function create(expenseData) {
  const newExpense = {
    id: nextId(expenses),
    ...expenseData,
  };

  expenses.push(newExpense);

  return newExpense;
}

function update(data, expenseId) {
  const foundExpense = getById(expenseId);

  for (const key in data) {
    foundExpense[key] = data[key];
  }

  return foundExpense;
}

function removeAll() {
  expenses = [];
}

module.exports = {
  getFiltered,
  getById,
  create,
  update,
  remove,
  removeAll,
};
