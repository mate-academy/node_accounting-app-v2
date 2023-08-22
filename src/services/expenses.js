'use strict';
/* eslint-disable max-len */

const { generateId } = require('../utils');

let expenses = [];

function getExpenses(params) {
  const { userId, categories, from, to } = params;

  let filtredExpenses = [...expenses];

  if (userId) {
    filtredExpenses = filtredExpenses.filter((exp) => exp.userId === +userId);
  }

  if (categories) {
    filtredExpenses = filtredExpenses.filter((exp) =>
      categories.includes(exp.category)
    );
  }

  if (from) {
    const dateFrom = new Date(from);

    filtredExpenses = filtredExpenses.filter(
      (exp) => new Date(exp.spentAt) >= dateFrom
    );
  }

  if (to) {
    const dateTo = new Date(to);

    filtredExpenses = filtredExpenses.filter(
      (exp) => new Date(exp.spentAt) <= dateTo
    );
  }

  return filtredExpenses;
}

function getExpenseById(id) {
  return expenses.find((exp) => exp.id === +id) || null;
}

function createExpense(data) {
  const expense = {
    id: generateId(expenses),
    ...data,
  };

  expenses.push(expense);

  return expense;
}

function deleteExpense(id) {
  expenses = expenses.filter((exp) => exp.id !== +id);
}

function updateExpense(id, data) {
  const foundExpense = getExpenseById(id);

  Object.assign(foundExpense, data);

  return foundExpense;
}

function removeAll() {
  expenses = [];
}

module.exports = {
  getExpenses,
  getExpenseById,
  createExpense,
  deleteExpense,
  updateExpense,
  removeAll,
};
