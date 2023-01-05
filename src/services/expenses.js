'use strict';

const users = require('../services/users');

let expenses = [];

function getExpenses(query) {
  const { userId, category, from, to } = query;

  if (userId && category) {
    return expenses.filter(expense => expense.userId === +userId
      && expense.category === category) || null;
  }

  if (userId) {
    return expenses.filter(expense => expense.userId === +userId)
      || null;
  }

  if (from && to) {
    return expenses.filter(expense => {
      if (expense.spentAt >= from && expense.spentAt <= to) {
        return expense;
      }
    });
  }

  return expenses;
}

function setExpenses(data) {
  if (users.getUsers().find(user => user.id === data.userId)) {
    let id = 0;

    if (expenses.length !== 0) {
      id = expenses[expenses.length - 1].id + 1;
    }

    const newExpense = {
      id,
      ...data,
    };

    expenses.push(newExpense);

    return newExpense;
  }

  return null;
}

function getExpenseById(expenseId) {
  return expenses.find(expense => expense.id === +expenseId);
}

function updateExpense(expenseId, newData) {
  const foundExpense = expenses
    .find(expense => expense.id === +expenseId);

  if (foundExpense) {
    Object.assign(foundExpense, newData);

    return foundExpense;
  }

  return null;
}

function deleteExpense(expenseId) {
  const prevLen = expenses.length;

  expenses = expenses.filter(expense => expense.id !== +expenseId);

  return prevLen !== expenses.length;
}

module.exports = {
  getExpenses,
  setExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
};
