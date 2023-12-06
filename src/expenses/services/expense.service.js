'use strict';

const { getNewId } = require('../../getNewId');

let expenses = [];

function clearExpenses() {
  expenses = [];
}

function getExpenses(userId, from, to, categories) {
  let filteredExpenses = [...expenses];

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
    filteredExpenses = filteredExpenses.filter(
      expense => expense.spentAt > from
    );
  }

  if (to) {
    filteredExpenses = filteredExpenses.filter(
      expense => expense.spentAt < to
    );
  }

  return filteredExpenses;
}

function getOneExpense(id) {
  return expenses.find(expense => expense.id === +id);
}

function createExpense(requestBody) {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = requestBody;

  const newExpense = {
    id: getNewId(expenses),
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

function deleteExpense(id) {
  expenses = expenses.filter(expense => expense.id !== +id);
}

function updateExpense(expenseToUpdate, requestBody) {
  const {
    title,
  } = requestBody;

  expenseToUpdate.title = title;

  return expenseToUpdate;
}

const services = {
  clearExpenses,
  getExpenses,
  getOneExpense,
  createExpense,
  deleteExpense,
  updateExpense,
};

module.exports = {
  services,
};
