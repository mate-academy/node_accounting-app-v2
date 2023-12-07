'use strict';

const { getNewId } = require('../../getNewId');

let expenses = [];

function clearExpenses() {
  expenses = [];
}

function getExpenses(userId, from, to, categories) {
  let filteredExpenses = [...expenses];

  filteredExpenses = filteredExpenses.filter(expense => {
    if (userId && expense.userId !== +userId) {
      return false;
    }

    if (categories && expense.category !== categories) {
      return false;
    }

    if (from && expense.spentAt <= from) {
      return false;
    }

    if (to && expense.spentAt >= to) {
      return false;
    }

    return true;
  });

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
