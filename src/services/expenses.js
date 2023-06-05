'use strict';

// const { v4: uuidv4 } = require('uuid');
let expenses = [];
let idExpenseCounter = 0;

function setDefaultExpenses() {
  expenses = [];
  idExpenseCounter = 0;
}

function create(userData) {
  idExpenseCounter++;

  const newExpense = {
    id: idExpenseCounter,
    ...userData,
  };

  expenses.push(newExpense);

  return newExpense;
}

function filterAll({ userId, categories, from, to }) {
  let filteredExpenses = [...expenses];

  if (userId) {
    filteredExpenses = expenses.filter((expense) => expense.userId === +userId);
  }

  if (categories) {
    filteredExpenses = expenses.filter((expense) => (
      categories.includes(expense.category)
    ));
  }

  if (from && to) {
    filteredExpenses = expenses.filter((expense) => (
      expense.spentAt >= from && expense.spentAt <= to
    ));
  }

  return filteredExpenses;
}

function getById(expenseId) {
  return expenses.find((expense) => expense.id === +expenseId);
}

function update(expenseId, expenseData) {
  const gottenExpense = getById(expenseId);

  Object.assign(gottenExpense, { ...expenseData });

  return gottenExpense;
}

function remove(expenseId) {
  expenses = expenses.filter((expense) => expense.id !== +expenseId);
}

module.exports = {
  setDefaultExpenses,
  create,
  filterAll,
  getById,
  update,
  remove,
};
