'use strict';

const { getMaxId } = require('../utils/getMaxId.js');
let expenses = [];

const filterExpenses = (filters) => {
  let filteredExpenses = expenses;
  const { userId, categories, from, to } = filters;

  if (userId) {
    filteredExpenses = filteredExpenses.filter(expense => (
      expense.userId.toString() === userId
    ));
  }

  if (categories) {
    filteredExpenses = filteredExpenses.filter(expense => (
      categories.includes(expense.category)
    ));
  }

  if (from && to) {
    filteredExpenses = filteredExpenses.filter(expense => {
      const expenseDate = new Date(expense.spentAt);
      const fromDate = new Date(from);
      const toDate = new Date(to);

      return expenseDate < toDate && fromDate <= expenseDate;
    });
  }

  return filteredExpenses;
};

function getById(expenseId) {
  return expenses.find(({ id }) => expenseId === id.toString());
}

function addExpense(data) {
  const newExpense = {
    id: getMaxId(expenses),
    ...data,
  };

  expenses.push(newExpense);

  return newExpense;
}

function remove(expenseId) {
  expenses = expenses.filter(({ id }) => expenseId !== id.toString());
}

function update({ id, body }) {
  const expense = getById(id);

  Object.assign(expense, body);

  return expense;
}

function reset() {
  expenses = [];
}

module.exports = {
  filterExpenses,
  getById,
  addExpense,
  remove,
  update,
  reset,
};
